import { useEffect, useState } from 'react';
import { getApiUrl, normalizeCollection } from '../utils/api';

const endpoint = getApiUrl('workouts');

function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWorkouts() {
      try {
        const response = await fetch(endpoint, { signal: controller.signal });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || 'Unable to load workouts');
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

    fetchWorkouts();

    return () => controller.abort();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Workouts</h1>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {items.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">No workouts found.</div>
            </div>
          ) : (
            items.map((workout) => (
              <div key={workout._id || workout.name} className="col-md-6 col-xl-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <h2 className="h5 card-title">{workout.name}</h2>
                    <p className="mb-2 text-muted">{workout.category}</p>
                    <p className="mb-1 text-muted">{workout.durationMinutes ?? 0} minutes</p>
                    <p className="mb-0 text-muted">{workout.difficulty || 'moderate'}</p>
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

export default Workouts;
