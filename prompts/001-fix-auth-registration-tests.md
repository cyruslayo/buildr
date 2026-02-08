<objective>
Diagnose and fix the failing E2E tests in `__tests__/e2e/auth-registration.spec.ts`.
The tests are failing primarily due to timeouts (page not loading) and subsequent element visibility failures.
</objective>

<context>
The user is running `pnpm exec playwright test auth-registration --project="Desktop Chrome"`.
The tests fail with:
- `Test timeout of 30000ms exceeded` at `page.goto('/register')` in `beforeEach`.
- `expect(locator).toBeVisible() failed` for NDPR consent checkboxes.

This strongly indicates that the `/register` page is hanging or failing to load during the test.
Common causes in this environment include:
1.  **Database Connection / Prisma**: The server might be hanging while trying to connect to the database (likely an initialization error or timeout).
2.  **App Start**: The dev server might be taking too long or failing to compile.

Relevant files:
- `__tests__/e2e/auth-registration.spec.ts`: The failing test suite.
- `src/app/(auth)/register/page.tsx`: The registration page.
- `src/features/auth/components/register-form.tsx`: The form component containing the NDPR checkbox.
- `src/features/auth/actions/register.ts`: The server action (likely acts as backend).
</context>

<requirements>
1.  **Diagnose the Hang**: Determine why `page.goto('/register')` is timing out.
    - Check if the database/Prisma client is initializing correctly in the test environment.
    - Ensure the application runs correctly in the test mode.
2.  **Fix the Tests**:
    - If it's a timeout issue, ensure the app is reachable.
    - If the "Lagos Luxury" styling validation is incorrect, update the test or the component to match.
    - Ensure the "NDPR consent" checkbox is accessible and visible.
3.  **Validate**:
    - Run the tests again to confirm they pass: `pnpm exec playwright test auth-registration`.
</requirements>

<implementation>
- **Investigate Prisma**: Check `lib/prisma.ts` or wherever the client is instantiated. Ensure it handles connection errors gracefully or that the test DB is available.
- **Check Timeout Config**: You might need to increase the test timeout or `actionTimeout` in `playwright.config.ts` if the environment is just slow, but 30s is usually enough for local dev. Focus on the *hang*.
- **Fix Selectors**: If the page loads but elements are missing, check if the "Lagos Luxury" UI changes (shadows/depth) effectively hid the native checkbox or changed the DOM structure such that the locator `input[name="ndprConsent"]` fails.
    - Note: The component uses `input type="checkbox" ... className="... h-5 w-5 ..."`. It should be visible.
    - The test expects a specific structure for the "Lagos Luxury" depth check: `div:has(> div > input[name="ndprConsent"])`. Verify this structure matches `src/features/auth/components/register-form.tsx` (Line 73-75: wrapper div -> inner div -> input). *It looks like it matches.*
</implementation>

<output>
Modify the necessary files to fix the hang and ensuring tests pass.
- `src/lib/prisma.ts` (if DB connection is the issue)
- `playwright.config.ts` (if config adjustment needed)
- `__tests__/e2e/auth-registration.spec.ts` (if expectations need tuning)
</output>

<verification>
Run the failing test:
`pnpm exec playwright test auth-registration --project="Desktop Chrome"`
Ensure all 4 tests pass.
</verification>
