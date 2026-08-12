import app from './app.js';
import db from './config/database.js';

const port = Number(process.env.PORT || 8000);

if (db) {
  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
}

app.listen(port, () => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;

  console.log(`Backend server listening on ${baseUrl}`);
});
