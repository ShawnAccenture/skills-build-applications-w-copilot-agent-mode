import { useEffect, useState } from 'react';
import { getApiUrl, normalizeCollection } from '../utils/api';

const endpoint = getApiUrl('activities');

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchActivities() {
      try {
        const response = await fetch(endpoint, { signal: controller.signal });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || 'Unable to load activities');
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

    fetchActivities();

    return () => controller.abort();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Activities</h1>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {items.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">No activities logged yet.</div>
            </div>
          ) : (
            items.map((activity) => (
              <div key={activity._id || `${activity.type}-${activity.date}`} className="col-md-6 col-xl-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <h2 className="h5 card-title">{activity.type}</h2>
                    <p className="mb-1 text-muted">{activity.durationMinutes ?? 0} minutes</p>
                    <p className="mb-1 text-muted">{activity.distanceKm ?? 0} km</p>
                    <p className="mb-0 text-muted">{activity.caloriesBurned ?? 0} calories</p>
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

export default Activities;
