import { BASE_URL } from 'config';

function fetchBase(
  method: string,
  apipoint: string,
  token?: string,
  input?: any,
  _options?: any
) {
  let options: any = _options || {};
  options['method'] = method;

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  options['headers'] = headers;

  if (input) {
    options['body'] = JSON.stringify(input);
  }

  return fetch(`${BASE_URL}${apipoint}`, options)
    .then(result => {
      if (result.ok) {
        return result.json();
      }
      return result.text();
    })
    .then(result => {
      if (typeof result == 'string') {
        throw new Error(result);
      }
      return result;
    });
}

export const get = (apipoint: string, token?: string, input?: any) =>
  fetchBase('GET', apipoint, token, input);
export const post = (
  apipoint: string,
  token?: string,
  input?: any,
  options?: any
) => fetchBase('POST', apipoint, token, input, options);
