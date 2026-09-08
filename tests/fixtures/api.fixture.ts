import { expect, test as base } from '@playwright/test';
import { ApiClient } from '../../api/api-client';
import { AuthApiClient } from '../../api/auth/auth.client';
import { requireEnv } from '../helpers/env';
import { WorkTypesApiClient } from '../api/work-types/work-types.client';
import { LoginResponse } from '../../api/auth/auth.types';

type ApiFixtures = {
  apiClient: ApiClient;
  authApiClient: AuthApiClient;
  workTypesApiClient: WorkTypesApiClient;
};

export const test = base.extend<ApiFixtures>({
  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request));
  },

  authApiClient: async ({ request }, use) => {
    const authApiClient = new AuthApiClient(
      request,
      requireEnv('API_AUTHORIZATION'),
    );

    await use(authApiClient);
  },

  workTypesApiClient: async (
    { request, authApiClient },
    use,
  ) => {
    const loginResponse = await authApiClient.login({
      username: requireEnv('TEST_LOGIN'),
      password: requireEnv('TEST_PASSWORD'),
    });

    if (!loginResponse.ok()) {
      throw new Error(
        `API login failed with status ${loginResponse.status()}`,
      );
    }

    const loginBody: LoginResponse =
      await loginResponse.json();

    if (!loginBody.token) {
      throw new Error('API login response does not contain token');
    }

    const workTypesApiClient = new WorkTypesApiClient(
      request,
      loginBody.token,
    );

    await use(workTypesApiClient);
  },


});

export { expect };