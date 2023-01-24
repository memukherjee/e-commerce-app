import { useContext } from "react";
import { SellerContext } from "../../contexts/sellerContext";
import NavItem from "../NavItem";

export default function SellerNavItems({ setNavOpen }) {
  const { seller } = useContext(SellerContext);

  return (
    <>
    {seller && (
        <NavItem
          to="/seller"
          title="Dashboard"
          setNavOpen={setNavOpen}
        />
      )}
      {seller && (
        <NavItem
          to="/seller/products"
          title="Products"
          setNavOpen={setNavOpen}
        />
      )}
      {seller && (
        <NavItem to="/seller/account" title="Account" setNavOpen={setNavOpen} />
      )}
      {seller ? (
        <NavItem to="/seller/logout" title="Log Out" setNavOpen={setNavOpen} />
      ) : (
        <NavItem
          to="/seller"
          title="Welcome Seller, Sign Up or Log in"
          setNavOpen={setNavOpen}
        />
      )}
    </>
  );
}
