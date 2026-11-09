// Reason: blank example keys should keep the public demo usable.
import 'dotenv/config';

/** Use the fallback when an environment key is blank or missing. */
export const fromEnv = (value: string | undefined, fallback: string): string =>
  value?.trim() || fallback;
// Demo defaults; replace with {{BASE_URL_UI}} / {{BASE_URL_API}} via .env or CI Variables.
const uiDefault = '{{BASE_URL_UI}}';
const apiDefault = '{{BASE_URL_API}}';
export const BASE_URL_UI = fromEnv(
  process.env.BASE_URL_UI,
  uiDefault.startsWith('{') ? 'https://demo.playwright.dev' : uiDefault,
);
export const BASE_URL_API = fromEnv(
  process.env.BASE_URL_API,
  apiDefault.startsWith('{') ? 'https://jsonplaceholder.typicode.com' : apiDefault,
);
/** Temporary practice target; the scaffold defaults remain independently usable. */
export const AUTOMATION_EXERCISE_URL = fromEnv(
  process.env.AUTOMATION_EXERCISE_URL,
  'https://automationexercise.com',
);
/** Shared budgets keep waits consistent across every layer. */
export const TIMEOUTS = {
  visible: 15_000,
  enabled: 15_000,
  page: 20_000,
  modal: 10_000,
  longAsync: 30_000,
  pollInterval: 1_000,
  // Whole-test budget, sign-in included; size from your own p99.
  test: 90_000,
} as const;
