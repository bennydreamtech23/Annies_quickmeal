import "../../../styles/homepage.scss";

const HeroSection = () => {
  return (
    <div className="heroContainer">
      <div className="flex flex-col gap-8">
        <h1 className="bg-gray-800 px-3 py-4 text-3xl bg-opacity-50 text-white border-0 rounded-lg w-1/2 capitalize shadow shadow-white">
          Life is dull without good food.
        </h1>
        <h3 className="ml-10 bg-white w-1/2 px-3 py-4 text-2xl bg-opacity-75 text-black border-0 rounded-lg shadow shadow-red-800">
          That why <span className="text-red-800">AnniesQuickMeal</span> is the
          place to
        </h3>
        <p className="bg-gray-800 px-3 py-4 text-lg bg-opacity-50 text-white border-0 rounded-lg w-96 shadow shadow-white">
          Order the best meal, you can think of
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
