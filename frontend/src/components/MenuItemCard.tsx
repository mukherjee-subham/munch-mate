import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import AddSubtractQuantity from "./ui/AddSubtractQuantity";

type Props = {
  menuItem: MenuItem;
  addToCart: () => void;
  minusFromCart: () => void;
};

const MenuItemCard = ({ menuItem, addToCart, minusFromCart }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div className="font-bold">₹{menuItem.price}</div>
        <AddSubtractQuantity
          addToCart={addToCart}
          minusFromCart={minusFromCart}
        />
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
