import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-gray-200">
      <footer className="flex flex-col w-full max-w-1200 py-8 mx-auto">
        <div className="contact-us flex flex-col-reverse md:flex-row justify-between items-center md:items-top">
          <div className="contact-details text-center md:text-left w-11/12 md:w-1/3">
            <h3 className="font-bold text-2xl font-pen text-cyan-900 underline underline-offset-8 mb-2">
              Contact Us
            </h3>
            <p className="font-normal text-xl text-gray-500">Elegant Apparels</p>
            <p className="font-normal text-xl text-gray-500">
              007/S.B. Gorai Road
            </p>
            <p className="font-normal text-xl text-gray-500">
              Asansol, India 713303
            </p>
          </div>
          <div className="quick-links flex flex-col text-gray-500 text-lg text-center mb-4 md:mb-0 md:text-right w-11/12 md:w-1/3">
            <h3 className="font-bold text-2xl font-pen text-cyan-900 underline underline-offset-8 mb-2">
              Quick Links
            </h3>
            <Link to="/contact-us" className="hover:text-gray-700">
              Contact Us
            </Link>
            <Link to="/seller" className="hover:text-gray-700">
              Are you a Seller?
            </Link>
            <Link to="/product/men" className="hover:text-gray-700">
              Men's Clothing
            </Link>
            <Link to="/product/women" className="hover:text-gray-700">
              Women's Clothing
            </Link>
            <Link href="/product/kid" className="hover:text-gray-700">
              Kid's Clothing
            </Link>
          </div>
        </div>
        <div className="footer-bottom text-center text-base font-light mt-4">
          <span>&copy; {new Date().getFullYear()} Elegant Apparels</span>
        </div>
      </footer>
    </div>
  );
}
