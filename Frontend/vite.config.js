import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    server: {
        allowedHosts: [
            'localhost',
            '127.0.0.1',
            ` https://9810-203-9-210-192.ngrok-free.app ` // Add your ngrok URL here
        ]
    },
    plugins: [react()],
})