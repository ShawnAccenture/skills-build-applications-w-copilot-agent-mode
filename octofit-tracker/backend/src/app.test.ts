import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './app.js';

describe('OctoFit Tracker API', () => {
  it('returns health status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('serves all required route handlers', async () => {
    const endpoints = [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ];

    for (const endpoint of endpoints) {
      const response = await request(app).get(endpoint);
      expect(response.status).toBe(200);
      expect(response.body.endpoint).toBe(endpoint);
    }
  });

  it('includes CORS headers for frontend requests', async () => {
    const response = await request(app)
      .get('/api/users/')
      .set('Origin', 'http://localhost:5173');

    expect(response.status).toBe(200);
    expect(response.headers['access-control-allow-origin']).toBe('*');
  });
});
