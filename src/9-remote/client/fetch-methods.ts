import { BASE_URL } from 'config';

function fetchBase( method: string, apipoint: string, token?: string, input?: any) {

  let options: any = {};
  if (token) {
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${token}`)
    options['headers'] = headers;
  }
  if (input) {
    options['body'] = JSON.stringify(input);
  }
  // ,todo: if result.ok else throw new Error
  // todo: auth header
  return fetch(`${BASE_URL}${apipoint}`, options).then(result => {
    if (result.ok) {
      return result.json()
    }

    throw new Error(`${result.status}, ${result.statusText}`);
  })
}

export const get = (apipoint: string, token?: string, input?: any) => fetchBase('GET', apipoint, token, input ) 
export const post = (apipoint: string, token?: string, input?: any) => fetchBase('POST', apipoint, token, input ) 

