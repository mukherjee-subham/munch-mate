import landing from "../assets/landing.png";
import appDownload from "../assets/appDownload.png";

const Homepage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          What are you craving for today?
        </h1>
        <span className="text-xl">Food is just a click away!</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landing} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order food even faster!
          </span>
          <span>
            Download the MunchMate App for personalised recommendations and
            discounts.
          </span>
          <img src={appDownload} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
