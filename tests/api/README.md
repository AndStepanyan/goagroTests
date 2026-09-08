# API tests

API tests live in this directory and run in the dedicated `api` Playwright project.

Before adding the first scenario, identify the real endpoint, authentication scheme,
request payload, and response contract in the browser Network panel. Put reusable
domain operations in `api/` clients and use `tests/fixtures/api.fixture.ts` in specs.
