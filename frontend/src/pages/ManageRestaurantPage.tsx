import {
  useCreateMyRestaurant,
  useGetMyrestaurant,
  useGetMyrestaurantOrders,
  useUpdateMyRestuarant,
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyrestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestuarant();
  const { orders } = useGetMyrestaurantOrders();
  const isEditing = !!restaurant;
  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 py-10 rounded-lg px-5"
      >
        <h2 className="text-2xl font-bold pl-2">{orders?.length || 0} Active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
