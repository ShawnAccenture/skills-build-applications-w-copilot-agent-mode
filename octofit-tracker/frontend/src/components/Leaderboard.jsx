import { useEffect, useState } from 'react';
import { getApiUrl, normalizeCollection } from '../utils/api';

const endpoint = getApiUrl('leaderboard');

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchLeaderboard() {
      try {
        const response = await fetch(endpoint, { signal: controller.signal });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || 'Unable to load leaderboard');
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

    fetchLeaderboard();

    return () => controller.abort();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Leaderboard</h1>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="list-group">
          {items.length === 0 ? (
            <div className="alert alert-info">No leaderboard entries found.</div>
          ) : (
            items.map((entry, index) => (
              <div key={entry._id || `${entry.userId}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <span className="badge bg-dark me-2">#{entry.rank ?? index + 1}</span>
                  <span>{entry.userId || 'Athlete'}</span>
                </div>
                <strong>{entry.points ?? 0} pts</strong>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
