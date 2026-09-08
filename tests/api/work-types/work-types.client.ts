import {
  APIRequestContext,
  APIResponse,
} from '@playwright/test';
import { ApiClient } from '../../../api/api-client';
import { WorkTypesQuery } from './work-types.types';

export class WorkTypesApiClient extends ApiClient {
  constructor(
    request: APIRequestContext,
    private readonly accessToken: string,
  ) {
    super(request);
  }

  getList(
    query: WorkTypesQuery = {
      take: 20,
      skip: 1,
      isDeleted: false,
    },
  ): Promise<APIResponse> {
    return this.get('/api/worktype', {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        take: query.take,
        skip: query.skip,
        isDeleted: query.isDeleted,
      },
    });
  }
}