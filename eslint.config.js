// Reason: lint enforces deterministic tests; Prettier owns formatting.
const tseslint = require('typescript-eslint');
const playwright = require('eslint-plugin-playwright');
const prettier = require('eslint-config-prettier');
module.exports = tseslint.config(
  {
    ignores: [
      'node_modules/**',
      '.tools/**',
      'playwright-report/**',
      'test-results*/**',
      'reports/**',
      'results/**',
      'public/**',
    ],
  },
  ...tseslint.configs.recommended,
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.spec.ts'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-skipped-test': ['warn', { allowConditional: true }],
      'playwright/expect-expect': [
        'warn',
        {
          assertFunctionNames: [
            'expect',
            '^(expect|verify|assert|prove|ensure|check|run)[A-Z]',
            'Expect(ing)?[A-Z]',
          ],
        },
      ],
      'playwright/no-wait-for-timeout': 'error',
    },
  },
  {
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-pattern': 'off',
    },
  },
  { files: ['**/*.{js,cjs,mjs}'], rules: { '@typescript-eslint/no-require-imports': 'off' } },
  prettier,
);
