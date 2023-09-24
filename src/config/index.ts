export const API_URL = process.env.API_URL as string;
export const APP_TITLE = process.env.APP_TITLE as string;
export const API_MOCKING = process.env.API_MOCKING === 'true';
export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_EDGE = process.env.NEXT_RUNTIME === 'edge';
export const IS_NODE = process.env.NEXT_RUNTIME === 'nodejs';
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
export const IS_TEST = process.env.NODE_ENV === 'test'// || ((window as any)?.Cypress as unknown);
