import { APP_API_BASE_URL } from './configs';

export const getRequest = (
  url: string,
  onSuccess: Function,
  onError = (statusCode?: Number, statusText?: string) => {},
  abortController?: AbortController,
) => {
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
      console.log(e);
      onError();
    });
};
export const fetchNeeds = (
  limit: string,
  offset: string,
  onSuccess: Function,
  onError = () => {},
) => {
  console.log(`fetching needs with offset ${offset}`);
  const assetsApiRequest = new URL(`${APP_API_BASE_URL}/assets`);
  assetsApiRequest.searchParams.append('type', 'request');
  assetsApiRequest.searchParams.append('limit', limit);
  assetsApiRequest.searchParams.append('offset', offset);
  getRequest(assetsApiRequest.href + assetsApiRequest.hash, onSuccess, onError);
};
