// Reason: every domain uses the same role-to-secret mapping.
import { fromEnv } from '../config/env';
import { randomUUID } from 'node:crypto';
/** Extend this union when the product introduces another sign-in role. */
export type UserType = 'default';
const USERNAMES: Record<UserType, string> = { default: fromEnv(process.env.TEST_USER_EMAIL, '') };
const PASSWORDS: Record<UserType, string> = {
  default: fromEnv(process.env.TEST_USER_PASSWORD, ''),
};
/** Supported sign-in roles; the demo does not require one. */
export const USER_TYPES: readonly UserType[] = ['default'];
/** True only when both parts of a role's credentials are present. */
export function hasCredentials(type: UserType): boolean {
  return Boolean(USERNAMES[type] && PASSWORDS[type]);
}
/** Resolve a complete credential pair or fail before starting sign-in. */
export function getCredentials(type: UserType): { username: string; password: string } {
  if (!hasCredentials(type)) throw new Error('Missing credentials for user type: ' + type);
  return { username: USERNAMES[type], password: PASSWORDS[type] };
}
/** Derive the execution lane from the same role used to sign in. */
export function asTag(type: UserType): string {
  return (
    '@as-' +
    type
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/_/g, '-')
      .toLowerCase()
  );
}
/** Unauthenticated tests have an explicit lane rather than a missing tag. */
export const AS_NO_LOGIN = '@as-none';

/** Disposable practice identities never read or replace the team's supplied accounts. */
export function createDemoIdentity() {
  return {
    role: 'default' as const,
    name: 'QA Example',
    email: 'qa-' + randomUUID() + '@example.com',
    password: randomUUID(),
    title: 'Mr',
    birth_date: '15',
    birth_month: '6',
    birth_year: '1990',
    firstname: 'QA',
    lastname: 'Example',
    company: 'Example Company',
    address1: '1 Example Street',
    address2: 'Suite 2',
    country: 'India',
    zipcode: '10000',
    state: 'Example State',
    city: 'Example City',
    mobile_number: '0000000000',
  };
}
export type DemoIdentity = ReturnType<typeof createDemoIdentity>;
export const DEMO_ROLE: UserType = 'default';
