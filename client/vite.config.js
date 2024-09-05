import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch:{
      usePolling: true,
    },
    proxy:{
      '/resetpassword': {
        target: 'http://localhost:3000',
        secure: false,
      },
      '/linedata': {
        target: 'http://localhost:3000',
        secure: false,
      }
    }
  },
  plugins: [react()],
})
