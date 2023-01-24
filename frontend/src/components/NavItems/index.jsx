import UserNavItems from "../UserNavItems";
import SellerNavItems from "../SellerNavItems";
import AdminNavItems from "../AdminNavItems";
import { moduleBasedOnPath } from "../../utils/checkModule";

export default function NavItems({ route, setNavOpen }) {
  return moduleBasedOnPath(
    route,
    <UserNavItems setNavOpen={setNavOpen} />,
    <SellerNavItems setNavOpen={setNavOpen} />,
    <AdminNavItems setNavOpen={setNavOpen} />
  );
}
