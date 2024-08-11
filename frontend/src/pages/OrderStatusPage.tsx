import { useGetMyorders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Loader2 } from "lucide-react";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyorders();

  if (isLoading) {
    return (
      <span className="flex">
        {" "}
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading....
      </span>
    );
  }

  if (!orders || orders.length === 0) {
    return " No Order Found";
  }
  return (
    <div className="space-y-10">
      {orders.map((order, index) => (
        <div key={index} className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order}/>
            <AspectRatio ratio={16/5}>
            <img src={order.restaurant.imageUrl}  className="rounded-md object-cover h-full w-full" alt="" />
            </AspectRatio>
          </div>
        </div>

      ))}
    </div>
  );
};

export default OrderStatusPage;
