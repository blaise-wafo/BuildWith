import { Loader } from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import GigCardSingle from "../components/GigCardSingle";
import { useDispatch, useSelector } from "react-redux";
import { filterGigs, getAllGigs } from "../redux/GigSlice/gigSlice";
import { useEffect, useState } from "react";
import programming from "../assets/programming-tech-thin.56382a2.svg";
import graphics from "../assets/graphics-design-thin.ff38893.svg";
import digital from "../assets/digital-marketing-thin.68edb44.svg";
import writing from "../assets/writing-translation-thin.fd3699b.svg";
import video from "../assets/video-animation-thin.9d3f24d.svg";
import music from "../assets/music-audio-thin.43a9801.svg";
import business from "../assets/business-thin.885e68e.svg";
import consulting from "../assets/consulting-thin.d5547ff.svg";
import aiserivce from "../assets/ai-services-thin.104f389.svg";

const GigsDisplayPage = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const { filteredGigs, filteredGigsLoading, allGigs, allGigLoading } =
    useSelector((state) => state.gig);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeCategory === null) {
      dispatch(getAllGigs());
    }
  }, [activeCategory, dispatch]);

  const currentGigs = activeCategory === null ? allGigs : filteredGigs;
  const currentLoading =
    activeCategory === null ? allGigLoading : filteredGigsLoading;

  const categories = [
    {
      title: "Programming & Tech",
      value: "Programming & Tech",
      icon: (
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          💻
        </div>
      ),
      img: <img src={programming} width={80} alt="" />,
    },
    {
      title: "Graphics & Design",
      value: "Graphics & Design",
      icon: (
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
          🎨
        </div>
      ),
      img: <img src={graphics} width={80} alt="" />,
    },
    {
      title: "Digital Marketing",
      value: "Digital Marketing",
      icon: (
        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
          📈
        </div>
      ),
      img: <img src={digital} width={80} alt="" />,
    },
    {
      title: "Writing & Translation",
      value: "Writing & Translation",
      icon: (
        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
          ✍️
        </div>
      ),
      img: <img src={writing} width={80} alt="" />,
    },
    {
      title: "Video & Animation",
      value: "Video & Animation",
      icon: (
        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
          🎬
        </div>
      ),
      img: <img src={video} width={80} alt="" />,
    },
    {
      title: "Music & Audio",
      value: "Music & Audio",
      icon: (
        <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
          🎵
        </div>
      ),
      img: <img src={music} width={80} alt="" />,
    },
    {
      title: "Business",
      value: "Business",
      icon: (
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
          💼
        </div>
      ),
      img: <img src={business} width={80} alt="" />,
    },
    {
      title: "AI Services",
      value: "AI Services",
      icon: (
        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
          🤖
        </div>
      ),
      img: <img src={aiserivce} width={80} alt="" />,
    },
    {
      title: "Lifestyle",
      value: "Lifestyle",
      icon: (
        <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
          🌟
        </div>
      ),
      img: <img src={consulting} width={80} alt="" />,
    },
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category.value);
    dispatch(filterGigs(category.value));
  };

  const handleShowAll = () => {
    setActiveCategory(null);
    dispatch(getAllGigs());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Explore Services
          </h1>
          <p className="text-gray-600">
            Find the perfect freelance service for your project
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Browse by Category
          </h2>

          <div className="hidden lg:flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            <div
              onClick={handleShowAll}
              className={`w-[120px] h-[120px] flex-shrink-0 bg-white rounded-2xl shadow-sm p-4 overflow-hidden border transition-all duration-200 cursor-pointer ${
                activeCategory === null
                  ? "border-green-500 bg-gradient-radial from-green-500/20 from-10% to-white shadow-md"
                  : "border-gray-200 hover:bg-gradient-radial hover:from-green-500/10 hover:from-10% hover:to-white hover:shadow-md"
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                  🏠
                </div>
                <div className="font-semibold text-gray-800 text-[12px] leading-tight">
                  All Categories
                </div>
              </div>
            </div>

            {categories.map((category, idx) => (
              <CategoryCard
                key={idx}
                category={category}
                onCategoryClick={handleCategoryClick}
                isActive={activeCategory === category.value}
              />
            ))}
          </div>

          <div className="lg:hidden flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            <div
              onClick={handleShowAll}
              className={`flex-shrink-0 px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                activeCategory === null
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-gray-700 border-gray-200 hover:border-green-300"
              }`}
            >
              <span className="text-sm font-medium whitespace-nowrap">
                All Categories
              </span>
            </div>

            {categories.map((category, idx) => (
              <div
                key={idx}
                onClick={() => handleCategoryClick(category)}
                className={`flex-shrink-0 px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                  activeCategory === category.value
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-green-300"
                }`}
              >
                <span className="text-sm font-medium whitespace-nowrap">
                  {category.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeCategory
                ? `${
                    categories.find((cat) => cat.value === activeCategory)
                      ?.title || "Filtered"
                  } Services`
                : "All Services"}
            </h2>
            <div className="text-sm text-gray-500">
              {currentGigs.length} services available
            </div>
          </div>

          {currentLoading && (
            <div className="w-full flex justify-center items-center h-64">
              <div className="flex flex-col items-center gap-3">
                <Loader className="animate-spin" size={32} />
                <p className="text-gray-500">Loading services...</p>
              </div>
            </div>
          )}

          {!currentLoading && (!currentGigs || currentGigs.length === 0) && (
            <div className="w-full flex justify-center items-center h-64">
              <div className="text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No services found
                </h3>
                <p className="text-gray-500">
                  Try selecting a different category or check back later
                </p>
              </div>
            </div>
          )}

          {!currentLoading && currentGigs && currentGigs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentGigs.map((gig, idx) => (
                <GigCardSingle key={gig.id || idx} item={gig} />
              ))}
            </div>
          )}
        </div>

        {!currentLoading && currentGigs && currentGigs.length > 0 && (
          <div className="flex justify-center">
            <button className="px-8 py-3 bg-white border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
              Load More Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GigsDisplayPage;
