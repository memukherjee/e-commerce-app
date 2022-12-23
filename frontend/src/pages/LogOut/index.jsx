import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import useTitle from "../../hooks/useTitle";
import { eraseCookie } from "../../utils/cookie";
export default function LogOut() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useTitle("LogOut || Elegant Apparels");
  
  useEffect(() => {
    eraseCookie("user");
    setUser(null);
    navigate("/");
  }, [navigate, setUser]);
  return (
    <div className="min-h-100vh flex justify-center items-center">
      <h1 className="text-2xl font-semibold">Logging You Out</h1>
    </div>
  );
}
