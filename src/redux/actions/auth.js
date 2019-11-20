// Types

export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
export const CONFIRM = 'CONFIRM';

export const authenticated = auth => ({
  type: 'IS_AUTHENTICATED',
  payload: { auth }
});
export const confirm = code => ({
  type: 'CONFIRM',
  payload: { code }
});
