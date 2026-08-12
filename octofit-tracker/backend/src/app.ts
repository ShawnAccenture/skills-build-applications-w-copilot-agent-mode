import express from 'express';

const app = express();
app.use(express.json());

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const endpoints = {
  users: '/api/users/',
  teams: '/api/teams/',
  activities: '/api/activities/',
  leaderboard: '/api/leaderboard/',
  workouts: '/api/workouts/',
};

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker backend is running',
    baseUrl,
  });
});

app.get('/api/ping', (_req, res) => {
  res.json({ message: 'pong' });
});

app.get('/api/users/', (_req, res) => {
  res.json({
    message: 'Users endpoint is ready',
    endpoint: endpoints.users,
    baseUrl,
  });
});

app.get('/api/teams/', (_req, res) => {
  res.json({
    message: 'Teams endpoint is ready',
    endpoint: endpoints.teams,
    baseUrl,
  });
});

app.get('/api/activities/', (_req, res) => {
  res.json({
    message: 'Activities endpoint is ready',
    endpoint: endpoints.activities,
    baseUrl,
  });
});

app.get('/api/leaderboard/', (_req, res) => {
  res.json({
    message: 'Leaderboard endpoint is ready',
    endpoint: endpoints.leaderboard,
    baseUrl,
  });
});

app.get('/api/workouts/', (_req, res) => {
  res.json({
    message: 'Workouts endpoint is ready',
    endpoint: endpoints.workouts,
    baseUrl,
  });
});

export default app;
