import { GiCoffeeCup, GiSausage } from "react-icons/gi";
import { PiBowlFoodFill } from "react-icons/pi";
import { JSX } from "react";
import { IoFastFoodSharp } from "react-icons/io5";

interface FilterCategoryProps {
  onSelectCategory: (category: string | null) => void;
  activeCategory?: string | null;
  products?: { productCategory: string }[]; // optional biar reusable
}

interface CategoryItem {
  id: string;
  name: string;
  icon: JSX.Element;
  label: string | null;
}

export default function FilterCategory({
  onSelectCategory,
  activeCategory,
  products = [],
}: FilterCategoryProps) {
  const categories: CategoryItem[] = [
    {
      id: "all",
      name: "All Products",
      label: null,
      icon: <IoFastFoodSharp size={100} />,
    },
    {
      id: "food",
      name: "Foods",
      label: "food",
      icon: <PiBowlFoodFill size={100} />,
    },
    {
      id: "drink",
      name: "Drinks",
      label: "drink",
      icon: <GiCoffeeCup size={100} />,
    },
    {
      id: "snack",
      name: "Snacks",
      label: "snack",
      icon: <GiSausage size={100} />,
    },
  ];

  const getItemCount = (category: string | null) => {
    if (category === null) return products.length; // All products
    return products.filter(
      (p) => p.productCategory.toLowerCase() === category.toLowerCase()
    ).length;
  };

  return (
    <div className="w-full px-4 grid grid-cols-2 lg:grid-cols-4 mt-5 gap-5">
      {categories.map((cat) => {
        const isActive =
          (activeCategory === null && cat.label === null) ||
          activeCategory?.toLowerCase() === cat.label?.toLowerCase();

        return (
          <div
            key={cat.id}
            className={`p-5 cursor-pointer rounded-2xl transition-all ${
              isActive
                ? "bg-primary-green text-primary-cream"
                : "bg-white text-primary-green border-[1.5px] border-primary-green hover:bg-primary-green/10"
            }`}
            onClick={() => onSelectCategory(cat.label)}
          >
            <div
              className={`px-8 py-2 rounded-full border-[1.5px] w-fit ${
                isActive ? "border-primary-cream" : "border-primary-green"
              }`}
            >
              <p>Available</p>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold">{cat.name}</h1>
                <p>{getItemCount(cat.label)} items</p>
              </div>
              {cat.icon}
            </div>
          </div>
        );
      })}
    </div>
  );
}
