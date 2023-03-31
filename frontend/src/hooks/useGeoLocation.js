import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { getCookie, setCookie } from "../utils/cookie";

export default function useGeoLocation() {
  const [location, setLocation] = useState({
    loaded: false,
    currentLocation: {},
  });
  const locationFetched = useRef(false);

  const onSuccess = (locationDetails) => {
    axios
      .get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${locationDetails.coords.latitude}&lon=${locationDetails.coords.longitude}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
      )
      .then((res) => {
        setLocation({
          loaded: true,
          currentLocation: res?.data?.features[0]?.properties,
        });
        setCookie(
          "geoLocation",
          JSON.stringify(res?.data?.features[0]?.properties),
          1
        );
      })
      .catch((error) => {
        setLocation({
          loaded: true,
          error,
        });
        console.log(error);
      });
  };

  const onError = (error) => {
    console.log(error);
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!locationFetched.current) {
      const cachedLocation = getCookie("geoLocation");
      if (cachedLocation) {
        setLocation({
          loaded: true,
          currentLocation: JSON.parse(cachedLocation),
        });
      } else if (!("geolocation" in navigator)) {
        onError({
          code: 0,
          message: "Geolocation not supported",
        });
      } else {
        // console.log("fetching location");
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
      }
    }

    return () => {
      locationFetched.current = true;
    };
  }, []);

  return location;
}
