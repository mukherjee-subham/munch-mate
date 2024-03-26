import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

export const useGetRestaurantDetailsApi = (restaurantId?: string) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const getRestaurantDetailsRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );
    if (!response) {
      throw new Error("Failed to fetch restaurant details");
    }
    return response.json();
  };

  const { data: restaurantDetails, isLoading } = useQuery(
    "getRestaurantDetails",
    getRestaurantDetailsRequest,
    { enabled: !!restaurantId }
  );

  return { restaurantDetails, isLoading };
};

export const useSearchRestaurantsApi = (
  searchState: SearchState,
  city?: string
) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const params = new URLSearchParams();
  params.set("searchQuery", searchState.searchQuery);
  params.set("page", searchState.page.toString());
  params.set("selectedCuisines", searchState.selectedCuisines.join(","));
  params.set("sortOption", searchState.sortOption);
  const searchRestaurantsRequest =
    async (): Promise<RestaurantSearchResponse> => {
      const response = await fetch(
        `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Unable to search restaurants");
      }

      return response.json();
    };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurantsRequest", searchState],
    searchRestaurantsRequest,
    { enabled: !!city }
  );
  return { results, isLoading };
};
