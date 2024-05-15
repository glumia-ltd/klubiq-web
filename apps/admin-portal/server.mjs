// ./server.mjs
import { createHandler } from '@toolpad/studio';
import express from 'express';

const app = express();

// Initialize the Toolpad Studio handler. Make sure to pass the base path
const { handler } = await createHandler({
  dev: process.env.NODE_ENV === 'development',
  base: '/my-app',
});

// Use the handler in your application
app.use('/my-app', handler);

app.listen(process.env.PORT || 3201);