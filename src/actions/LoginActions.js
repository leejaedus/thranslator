// @flow
export const LOGIN = 'LOGIN';
export function login(token: string): Object {
  return {
    type: LOGIN,
    token,
  }
}
