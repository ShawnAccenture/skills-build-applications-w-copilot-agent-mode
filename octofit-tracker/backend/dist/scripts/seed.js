import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const teams = await Team.insertMany([
            { name: 'Trail Blazers', coach: 'Coach Rivera', points: 320 },
            { name: 'Storm Squad', coach: 'Coach Patel', points: 290 },
            { name: 'Peak Performers', coach: 'Coach Nguyen', points: 410 },
        ]);
        const users = await User.insertMany([
            { name: 'Ava Martinez', email: 'ava@example.com', fitnessLevel: 'advanced', teamId: teams[0]._id },
            { name: 'Leo Johnson', email: 'leo@example.com', fitnessLevel: 'intermediate', teamId: teams[1]._id },
            { name: 'Maya Chen', email: 'maya@example.com', fitnessLevel: 'beginner', teamId: teams[2]._id },
            { name: 'Noah Brooks', email: 'noah@example.com', fitnessLevel: 'advanced', teamId: teams[2]._id },
        ]);
        await Activity.insertMany([
            { userId: users[0]._id, type: 'Running', durationMinutes: 35, distanceKm: 5.2, caloriesBurned: 420, date: new Date() },
            { userId: users[1]._id, type: 'Cycling', durationMinutes: 40, distanceKm: 12, caloriesBurned: 510, date: new Date() },
            { userId: users[2]._id, type: 'Strength', durationMinutes: 30, distanceKm: 0, caloriesBurned: 290, date: new Date() },
            { userId: users[3]._id, type: 'Walking', durationMinutes: 25, distanceKm: 3.8, caloriesBurned: 180, date: new Date() },
        ]);
        await LeaderboardEntry.insertMany([
            { userId: users[0]._id, points: 940, rank: 1 },
            { userId: users[3]._id, points: 910, rank: 2 },
            { userId: users[1]._id, points: 760, rank: 3 },
            { userId: users[2]._id, points: 630, rank: 4 },
        ]);
        await Workout.insertMany([
            { name: 'Morning Sprint Circuit', category: 'Cardio', durationMinutes: 20, difficulty: 'challenging', description: 'Intervals to improve speed and stamina.' },
            { name: 'Core Stability', category: 'Strength', durationMinutes: 15, difficulty: 'moderate', description: 'Target abdominal and lower back strength.' },
            { name: 'Recovery Walk', category: 'Recovery', durationMinutes: 25, difficulty: 'easy', description: 'Low-impact movement to improve mobility and recovery.' },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
