import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { moduleBasedOnPath } from "../../utils/checkModule";
import { getFooterOptions } from "../../assets/footerOptions";

export default function Footer() {
  const [footerOptions, setFooterOptions] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    const module = moduleBasedOnPath(pathname, "user", "seller", "admin");
    setFooterOptions(getFooterOptions(module));
  }, [pathname]);

  return (
    <div className="bg-gray-200">
      <footer className="flex flex-col w-full max-w-1200 py-8 mx-auto">
        <div className="contact-us flex flex-col-reverse md:flex-row justify-between items-center md:items-top">
          <div className="contact-details text-center md:text-left w-11/12 md:w-1/3">
            {footerOptions?.left?.items.length > 0 && (
              <h3 className="font-bold text-2xl font-pen text-cyan-900 underline underline-offset-8 mb-2">
                {footerOptions?.left?.heading}
              </h3>
            )}
            <div className="font-normal text-lg md:text-xl text-gray-500">
              {footerOptions?.left?.items.map((item, index) =>
                item?.type === "text" ? (
                  <p key={index}>{item?.content}</p>
                ) : (
                  <Link
                    key={index}
                    to={item?.link}
                    className="hover:text-gray-700 block"
                  >
                    {item?.content}
                  </Link>
                )
              )}
            </div>
          </div>
          <div className="quick-links flex flex-col text-gray-500 text-lg text-center mb-4 md:mb-0 md:text-right w-11/12 md:w-1/3">
            {footerOptions?.right?.items.length > 0 && (
              <h3 className="font-bold text-2xl font-pen text-cyan-900 underline underline-offset-8 mb-2">
                {footerOptions?.right?.heading}
              </h3>
            )}
            <div className="font-normal text-lg md:text-xl text-gray-500">
              {footerOptions?.right?.items.map((item, index) =>
                item?.type === "text" ? (
                  <p key={index}>{item?.content}</p>
                ) : (
                  <Link
                    key={index}
                    to={item?.link}
                    className="hover:text-gray-700 block"
                  >
                    {item?.content}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
        <div className="footer-bottom text-center text-base font-light mt-4">
          <span>&copy; {new Date().getFullYear()} Elegant Apparels</span>
        </div>
      </footer>
    </div>
  );
}
