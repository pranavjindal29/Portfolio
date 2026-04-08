const defaultRecipient = 'jindalpranav944@gmail.com'

const parseBody = (body) => {
  if (!body) {
    return {}
  }

  if (typeof body === 'string') {
    return JSON.parse(body)
  }

  return body
}

const escapeHtml = (value = '') =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const buildMessage = ({ name, email, company, message }) => {
  const companyLine = company ? `<p style="margin:0 0 12px;"><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''

  return {
    subject: `Portfolio enquiry from ${name}${company ? ` · ${company}` : ''}`,
    text: [`Name: ${name}`, `Email: ${email}`, `Company: ${company || '-'}`, '', message].join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;">
        <h2 style="margin:0 0 16px;">New portfolio enquiry</h2>
        <p style="margin:0 0 12px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 12px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${companyLine}
        <p style="margin:20px 0 8px;"><strong>Message:</strong></p>
        <p style="margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `,
  }
}

const handleContactRequest = async ({ method, body, env = process.env }) => {
  if (method !== 'POST') {
    return {
      status: 405,
      body: { error: 'Method not allowed.' },
    }
  }

  let payload

  try {
    payload = parseBody(body)
  } catch (error) {
    return {
      status: 400,
      body: { error: 'Invalid request payload.' },
    }
  }

  const name = payload?.name?.trim() || ''
  const email = payload?.email?.trim() || ''
  const company = payload?.company?.trim() || ''
  const message = payload?.message?.trim() || ''
  const website = payload?.website?.trim() || ''

  if (website) {
    return {
      status: 200,
      body: { success: true },
    }
  }

  if (!name || !email || !message) {
    return {
      status: 400,
      body: { error: 'Name, email, and message are required.' },
    }
  }

  if (!isValidEmail(email)) {
    return {
      status: 400,
      body: { error: 'Please enter a valid email address.' },
    }
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL) {
    return {
      status: 503,
      body: {
        error: 'Contact service is not configured yet. Please add the Resend environment variables.',
      },
    }
  }

  const composedMessage = buildMessage({ name, email, company, message })
  const recipient = env.CONTACT_TO_EMAIL || defaultRecipient

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [recipient],
      reply_to: email,
      subject: composedMessage.subject,
      text: composedMessage.text,
      html: composedMessage.html,
    }),
  })

  let resendBody = {}

  try {
    resendBody = await resendResponse.json()
  } catch (error) {
    resendBody = {}
  }

  if (!resendResponse.ok) {
    return {
      status: resendResponse.status === 429 ? 429 : 502,
      body: {
        error: resendBody?.message || 'Unable to deliver the message right now. Please try again shortly.',
      },
    }
  }

  return {
    status: 200,
    body: {
      success: true,
      id: resendBody?.id,
      message: 'Message sent successfully.',
    },
  }
}

const readRequestBody = (req) =>
  new Promise((resolve, reject) => {
    let data = ''

    req.on('data', (chunk) => {
      data += chunk
    })

    req.on('end', () => resolve(data))
    req.on('error', reject)
  })

module.exports = {
  handleContactRequest,
  readRequestBody,
}
