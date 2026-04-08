import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import contactApi from './server/contact-handler.cjs'

const { handleContactRequest, readRequestBody } = contactApi

const contactApiPlugin = (env) => {
  const attachMiddleware = (server) => {
    server.middlewares.use('/api/contact', async (req, res) => {
      try {
        const body = await readRequestBody(req)
        const result = await handleContactRequest({
          method: req.method,
          body,
          env: { ...process.env, ...env },
        })

        res.statusCode = result.status
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(result.body))
      } catch (error) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Unexpected server error. Please try again in a moment.' }))
      }
    })
  }

  return {
    name: 'contact-api-plugin',
    configureServer: attachMiddleware,
    configurePreviewServer: attachMiddleware,
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), contactApiPlugin(env)],
  }
})
