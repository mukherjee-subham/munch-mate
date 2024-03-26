import { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restaurantDetails: Restaurant;
};

const RestaurantInfo = ({ restaurantDetails }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurantDetails.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurantDetails.city}, {restaurantDetails.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurantDetails.cuisines.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < restaurantDetails.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
