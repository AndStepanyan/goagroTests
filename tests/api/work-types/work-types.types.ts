import {
  PagedResponse,
} from '../common/pagination.types';

export type UnitOfMeasurement = {
  id: string;
  name: string;
  code: string;
  symbol: string;
  type: string;
  createdDate: string;
  modifyDate: string;
  isDeleted: boolean;
};

export type WorkTypeCategory = {
  id: string;
  code: string;
  groupCode: number;
  name: string;
  unitOfMeasurementId: string;
  calculationMethod: number;
  sortOrder: number;
  unitOfMeasurement: UnitOfMeasurement;
  createdDate: string;
  modifyDate: string;
  isDeleted: boolean;
};

export type WorkType = {
  id: string;
  name: string;
  color: string | null;
  workTypeCategoryId: string;
  workTypeCategory: WorkTypeCategory;
  createdDate: string;
  modifyDate: string;
  isDeleted: boolean;
};

export type WorkTypesResponse = PagedResponse<WorkType>;

export type WorkTypesQuery = {
  take: number;
  skip: number;
  isDeleted: boolean;
};