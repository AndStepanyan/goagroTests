import { test, expect } from "../../fixtures/api.fixture";
import {
  LoginResponse,
  ProblemDetails,
  ValidationProblemDetails,
} from "../../../api/auth/auth.types";
import { requireEnv } from "../../helpers/env";

test.describe("POST /api/auth/login", () => {
  test("returns tokens for valid credentials", async ({ authApiClient }) => {
    const response = await authApiClient.login({
      username: requireEnv("TEST_LOGIN"),
      password: requireEnv("TEST_PASSWORD"),
    });

    expect(response.status()).toBe(200);

    const body: LoginResponse = await response.json();

    expect(body.token).toEqual(expect.any(String));
    expect(body.refreshToken).toEqual(expect.any(String));
    expect(body.token.length).toBeGreaterThan(0);
    expect(body.refreshToken.length).toBeGreaterThan(0);
  });

  test("returns UserNotFound for unknown user", async ({ authApiClient }) => {
    const response = await authApiClient.login({
      username: `unknown-${Date.now()}@example.com`,
      password: "WrongPassword123!",
    });
    

    expect(response.status()).toBe(404);

    const body: ProblemDetails = await response.json();

    expect(body.status).toBe(404);
    expect(body.title).toBe("Resource not found.");
    expect(body.detail).toBe("UserNotFound");
  });

  test("returns UserNotFound for empty credentials", async ({
    authApiClient,
  }) => {
    const response = await authApiClient.login({
      username: "",
      password: "",
    });

    expect(response.status()).toBe(404);

    const body: ProblemDetails = await response.json();

    expect(body.status).toBe(404);
    expect(body.detail).toBe("UserNotFound");
  });
});
