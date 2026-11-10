import tailwindcss from 'tailwindcss3'
import autoprefixer from 'autoprefixer'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))

export default {
  plugins: [tailwindcss({ config: path.join(here, 'tailwind.config.js') }), autoprefixer()],
}
