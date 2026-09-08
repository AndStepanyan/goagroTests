import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  constructor(protected readonly request: APIRequestContext) {}

  get(path: string, options?: Parameters<APIRequestContext['get']>[1]): Promise<APIResponse> {
    return this.request.get(path, options);
  }

  post(path: string, options?: Parameters<APIRequestContext['post']>[1]): Promise<APIResponse> {
    return this.request.post(path, options);
  }

  put(path: string, options?: Parameters<APIRequestContext['put']>[1]): Promise<APIResponse> {
    return this.request.put(path, options);
  }

  patch(path: string, options?: Parameters<APIRequestContext['patch']>[1]): Promise<APIResponse> {
    return this.request.patch(path, options);
  }

  delete(path: string, options?: Parameters<APIRequestContext['delete']>[1]): Promise<APIResponse> {
    return this.request.delete(path, options);
  }
}
