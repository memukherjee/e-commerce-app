import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ScreenContext } from "../../contexts/screenContext";
import useDebounce from "../../hooks/useDebounce";

export default function SearchBar() {
  const mobileScreen = useContext(ScreenContext);
  const [globalSearchValue, setGlobalSearchValue] = useState("");
  const [currentSelectedSuggestion, setCurrentSelectedSuggestion] =
    useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  const debouncedSearchValue = useDebounce(globalSearchValue, 500);

  useEffect(() => {
    if (debouncedSearchValue === "") {
      setSuggestions([]);
      setFetching(true);
      return;
    }

    setFetching(true);

    const getSuggestions = () => {
      axios
        .get(
          process.env.REACT_APP_API +
            `/products/search?query=${debouncedSearchValue}&pageNo=0&pageSize=5`
        )
        .then((res) => {
          // console.log(res.data);
          setSuggestions(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setFetching(false);
        });
    };

    getSuggestions();
    // console.log("debouncedSearchValue: ", debouncedSearchValue);
  }, [debouncedSearchValue]);

  const onKeyDown = (e) => {
    // console.log(e.key);
    if (e.key === "Enter") {
      if (
        currentSelectedSuggestion >= 0 &&
        currentSelectedSuggestion < suggestions.length
      ) {
        navigate(
          `/product/${suggestions[currentSelectedSuggestion]?.product_id}`
        );
      } else {
        handleGlobalSearch();
      }
    } else if (e.key === "ArrowDown") {
      setCurrentSelectedSuggestion(
        (currentSelectedSuggestion + 1) % suggestions.length
      );
    } else if (e.key === "ArrowUp") {
      setCurrentSelectedSuggestion(
        currentSelectedSuggestion <= 0
          ? suggestions.length - 1
          : currentSelectedSuggestion - 1
      );
    }
  };

  const handleGlobalSearch = () => {
    navigate(`/products?query=${globalSearchValue}`);
  };
  return (
    <div
      style={
        mobileScreen
          ? globalSearchValue === ""
            ? { top: "10rem" }
            : { top: "15rem" }
          : {}
      }
      className="searchbar absolute top-40 md:top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 text-center z-[11] md:max-w-750"
    >
      <input
        className="outline-none border-0 pl-3 pr-8 py-3 md:pl-5 md:pr-14 md:py-4 shadow-md shadow-gray-900 rounded-sm w-full mx-auto text-lg md:text-xl overflow-hidden"
        type="text"
        placeholder="Search for your favorite products"
        name="search"
        id="global-search"
        autoComplete="off"
        value={globalSearchValue}
        onChange={(e) => setGlobalSearchValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <span
        className="text-lg md:text-xl absolute right-4 top-3 md:top-4 text-gray-400 z-10 "
        onClick={handleGlobalSearch}
      >
        <i className={`fa-solid fa-magnifying-glass`}></i>
      </span>
      {globalSearchValue !== "" && (
        <div
          style={fetching ? { textAlign: "center" } : {}}
          className="suggestions bg-white shadow-md shadow-gray-900 rounded-sm w-full mt-1 md:mt-0 mx-auto py-4 px-8 text-left"
        >
          {fetching ? (
            <ClipLoader
              color="#164e63"
              loading={true}
              size={60}
              className="mx-auto"
            />
          ) : (
            <>
              {suggestions.length === 0 && !fetching && (
                <p className="text-gray-400">No suggestions found</p>
              )}
              <ul className="list-none p-0 m-0">
                {suggestions.map((suggestion, index) => (
                  <li
                    style={
                      currentSelectedSuggestion === index
                        ? { backgroundColor: "#aaa", color: "#fff" }
                        : {}
                    }
                    key={suggestion?.product_id}
                    className="suggestion-item px-4 rounded mb-2 hover:bg-gray-200"
                  >
                    <Link to={`/product/${suggestion?.product_id}`}>
                      {suggestion?.product_name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
