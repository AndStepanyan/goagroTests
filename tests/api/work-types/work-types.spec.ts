import { test, expect } from "../../fixtures/api.fixture";
import { WorkTypesResponse } from "./work-types.types";

test.describe("GET /api/worktype", () => {
  test("returns first page of active work types", async ({
    workTypesApiClient,
  }) => {
    const response = await workTypesApiClient.getList();

    expect(response.status()).toBe(200);

    const body: WorkTypesResponse = await response.json();

    expect(body.value).toBeInstanceOf(Array);
    expect(body.value.length).toBeGreaterThan(0);
    expect(body.value.length).toBeLessThanOrEqual(20);

    expect(body.pagedInfo.pageNumber).toBe(1);
    expect(body.pagedInfo.pageSize).toBe(20);
    expect(body.pagedInfo.totalRecords).toBeGreaterThanOrEqual(
      body.value.length,
    );
    expect(body.pagedInfo.totalPages).toBeGreaterThanOrEqual(1);

    for (const workType of body.value) {
      expect(workType.id).toEqual(expect.any(String));
      expect(workType.name).toEqual(expect.any(String));
      expect(workType.isDeleted).toBe(false);

      expect(workType.workTypeCategory.id).toEqual(expect.any(String));

      expect(workType.workTypeCategory.name).toEqual(expect.any(String));

      expect(workType.workTypeCategory.unitOfMeasurement.name).toEqual(
        expect.any(String),
      );
    }
  });

  test("returns different records for different pages", async ({
    workTypesApiClient,
  }) => {
    const firstResponse = await workTypesApiClient.getList({
      take: 5,
      skip: 1,
      isDeleted: false,
    });

    const secondResponse = await workTypesApiClient.getList({
      take: 5,
      skip: 2,
      isDeleted: false,
    });

    expect(firstResponse.status()).toBe(200);
    expect(secondResponse.status()).toBe(200);

    const firstPage: WorkTypesResponse = await firstResponse.json();

    const secondPage: WorkTypesResponse = await secondResponse.json();

    expect(firstPage.pagedInfo.pageNumber).toBe(1);
    expect(secondPage.pagedInfo.pageNumber).toBe(2);

    expect(firstPage.pagedInfo.pageSize).toBe(5);
    expect(secondPage.pagedInfo.pageSize).toBe(5);

    expect(firstPage.value.length).toBeLessThanOrEqual(5);
    expect(secondPage.value.length).toBeLessThanOrEqual(5);

    expect(firstPage.pagedInfo.totalRecords).toBe(
      secondPage.pagedInfo.totalRecords,
    );

    expect(firstPage.pagedInfo.totalPages).toBe(
      Math.ceil(firstPage.pagedInfo.totalRecords / 5),
    );

    const firstPageIds = firstPage.value.map((workType) => workType.id);

    const secondPageIds = secondPage.value.map((workType) => workType.id);

    for (const id of secondPageIds) {
      expect(firstPageIds).not.toContain(id);
    }
  });
});
