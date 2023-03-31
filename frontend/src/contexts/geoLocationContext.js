import { createContext } from "react";
import useGeoLocation from "../hooks/useGeoLocation";

export const GeoLocationContext = createContext({
  location: null,
});

const GeoLocationProvider = ({ children }) => {
  const location = useGeoLocation();
  return (
    <GeoLocationContext.Provider value={location}>
      {children}
    </GeoLocationContext.Provider>
  );
};

export default GeoLocationProvider;
