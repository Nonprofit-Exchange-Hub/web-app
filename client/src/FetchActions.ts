import { APP_API_BASE_URL } from './configs';

export const getRequest = (
  url: string,
  onSuccess: Function,
  abortController?: AbortController,
  onError = (statusCode?: Number, statusText?: string) => {},
) => {
  // best practice for fetching is to allow fetches to be aborted, in case props change while a fetch is in progress
  const options = abortController ? { signal: abortController.signal } : {};
  fetch(url, options)
    .then((resp) => {
      if (!resp.ok) {
        onError(resp.status, resp.statusText);
      } else {
        return resp.json();
      }
    })
    .then((data) => onSuccess(data))
    .catch((e) => {
      if (e.name === 'AbortError') {
        // usually, this abort is intentional due to a change in props
        console.log('fetch aborted');
      } else {
        onError();
      }
    });
};
export const fetchNeeds = (
  limit: string,
  offset: string,
  onSuccess: Function,
  abortController?: AbortController,
  onError = (statusCode?: Number, statusText?: string) => {},
) => {
  const assetsApiRequest = new URL(`${APP_API_BASE_URL}/assets`);
  assetsApiRequest.searchParams.append('type', 'request');
  assetsApiRequest.searchParams.append('limit', limit);
  assetsApiRequest.searchParams.append('offset', offset);
  getRequest(assetsApiRequest.href + assetsApiRequest.hash, onSuccess, abortController, onError);
};

export const fetchDonations = (
  limit: string,
  offset: string,
  onSuccess: Function,
  abortController?: AbortController,
  onError = (statusCode?: Number, statusText?: string) => {},
) => {
  const assetsApiRequest = new URL(`${APP_API_BASE_URL}/assets`);
  assetsApiRequest.searchParams.append('type', 'donation');
  assetsApiRequest.searchParams.append('limit', limit);
  assetsApiRequest.searchParams.append('offset', offset);

  getRequest(assetsApiRequest.href + assetsApiRequest.hash, onSuccess, abortController, onError);
};
