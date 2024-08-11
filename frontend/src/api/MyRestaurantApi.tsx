import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.post(
      `${API_BASE_URL}/api/my/restaurant`,
      restaurantFormData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!response) {
      throw new Error("Failed to create restaurant");
    }
    return response.data;
  };
  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);
  if (isSuccess) {
    toast.success("Restaurant created");
  }
  if (error) {
    toast.error("Unable to create restaurant");
  }
  return { createRestaurant, isLoading };
};

export const useGetMyrestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.get(
      `${API_BASE_URL}/api/my/restaurant`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!response) {
      throw new Error("Failed to fetch getMyRestaurant");
    }
    return response.data;
  };
  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );
  return { restaurant, isLoading };
};

export const useUpdateMyRestuarant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.put(
      `${API_BASE_URL}/api/my/restaurant`,
      restaurantFormData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!response) {
      throw new Error("Failed to update MyRestaurant");
    }

    return response.data;
  };
  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant updated");
  }
  if (error) {
    toast.error("Unable to failed update Restaurant");
  }
  return { updateRestaurant, isLoading };
};

export const useGetMyrestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurantOrderRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.get(
      `${API_BASE_URL}/api/my/restaurant/order`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response) {
      throw new Error("failed to fetch restaurant order");
    }
    return response.data;
  };
  const { data: orders, isLoading } = useQuery(
    "fetchMyRestaurantOrder",
    getMyRestaurantOrderRequest
  );
  return { orders, isLoading };
};
type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};
export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();
   
    const response = await axios.put(
      `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      JSON.stringify({status: updateStatusOrderRequest.status }),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if(!response) {
      throw new Error("Failed to update the order of restaurant")
    }
    return response.data
  };
  const {mutateAsync : updateRestaurantStatus , isLoading , isError , isSuccess , reset} = useMutation(updateMyRestaurantOrder)
  if(isSuccess){
    toast.success("Order updated")
  }
  if(isError){
    toast.error("Unable to order update")
    reset()
  }
  return {updateRestaurantStatus , isLoading}
};


