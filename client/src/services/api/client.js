const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export async function apiClient(endpoint, options = {}) {
  const { body, headers = {}, method = 'GET', ...customConfig } = options;

  const config = {
    method,
    headers: {
      ...headers,
    },
    ...customConfig,
  };

  if (body) {
    if (body instanceof FormData) {
      config.body = body;
    } else {
      config.headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(body);
    }
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    if (response.status === 204) return null;
    return await response.json();
  } catch (err) {
    console.error(`[API Client Error ${endpoint}]:`, err);
    throw err;
  }
}
