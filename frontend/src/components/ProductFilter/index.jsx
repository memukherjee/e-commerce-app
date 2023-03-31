import { useContext } from "react";
import { ScreenContext } from "../../contexts/screenContext";
import MultiRangeSlider from "../MultiRangeSlider";
import clothingTypesData from "../../assets/clothingTypes";

export default function ProductFilter({
  filterTabOpen,
  category,
  setCategory,
  clothingTypes,
  setClothingTypes,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
  categories
}) {
  const mobileScreen = useContext(ScreenContext);

  return (
    <div
      style={
        filterTabOpen
          ? mobileScreen
            ? { left: "1rem" }
            : { left: "4rem" }
          : { left: "-100%" }
      }
      className="filters h-500 overflow-y-auto px-4 py-4 backdrop-blur-sm w-11/12 md:max-w-300 bg-black text-white bg-opacity-50 fixed top-40 transition-all duration-300 rounded-md flex flex-col justify-start items-center z-10"
    >
      <h1 className="text-xl font-semibold">Filters</h1>
      <div className="filter-container text-base flex flex-col justify-center items-center gap-y-8">
        <div className="filter-item flex flex-col justify-between gap-y-2 items-start w-11/12">
          <span className="text-lg font-medium">Price</span>
          <MultiRangeSlider
            min={0}
            max={100000}
            minVal={minPrice}
            maxVal={maxPrice}
            setMinVal={setMinPrice}
            setMaxVal={setMaxPrice}
          />
        </div>
        <div className="filter-item flex flex-col justify-between items-start w-11/12">
          <span className="text-lg font-medium">Category</span>
          <div className="category-filter flex flex-wrap justify-start items-center gap-2">
            {categories.map((categoryData) => (
              <div
                key={categoryData.category_id}
                className="w-[47%] flex items-center justify-start text-start gap-2"
              >
                <input
                  type="checkbox"
                  checked={category.includes(categoryData.category_id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCategory((prev) => {
                        return Array.from(
                          new Set([...prev, categoryData.category_id])
                        );
                      });
                    } else {
                      setCategory((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(categoryData.category_id);
                        return [...newSet];
                      });
                    }
                  }}
                  className="form-checkbox h-5 w-5 accent-cyan-900 border-none focus:outline-none"
                  id={`category${categoryData.category_id}`}
                />
                <label
                  htmlFor={`category${categoryData.category_id}`}
                  className="text-white w-full"
                >
                  {categoryData.category_name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="filter-item flex flex-col justify-between items-start w-11/12">
          <span className="text-lg font-medium">Clothing for</span>
          <div className="category-filter flex flex-wrap justify-start items-center gap-2">
            {clothingTypesData.map((type) => (
              <div
                key={type.id}
                className="w-[47%] flex items-center justify-start text-start gap-2"
              >
                <input
                  type="checkbox"
                  checked={clothingTypes.includes(type.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setClothingTypes((prev) => {
                        return Array.from(
                          new Set([...prev, type.value])
                        );
                      });
                    } else {
                      setClothingTypes((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(type.value);
                        return [...newSet];
                      });
                    }
                  }}
                  className="form-checkbox h-5 w-5 accent-cyan-900 border-none focus:outline-none"
                  id={`clothig-type-${type.id}`}
                />
                <label
                  htmlFor={`clothig-type-${type.id}`}
                  className="text-white w-full"
                >
                  {type.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="filter-item flex justify-between items-start w-11/12">
          <fieldset className="border-2 w-full">
            <legend className="text-lg font-medium">Sort By</legend>
            <div className="sort-filter flex flex-col justify-around items-start gap-2 p-2">
              {[
                { label: "Relevence", value: "relevence" },
                { label: "Price (Low to High)", value: "price ascending" },
                { label: "Price (High to Low)", value: "price descending" },
                {
                  label: "Popularity (Ascending)",
                  value: "popularity ascending",
                },
                {
                  label: "Popularity (Descending)",
                  value: "popularity descending",
                },
              ].map((item) => (
                <div
                  key={item.value}
                  className="flex justify-start items-center gap-2"
                >
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 accent-cyan-900 border-none focus:outline-none"
                    id={`sort${item.value}`}
                    value={item.value}
                    checked={sort === item.value}
                    onChange={(e) => setSort(e.target.value)}
                    name="sort"
                  />
                  <label htmlFor={`sort${item}`} className="text-white">
                    Sort by {item.label}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
