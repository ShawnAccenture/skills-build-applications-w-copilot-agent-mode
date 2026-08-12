import { useEffect, useState } from 'react';
import { getApiUrl, normalizeCollection } from '../utils/api';

function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        const response = await fetch(getApiUrl('users'), { signal: controller.signal });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || 'Unable to load users');
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

    fetchUsers();

    return () => controller.abort();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Users</h1>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {items.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">No users found.</div>
            </div>
          ) : (
            items.map((user) => (
              <div key={user._id || user.email || user.name} className="col-md-6 col-xl-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <h2 className="h5 card-title">{user.name}</h2>
                    <p className="mb-2 text-muted">{user.email}</p>
                    <span className="badge bg-primary-subtle text-primary-emphasis">
                      {user.fitnessLevel || 'beginner'}
                    </span>
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

export default Users;
