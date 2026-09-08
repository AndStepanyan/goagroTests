import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from '../api-client';
import { LoginCredentials } from './auth.types';

export class AuthApiClient extends ApiClient {
  constructor(
    request: APIRequestContext,
    private readonly authorization: string,
  ) {
    super(request);
  }

  login(credentials: LoginCredentials): Promise<APIResponse> {
    return this.post('/api/auth/login', {
      maxRedirects: 0,
      headers: {
        Accept: 'text/plain',
        Authorization: this.authorization,
        'Content-Type': 'application/json-patch+json',
      },
      data: credentials,
    });
  }
}