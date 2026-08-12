export function getApiBaseUrl() {
  const codespaceName = import.meta.env?.VITE_CODESPACE_NAME;

  if (typeof codespaceName === 'string' && codespaceName.trim()) {
    return `https://${codespaceName.trim()}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function getApiUrl(resource) {
  const normalizedResource = String(resource || '').replace(/^\/+|\/+$/g, '');
  return `${getApiBaseUrl()}/api/${normalizedResource}/`;
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}
