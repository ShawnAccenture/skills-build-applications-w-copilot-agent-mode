import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

// VITE_CODESPACE_NAME must be defined in .env.local for Codespaces support.
// Example: VITE_CODESPACE_NAME=my-codespace
// When it is unset, the app falls back to http://localhost:8000.

function HomePage() {
  const sections = [
    { title: 'Users', description: 'Track athlete profiles and fitness levels.', path: '/users' },
    { title: 'Teams', description: 'Review team performance and coaching status.', path: '/teams' },
    { title: 'Activities', description: 'See recent workout and movement logs.', path: '/activities' },
    { title: 'Leaderboard', description: 'Compare standings across the program.', path: '/leaderboard' },
    { title: 'Workouts', description: 'Browse suggested routines for every skill level.', path: '/workouts' },
  ];

  return (
    <div className="container py-4">
      <div className="row g-4">
        {sections.map((section) => (
          <div key={section.title} className="col-md-6 col-xl-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h2 className="h4 card-title">{section.title}</h2>
                <p className="card-text text-muted">{section.description}</p>
                <NavLink className="btn btn-primary" to={section.path}>
                  Open
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </div>
      </nav>

      <main className="container-fluid px-3 px-md-4 py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
