import { useGetRestaurantDetailsApi } from "@/api/SearchRestaurantsApi";
import Cart from "@/components/Cart";
import MenuItemCard from "@/components/MenuItemCard";
import RestaurantInfo from "@/components/RestaurantInfo";
import { MenuItem } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
};

const DetailsPage = () => {
  const { restaurantId } = useParams();
  const { restaurantDetails, isLoading } =
    useGetRestaurantDetailsApi(restaurantId);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter((item) => item._id !== cartItem._id);
    });
  };

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            price: menuItem.price,
            name: menuItem.name,
            quantity: 1,
          },
        ];
      }
      return updatedCartItems;
    });
  };

  if (isLoading || !restaurantDetails) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurantDetails.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurantDetails={restaurantDetails} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurantDetails.menuItems.map((item) => (
            <MenuItemCard menuItem={item} addToCart={() => addToCart(item)} />
          ))}
        </div>
        <div>
          <Cart
            restaurantDetails={restaurantDetails}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
