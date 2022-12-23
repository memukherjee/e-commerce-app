import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { MouseOverLinkContext } from "../../contexts/mouseOverLinkContext";
import InputBox from "../../components/InputBox";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import useForm from "../../hooks/useForm";
import useTitle from "../../hooks/useTitle";

export default function ContactUs() {
  const [formProcessing, setFormProcessing] = useState(false);
  const { setMouseOverLink } = useContext(MouseOverLinkContext);

  useTitle("Contact Us || Elegant Apparels");

  const sendMessage = (values) => {
    const { name, email, message } = values;
    console.log(name, email, message);
    const data = {
      name,
      email,
      msg: message,
    };
    setFormProcessing(true);
    axios
      .post(process.env.REACT_APP_API + "/contact", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Message sent successfully");
          clearForm();
        } else {
          toast.error(res.data.message);
        }
        setFormProcessing(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error sending message");
        setFormProcessing(false);
      });
  };

  const [values, handleChange, onSubmitHandler, clearForm] = useForm(
    {},
    sendMessage
  );

  const { name = "", email = "", message = "" } = values;

  return (
    <PageFadeTransitionContainer>
      <div className="contact-form text-center md:text-left w-11/12 mx-auto max-w-500 h-100vh flex justify-center items-center">
        <div className="w-full">
          <h3 className="font-bold text-2xl font-pen text-cyan-900 underline underline-offset-8 mb-6">
            Send Us a Message
          </h3>
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-bottom text-gray-500"
          >
            <InputBox
              onChange={handleChange}
              name="name"
              value={name}
              type="text"
              label="Name"
              autoComplete="off"
            />
            <InputBox
              onChange={handleChange}
              name="email"
              value={email}
              type="email"
              label="Email"
              autoComplete="off"
            />
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={handleChange}
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
              {formProcessing ? (
                <PulseLoader
                  color="#fff"
                  loading={true}
                  size={10}
                  aria-label="Loading Spinner"
                />
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </PageFadeTransitionContainer>
  );
}
