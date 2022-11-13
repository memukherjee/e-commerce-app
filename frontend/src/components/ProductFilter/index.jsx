export default function index({ filterTabOpen }) {
  return (
    <div
      style={filterTabOpen ? { left: "4rem" } : { left: "-100%" }}
      className="filters px-4 py-8 backdrop-blur-sm max-w-300 bg-black text-white bg-opacity-50 fixed top-40 transition-all duration-300 rounded-md flex flex-col justify-start items-center z-10"
    >
      <h1 className="text-xl font-semibold">Filters</h1>
      <div className="filter-container text-base flex flex-col justify-center items-center gap-4">
        <div className="filter-item flex justify-between items-center w-11/12">
          <span className="text-lg font-medium">Price</span>
          <div className="price-filter flex justify-center items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              autoComplete="off"
              className="p-2 w-1/2 text-white font-semibold placeholder:text-gray-300 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-white"
            />
            <input
              type="number"
              placeholder="Max"
              autoComplete="off"
              className="p-2 w-1/2 text-white font-semibold placeholder:text-gray-300 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-white"
            />
          </div>
        </div>
        <div className="filter-item flex justify-between items-start w-11/12">
          <span className="text-lg font-medium">Category</span>
          <div className="category-filter flex flex-wrap justify-center items-center gap-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 accent-cyan-900 border-none focus:outline-none"
                  id={`category${item}`}
                />
                <label htmlFor={`category${item}`} className="text-white">
                  Category {item}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="filter-item flex justify-between items-start w-11/12">
          <fieldset className="border-2 w-full">
            <legend className="text-lg font-medium">Sort By</legend>
            <div className="sort-filter flex flex-col justify-center items-center gap-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 accent-cyan-900 border-none focus:outline-none"
                    id={`sort${item}`}
                    name="sort"
                  />
                  <label htmlFor={`sort${item}`} className="text-white">
                    Sort by {item}
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
