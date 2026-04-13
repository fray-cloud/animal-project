/* eslint-disable @typescript-eslint/no-var-requires */
jest.mock('axios');

const axios = require('axios');
const mockGet = jest.fn();
(axios.create as jest.Mock).mockReturnValue({ get: mockGet });

// Require service.ts AFTER axios.create is wired so the module-scope
// `serviceAPI = axios.create(...)` captures the mocked instance.
const { getAPI } = require('./service');

describe('getAPI', () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  it('creates the axios instance pointed at the Next route handler proxy', () => {
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: '/api/data-go-kr',
      timeout: 10000,
    });
  });

  it('forwards the path and merges props as query params', async () => {
    mockGet.mockResolvedValue({ data: { foo: 'bar' } });

    const result = await getAPI({ pageNo: 1, numOfRows: 10 }, '/sido_v2');

    expect(mockGet).toHaveBeenCalledWith('/sido_v2', {
      params: { pageNo: 1, numOfRows: 10 },
    });
    expect(result).toEqual({ foo: 'bar' });
  });

  it('returns the unwrapped response data', async () => {
    mockGet.mockResolvedValue({ data: { count: 42 } });
    const result = await getAPI({}, '/kind_v2');
    expect(result).toEqual({ count: 42 });
  });
});
