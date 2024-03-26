import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { BadgeIndianRupee, Clock, Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
  let eta = restaurant.estimatedDeliveryTime;
  let color = "text-green-500";
  let minsOrHrs = "mins";

  if (
    restaurant.estimatedDeliveryTime > 35 &&
    restaurant.estimatedDeliveryTime <= 59
  )
    color = "text-yellow-400";
  else if (eta >= 60) {
    eta = eta / 60;
    minsOrHrs = eta == 1 ? "hr" : "hrs";
    color = "text-red-600";
  }

  return (
    <Link
      to={`/details/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group my-6"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((item, index) => (
              <span className="flex">
                <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-col">
            <div className={`flex items-center gap-1 ${color}`}>
              <Clock className={`${color}`} />
              {eta} {minsOrHrs}
            </div>
            <div className="flex items-center gap-1">
              <BadgeIndianRupee />
              Delivery from ₹{restaurant.deliveryPrice}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
