// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Directorio de salida para los archivos compilados
    sourcemap: true // Opcional, para facilitar la depuración
  }
})
