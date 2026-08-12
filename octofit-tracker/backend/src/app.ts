import express from 'express';
import './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';

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

const readCollection = async (model: any, key: keyof typeof endpoints) => {
  const items = await model.find().lean();
  return {
    endpoint: endpoints[key],
    count: items.length,
    items,
    baseUrl,
  };
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

app.get('/api/users/', async (_req, res) => {
  try {
    const payload = await readCollection(User, 'users');
    res.json(payload);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load users.', details: String(error) });
  }
});

app.get('/api/teams/', async (_req, res) => {
  try {
    const payload = await readCollection(Team, 'teams');
    res.json(payload);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load teams.', details: String(error) });
  }
});

app.get('/api/activities/', async (_req, res) => {
  try {
    const payload = await readCollection(Activity, 'activities');
    res.json(payload);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load activities.', details: String(error) });
  }
});

app.get('/api/leaderboard/', async (_req, res) => {
  try {
    const payload = await readCollection(LeaderboardEntry, 'leaderboard');
    res.json(payload);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load leaderboard.', details: String(error) });
  }
});

app.get('/api/workouts/', async (_req, res) => {
  try {
    const payload = await readCollection(Workout, 'workouts');
    res.json(payload);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load workouts.', details: String(error) });
  }
});

export default app;
