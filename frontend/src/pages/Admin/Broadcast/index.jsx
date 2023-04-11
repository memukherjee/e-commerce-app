import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { MouseOverLinkContext } from "../../../contexts/mouseOverLinkContext";
import useTitle from "../../../hooks/useTitle";
import useForm from "../../../hooks/useForm";
import PageFadeTransitionContainer from "../../../components/PageFadeTransitionContainer";
import InputBox from "../../../components/InputBox";
import { getCookie } from "../../../utils/cookie";

export default function Broadcast() {
  const [formProcessing, setFormProcessing] = useState(false);
  const { setMouseOverLink } = useContext(MouseOverLinkContext);

  useTitle("Broadcast || Elegant Apparels");

  const sendMessage = (values) => {
    const { to, subject, message } = values;
    // console.log(to, subject, message);
    const data = {
      to,
      subject,
      message,
    };
    setFormProcessing(true);
    axios
      .post(process.env.REACT_APP_API + "/admin/auth/adminMail", data, {
        headers: {
          Authorization: getCookie("admin-refreshToken"),
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          toast.success("Message broadcasted successfully");
          clearForm();
        } else {
          toast.error(res.data.message);
        }
        setFormProcessing(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error broadcasting message");
        setFormProcessing(false);
      });
  };

  const [values, handleChange, onSubmitHandler, clearForm] = useForm(
    {},
    sendMessage
  );

  const { to = "default", subject = "", message = "" } = values;

  return (
    <PageFadeTransitionContainer>
      <div className="broadcast-form text-center md:text-left w-11/12 mx-auto max-w-500 h-100vh flex justify-center items-center">
        <div className="w-full">
          <h3 className="font-bold text-2xl font-pen text-cyan-900 underline underline-offset-8 mb-6">
            Broadcast Message
          </h3>
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-bottom text-gray-500"
          >
            <select
              className="w-full py-2 mb-4 outline-none bg-transparent md:text-left resize-none overflow-auto text-xl placeholder-transparent border-b-2 border-gray-400 peer focus:outline-none focus:border-cyan-900"
              name="to"
              value={to}
              onChange={handleChange}
              style={
                to === "default" ? { color: "#9CA3AF" } : { color: "#164e63" }
              }
            >
              <option value="default" disabled>
                Select Recipient
              </option>
              <option value="all">All</option>
              <option value="user">Users</option>
              <option value="seller">Sellers</option>
            </select>
            <InputBox
              onChange={handleChange}
              name="subject"
              value={subject}
              type="text"
              label="Subject"
              autoComplete="off"
            />
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={handleChange}
                className="w-full p-2 my-2 outline-none bg-transparent md:text-left resize-none overflow-auto text-xl placeholder-transparent border-b-2 border-gray-400 peer focus:outline-none focus:border-cyan-900"
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
