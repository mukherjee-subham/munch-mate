import { CartItem } from "@/pages/DetailsPage";
import { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";
import CheckoutButton from "./CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";

type Props = {
  restaurantDetails: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const Cart = ({ cartItems, restaurantDetails, removeFromCart }: Props) => {
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const getTotalCost = () => {
    const totalBasket = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    const totalPayable = totalBasket + restaurantDetails.deliveryPrice;
    return totalPayable;
  };

  const onCheckout = async (userFormData: UserFormData) => {
    console.log("userFormData", userFormData);

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurantDetails._id,
      deliveryDetails: {
        email: userFormData.email as string,
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight flex">
            <span>Your Cart</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {cartItems.map((item) => (
            <div className="flex justify-between">
              <span>
                <Badge
                  variant="outline"
                  className="mr-2 bg-orange-500 text-white"
                >
                  {item.quantity}
                </Badge>
                {item.name}
              </span>
              <span className="flex items-center gap-1">
                <Trash
                  color="red"
                  strokeWidth={2}
                  size={20}
                  onClick={() => removeFromCart(item)}
                />
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between">
            <span>Delivery fees</span>
            <span>₹{restaurantDetails.deliveryPrice}</span>
          </div>
          <Separator />
          <div className="text-xl font-bold tracking-tight flex justify-between">
            <span>Total</span>
            <span>₹{getTotalCost()}</span>
          </div>
          <Separator />
        </CardContent>
        <CardFooter>
          <CheckoutButton
            disabled={cartItems.length === 0}
            onCheckout={onCheckout}
            isLoading={isCheckoutLoading}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default Cart;
