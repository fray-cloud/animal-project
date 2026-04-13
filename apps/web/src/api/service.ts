import axios from 'axios';
import { APIResponse } from '@animal-project/shared-types';

// Calls go to the Next Route Handler at app/api/data-go-kr/[...path],
// which proxies to the public-data-portal and injects the server-only
// DATA_GO_KR_SERVICE_KEY. The browser never sees the key.
const baseURL = '/api/data-go-kr';

export const serviceAPI = axios.create({
  baseURL,
  timeout: 10000,
});

export const getAPI = async <T, K>(props: T, path: string) => {
  const data = await serviceAPI.get<APIResponse<K>>(path, {
    params: {
      ...props,
    },
  });
  return data.data;
};
