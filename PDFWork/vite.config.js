import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();  // This will load the variables from your .env file

export default defineConfig({
  plugins: [react()],
});
