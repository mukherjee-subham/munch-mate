import { MinusSquare, PlusSquare } from "lucide-react";

type Props = {
  addToCart: () => void;
  minusFromCart: () => void;
};

const AddSubtractQuantity = ({ addToCart, minusFromCart }: Props) => {
  return (
    <div className="flex flex-row gap-6">
      <PlusSquare
        onClick={addToCart}
        className="cursor-pointer"
        strokeWidth={2}
        color="
        #39ca1c"
      />
      <MinusSquare
        onClick={minusFromCart}
        className="cursor-pointer"
        strokeWidth={2}
        color="#ee1717"
      />
    </div>
  );
};

export default AddSubtractQuantity;
