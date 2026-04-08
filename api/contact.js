const { handleContactRequest } = require('../server/contact-handler.cjs')

module.exports = async (req, res) => {
  try {
    const result = await handleContactRequest({
      method: req.method,
      body: req.body,
      env: process.env,
    })

    res.status(result.status).json(result.body)
  } catch (error) {
    res.status(500).json({
      error: 'Unexpected server error. Please try again in a moment.',
    })
  }
}
