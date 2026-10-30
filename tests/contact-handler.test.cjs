const assert = require('node:assert/strict')
const test = require('node:test')
const { handleContactRequest } = require('../server/contact-handler.cjs')

const enquiry = { name: 'Portfolio QA', email: 'qa@example.com', message: 'A test enquiry.' }

// Invalid input must fail before attempting delivery; tests use no real credentials.
test('rejects malformed contact payloads instead of throwing server errors', async () => {
  for (const body of ['{invalid', [], 42, { ...enquiry, name: 42 }, { ...enquiry, message: {} }]) {
    const result = await handleContactRequest({ method: 'POST', body, env: {} })
    assert.equal(result.status, 400)
  }
})

test('enforces the form limits on the server too', async () => {
  for (const body of [{ ...enquiry, name: 'x'.repeat(121) }, { ...enquiry, message: 'x'.repeat(5001) }]) {
    assert.equal((await handleContactRequest({ method: 'POST', body, env: {} })).status, 400)
  }
})

test('honeypot submissions short-circuit without contacting the email provider', async () => {
  const result = await handleContactRequest({ method: 'POST', body: { website: 'spam' }, env: {} })
  assert.deepEqual(result, { status: 200, body: { success: true } })
})

test('valid enquiries preserve reply-to and escape visitor content in the email', async (t) => {
  let delivery
  t.mock.method(global, 'fetch', async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails')
    delivery = JSON.parse(options.body)
    return { ok: true, json: async () => ({ id: 'mock-delivery' }) }
  })
  const result = await handleContactRequest({
    method: 'POST',
    body: { ...enquiry, name: ' <Visitor> ', message: ' <script>untrusted</script> ' },
    env: { RESEND_API_KEY: 'mock-key', CONTACT_FROM_EMAIL: 'mock@example.com', CONTACT_TO_EMAIL: 'owner@example.com' },
  })
  assert.equal(result.status, 200)
  assert.equal(delivery.reply_to, enquiry.email)
  assert.deepEqual(delivery.to, ['owner@example.com'])
  assert(delivery.html.includes('&lt;Visitor&gt;'))
  assert(!delivery.html.includes('<script>'))
  assert(delivery.text.includes('Name: <Visitor>'))
  assert(delivery.text.endsWith('<script>untrusted</script>'))
})
