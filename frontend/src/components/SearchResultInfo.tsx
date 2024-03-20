import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:flex-row">
      <span>
        {total} restaurants found in{" "}
        {city.charAt(0).toUpperCase().concat(city.slice(1))}
        <Link
          to="/"
          className="ml-1 text-sm font-semibold cursor-pointer underline text-blue-500"
        >
          Change location?
        </Link>
      </span>
      Insert sort dropwdown here
    </div>
  );
};

export default SearchResultInfo;
