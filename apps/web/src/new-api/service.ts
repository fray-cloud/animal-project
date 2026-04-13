import axios from 'axios';
import { APIResponse } from '@animal-project/shared-types';

const baseURL = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc';

// NEXT_PUBLIC_ because getAPI runs in the browser (TanStack Query
// client). The key is still visible in the Network tab; moving getAPI
// behind a Next Route Handler (apps/web/app/api/**) removes even that
// exposure and is tracked under #9 (Vercel deploy). This change only
// removes the literal key from git history so it can be rotated.
const serviceKey = process.env.NEXT_PUBLIC_DATA_GO_KR_SERVICE_KEY;

if (!serviceKey) {
  // eslint-disable-next-line no-console
  console.error(
    'NEXT_PUBLIC_DATA_GO_KR_SERVICE_KEY is not set. See apps/web/.env.example.'
  );
}

export const serviceAPI = axios.create({
  baseURL,
  timeout: 10000,
});

export const getAPI = async <T, K>(props: T, path: string) => {
  const data = await serviceAPI.get<APIResponse<K>>(path, {
    params: {
      ...props,
      serviceKey,
      _type: 'json',
    },
  });
  return data.data;
};
