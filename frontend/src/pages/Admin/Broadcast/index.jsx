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
      <div className="flex items-center justify-center w-11/12 mx-auto text-center broadcast-form md:text-left max-w-500 h-100vh">
        <div className="w-full">
          <h3 className="mb-6 text-2xl font-bold underline font-pen text-cyan-900 underline-offset-8">
            Broadcast Message
          </h3>
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col text-gray-500 items-bottom"
          >
            <select
              className="w-full py-2 mb-4 overflow-auto text-xl placeholder-transparent bg-transparent border-b-2 border-gray-400 outline-none resize-none md:text-left peer focus:outline-none focus:border-cyan-900"
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
                className="w-full p-2 my-2 overflow-auto text-xl placeholder-transparent bg-transparent border-b-2 border-gray-400 outline-none resize-none md:text-left peer focus:outline-none focus:border-cyan-900"
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
              className="w-11/12 py-2 mx-auto mt-4 text-white transition-colors duration-500 rounded-md bg-cyan-900 md:w-2/3 md:rounded-none md:p-3 hover:bg-black cursor-none"
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
