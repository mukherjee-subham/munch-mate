import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusHeader from "@/components/OrderStatusHeader";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();
  console.log("Orders object:", orders);
  if (isLoading) {
    return "Loading...";
  }

  if (!orders || orders.length === 0) {
    console.log("No orders");
    return "No orders found";
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
