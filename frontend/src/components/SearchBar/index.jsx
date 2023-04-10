import axios from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { ScreenContext } from "../../contexts/screenContext";
import useDebounce from "../../hooks/useDebounce";
import { useClickOutside } from "react-click-outside-hook";

export default function SearchBar() {
  const mobileScreen = useContext(ScreenContext);
  const [globalSearchValue, setGlobalSearchValue] = useState("");
  const [currentSelectedSuggestion, setCurrentSelectedSuggestion] =
    useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const [isExpand, setIsExpand] = useState(false);
  const [noSuggetions, setNoSuggestions] = useState(false);
  const [parentRef, hasClickedOutside] = useClickOutside();
  const debouncedSearchValue = useDebounce(globalSearchValue, 500);
  const inputRef = useRef();

  const containerVariants = {
    expanded: {
      height: mobileScreen ? "15em" : "17em",
    },
    collapsed: {
      height: "4em",
    },
  };
  const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

  const collapseContainer = () => {
    setIsExpand(false);
    setGlobalSearchValue("");
    setFetching(false);
    setSuggestions([]);
    setNoSuggestions(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (hasClickedOutside) {
      collapseContainer();
    }
  }, [hasClickedOutside]);

  const getSuggestions = useCallback(() => {
    const pageSize = 5;
    axios
      .get(
        process.env.REACT_APP_API +
          `/products/filterProducts?query=${debouncedSearchValue}&pageNo=0&pageSize=${pageSize}`
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data && res.data.length === 0) setNoSuggestions(true);
        setSuggestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFetching(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (debouncedSearchValue === "") {
      setSuggestions([]);
      setFetching(false);
      setNoSuggestions(false);
      return;
    }

    setFetching(true);
    setNoSuggestions(false);

    getSuggestions();

    // console.log("debouncedSearchValue: ", debouncedSearchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <m.div
      variants={containerVariants}
      animate={isExpand ? "expanded" : "collapsed"}
      transition={containerTransition}
      ref={parentRef}
      className={
        "searchbar absolute top-[200px] md:top-[210px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 text-center z-[11] md:max-w-750 h-16 bg-white shadow-md shadow-gray-900 px-4 flex flex-col"
      }
    >
      <div className="w-full min-h-[4em] flex items-center relative py-3 px-5">
        <input
          className="outline-none w-full h-full border-0 mx-auto text-lg md:text-xl text-gray-700 bg-transparent focus:outline-none placeholder:text-gray-300 focus:placeholder:opacity-0 placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out"
          type="text"
          placeholder="Search for your favorite products"
          name="search"
          id="global-search"
          autoComplete="off"
          value={globalSearchValue}
          onChange={(e) => {
            if (e.target.value.trim() === "") {
              setNoSuggestions(false);
            }
            setGlobalSearchValue(e.target.value);
            setCurrentSelectedSuggestion(-1);
          }}
          ref={inputRef}
          onFocus={() => {
            setIsExpand(true);
          }}
          onKeyDown={onKeyDown}
        />
        <span
          className="text-lg md:text-xl ml-4 text-gray-400 z-10 "
          onClick={handleGlobalSearch}
        >
          <i className={`fa-solid fa-magnifying-glass`}></i>
        </span>
      </div>
      {isExpand && <span className="flex min-w-full min-h-[2px] bg-gray-400" />}
      {isExpand && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={fetching ? { textAlign: "center" } : { textAlign: "left" }}
          className="suggestions rounded-sm w-full h-full py-4 md:px-4 overflow-y-auto flex flex-col"
        >
          {fetching && (
            <div className="w-full h-full flex items-center justify-center">
              <ClipLoader
                color="#164e63"
                loading={true}
                size={60}
                className="mx-auto"
              />
            </div>
          )}

          {!fetching && suggestions.length === 0 && !noSuggetions && (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-400">Start typing to Search</p>
            </div>
          )}

          {noSuggetions && !fetching && (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-400">No suggestions found</p>
            </div>
          )}
          {!fetching && suggestions.length > 0 && (
            <div className="flex flex-col justify-center h-full">
              {suggestions.map((suggestion, index) => (
                <div
                  style={
                    currentSelectedSuggestion === index
                      ? { backgroundColor: "#aaa", color: "#fff" }
                      : {}
                  }
                  key={suggestion?.product_id}
                  className="suggestion-item w-full text-[13px] md:text-lg px-4 rounded mb-2 hover:bg-gray-200"
                >
                  <Link
                    className="w-full block text-ellipsis whitespace-nowrap overflow-hidden"
                    to={`/product/${suggestion?.product_id}`}
                  >
                    {suggestion?.product_name}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </m.div>
      )}
    </m.div>
  );
}
