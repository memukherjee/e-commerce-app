import React, { useContext, useState } from "react";

import { motion } from "framer-motion";
import { MouseOverLinkContext } from "../../App";
import InputBox from "../InputBox";

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
        <div className="contact-us flex flex-col-reverse md:flex-row justify-between items-center md:items-top">
          <div className="contact-details text-center md:text-left w-11/12 md:w-1/3">
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
          <div className="contact-form text-center mb-4 md:mb-0 md:text-right w-11/12 md:w-1/3">
            <h3 className="font-bold text-2xl font-pen text-cyan-900 underline underline-offset-8 mb-6">
              Send Us a Message
            </h3>
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col items-bottom text-gray-500"
            >
              <InputBox
                setValue={setFormName}
                value={formName}
                type="text"
                label="Name"
                align="right"
                autoComplete="off"
              />
              <InputBox
                setValue={setFormEmail}
                value={formEmail}
                type="email"
                label="Email"
                align="right"
                autoComplete="off"
              />
              <div className="relative">
                <textarea
                  id="message"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full p-2 mb-2 outline-none bg-transparent text-center md:text-right resize-none overflow-auto text-xl placeholder-transparent border-b-2 border-gray-400 peer focus:outline-none focus:border-cyan-900"
                  autoComplete="off"
                  autoCorrect="off"
                  placeholder="Message"
                />
                <label
                  for="message"
                  class="absolute text-xl -top-3.5 text-cyan-600 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-cyan-900 peer-focus:text-lg right-0"
                >Message</label>
              </div>
              <button
                className="bg-cyan-900 text-white w-11/12 md:w-fit mx-auto rounded-md md:rounded-none md:mr-0 md:ml-auto py-2 md:p-4 hover:bg-black transition-colors cursor-none duration-500"
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
