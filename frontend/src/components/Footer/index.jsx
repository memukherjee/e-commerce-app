import React, { useContext, useState } from "react";

import { motion } from "framer-motion";
import { MouseOverLinkContext } from "../../App";

export default function Footer() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const { setMouseOverLink } = useContext(MouseOverLinkContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formName, formEmail, formMessage);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gray-200"
    >
      <footer className="flex flex-col w-full max-w-1200 py-8 mx-auto">
        <div className="contact-us flex justify-between items-top">
          <div className="contact-details w-1/3">
            <h3 className="font-bold text-2xl font-pen text-cyan-900 underline underline-offset-8 mb-2">
              Contact Us
            </h3>
            <p className="font-normal text-xl text-gray-500">Oracle Couture</p>
            <p className="font-normal text-xl text-gray-500">
              007/S.B. Gorai Road
            </p>
            <p className="font-normal text-xl text-gray-500">
              Asansol, India 713303
            </p>
          </div>
          <div className="contact-form text-right w-1/3">
            <h3 className="font-bold text-2xl font-pen text-cyan-900 underline underline-offset-8 mb-2">
              Send Us a Message
            </h3>
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col items-bottom text-gray-500"
            >
              <input
                className="w-full p-2 mb-2 outline-none bg-transparent border-b-2 text-right border-cyan-900 text-xl"
                autoComplete="off"
                autoCorrect="off"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                type="text"
                placeholder="Name"
              />
              <input
                className="w-full p-2 mb-2 outline-none bg-transparent border-b-2 border-cyan-900 text-right text-xl"
                autoComplete="off"
                autoCorrect="off"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
              <textarea
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                className="w-full p-2 mb-2 outline-none bg-transparent border-b-2 border-cyan-900 text-right resize-none overflow-auto text-xl"
                autoComplete="off"
                autoCorrect="off"
                placeholder="Message"
              />
              <button
                className="bg-cyan-900 text-white w-fit mr-0 ml-auto p-4 hover:bg-black transition-colors cursor-none duration-500"
                onMouseOver={() => setMouseOverLink(true)}
                onMouseOut={() => setMouseOverLink(false)}
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
        <div className="footer-bottom text-center text-base font-light mt-4">
          <span>&copy; {new Date().getFullYear()} Oracle Couture</span>
        </div>
      </footer>
    </motion.div>
  );
}
