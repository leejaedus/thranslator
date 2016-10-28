/* @flow */
export const DEFAULT_ACTION = 'DEFAULT_ACTION';
export function defaultAction(text) {
  return {
    type: 'DEFAULT_ACTION',
    text,
  }
}
