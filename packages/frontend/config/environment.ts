interface _environment {
  API_BASE_URL: string;
  USE_MOCKED_BACKEND: boolean;
}

function _makeEnvironment(): _environment {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const useMockedBackend = (import.meta.env.VITE_MOCK_BACKEND ?? '') === 'ON';

  if (!baseUrl) {
    throw new Error('❌ VITE_API_BASE_URL is not defined in your .env file');
  }

  return {
    API_BASE_URL: baseUrl,
    USE_MOCKED_BACKEND: useMockedBackend,
  };
}

export const environment: _environment = _makeEnvironment();
