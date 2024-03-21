import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  selectedCuisines: string[];
  onChange: (cuisines: string[]) => void;
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const CuisineFilter = ({
  selectedCuisines,
  onChange,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleCuisinesReset = () => onChange([]);

  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisinesList);
  };

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter by Cuisine</div>
        <div
          className="text-md font-semibold mb-2 underline cursor-pointer text-blue-600"
          onClick={handleCuisinesReset}
        >
          Reset filters
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className="flex">
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
        <Button
          variant={"link"}
          onClick={onExpandedClick}
          className="flex-1 mt-4"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              Show Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              Show More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
