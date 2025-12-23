import {
  CreateVehiclePayload,
  Vehicle,
  VehicleDetailsResponse,
} from "@/types/vehicle";
import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";

export interface PaginatedVehicleResponse {
  content: Vehicle[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export async function createVehicle(data: CreateVehiclePayload) {
  return apiClient(API_ROUTES.VEHICLES.CREATE, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getHostVehicles() {
  return apiClient<Vehicle[]>(API_ROUTES.VEHICLES.ME, {
    method: "GET",
  });
}

export interface VehicleQueryParams {
  page?: number;
  size?: number;
  sortBy?:
    | "createdAt"
    | "averageRating"
    | "totalBookings"
    | "pricePerDay"
    | "lastBookedAt";
  sortDirection?: "ASC" | "DESC";
}

export async function getAvailableVehicles(params?: VehicleQueryParams) {
  const queryParams = new URLSearchParams();

  if (params?.page !== undefined)
    queryParams.append("page", params.page.toString());
  if (params?.size !== undefined)
    queryParams.append("size", params.size.toString());
  if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params?.sortDirection)
    queryParams.append("sortDirection", params.sortDirection);

  const url = `${API_ROUTES.VEHICLES.AVAILABLE_VEHICLES}${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  const response = await apiClient<PaginatedVehicleResponse>(url, {
    method: "GET",
  });

  return response.content || [];
}

export async function getPopularVehicles(limit: number = 5) {
  return getAvailableVehicles({
    page: 0,
    size: limit,
    sortBy: "totalBookings",
    sortDirection: "DESC",
  });
}

export async function getRecentVehicles(limit: number = 5) {
  return getAvailableVehicles({
    page: 0,
    size: limit,
    sortBy: "createdAt",
    sortDirection: "DESC",
  });
}

export async function getVehicleDetails(id: string) {
  return apiClient<VehicleDetailsResponse>(
    API_ROUTES.VEHICLES.VEHICLE_DETAILS(id),
    {
      method: "GET",
    }
  );
}
