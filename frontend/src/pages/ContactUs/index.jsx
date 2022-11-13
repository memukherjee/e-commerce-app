import { useContext, useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { MouseOverLinkContext } from "../../App";
import InputBox from "../../components/InputBox";

export default function ContactUs() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const { setMouseOverLink } = useContext(MouseOverLinkContext);

  useEffect(() => {
    document.title = "Contact Us || Elegant Apparels";
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formName, formEmail, formMessage);
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="contact-form text-center md:text-left w-11/12 mx-auto max-w-500 h-100vh flex justify-center items-center">
        <div className="w-full">
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
              autoComplete="off"
            />
            <InputBox
              setValue={setFormEmail}
              value={formEmail}
              type="email"
              label="Email"
              autoComplete="off"
            />
            <div className="relative">
              <textarea
                id="message"
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                className="w-full p-2 mb-2 outline-none bg-transparent md:text-left resize-none overflow-auto text-xl placeholder-transparent border-b-2 border-gray-400 peer focus:outline-none focus:border-cyan-900"
                autoComplete="off"
                autoCorrect="off"
                placeholder="Message"
              />
              <label
                htmlFor="message"
                className="absolute text-lg -top-3.5 text-cyan-900 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-cyan-900 peer-focus:text-lg left-0"
              >
                Message
              </label>
            </div>
            <button
              className="bg-cyan-900 text-white w-11/12 md:w-2/3 mx-auto mt-4 rounded-md md:rounded-none py-2 md:p-3 hover:bg-black transition-colors cursor-none duration-500"
              onMouseOver={() => setMouseOverLink(true)}
              onMouseOut={() => setMouseOverLink(false)}
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </m.div>
  );
}
