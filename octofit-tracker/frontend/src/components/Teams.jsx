import { useEffect, useState } from 'react';
import { getApiUrl, normalizeCollection } from '../utils/api';

function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTeams() {
      try {
        const response = await fetch(getApiUrl('teams'), { signal: controller.signal });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || 'Unable to load teams');
        }

        setItems(normalizeCollection(data));
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchTeams();

    return () => controller.abort();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Teams</h1>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {items.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">No teams found.</div>
            </div>
          ) : (
            items.map((team) => (
              <div key={team._id || team.name} className="col-md-6 col-xl-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <h2 className="h5 card-title">{team.name}</h2>
                    <p className="mb-2 text-muted">Coach: {team.coach}</p>
                    <span className="badge bg-success-subtle text-success-emphasis">{team.points ?? 0} pts</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Teams;
