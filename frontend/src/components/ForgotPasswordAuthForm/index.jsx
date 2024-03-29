import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import InputBox from "../InputBox";
import useTitle from "../../hooks/useTitle";
import { moduleBasedOnPath } from "../../utils/checkModule";

export default function ForgotPassword() {
  const [recoveryEmail, setRecoeryEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useTitle("Forgot Password || Elegant Apparels");
  const location = useLocation();
  const isSeller = moduleBasedOnPath(location.pathname, false, true, false);

  const handelEmailSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    axios
      .post(
        `${process.env.REACT_APP_API}${isSeller ? "/seller" : ""}/auth/forgotpass`,
        {
          email: recoveryEmail,
        }
      )
      .then((res) => {
        setProcessing(false);
        // console.log(res);
        if (res.status === 200) {
          setIsOtpGenerated(true);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setProcessing(false);
        toast.error(err.message);
      });
  };
  const handelOtpSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    axios
      .post(`${process.env.REACT_APP_API}${isSeller ? "/seller" : ""}/auth/otp`, {
        email: recoveryEmail,
        otp: otp,
      })
      .then((res) => {
        // console.log(res);
        setProcessing(false);
        if (res.status === 200) {
          toast.success(res.data.message);
          setIsOtpVerified(true);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setProcessing(false);
        toast.error(err.message);
      });
  };

  const handelNewPassSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      axios
        .post(
          `${process.env.REACT_APP_API}${isSeller ? "/seller" : ""}/auth/reset`,
          {
            password: newPassword,
          }
        )
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            toast.success(res.data.message);
            navigate(isSeller?"/seller":"/auth");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };
  return (
    <div className="h-2/3 md:h-full form-container w-full md:w-1/3 relative text-center flex items-center">
      <form
        onSubmit={
          isOtpGenerated
            ? isOtpVerified
              ? handelNewPassSubmit
              : handelOtpSubmit
            : handelEmailSubmit
        }
        className="w-full px-4 md:min-h-500"
      >
        {!isOtpGenerated && (
          <InputBox
            value={recoveryEmail}
            onChange={(e) => setRecoeryEmail(e.target.value)}
            label="Enter your email"
            type="email"
          />
        )}
        {isOtpGenerated && !isOtpVerified && (
          <InputBox
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            label="Enter OTP sent to your email"
            type="number"
          />
        )}

        {isOtpGenerated && isOtpVerified && (
          <>
            <InputBox
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              label="Enter New Password"
              type="password"
            />
            <InputBox
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              type="password"
            />
          </>
        )}
        <button
          type="submit"
          className="bg-cyan-900 text-white cursor-none px-12 py-4"
        >
          {processing ? (
            <PulseLoader
              color="#fff"
              loading={true}
              size={10}
              aria-label="Loading Spinner"
            />
          ) : isOtpGenerated ? (
            isOtpVerified ? (
              "Set Password"
            ) : (
              "Verify OTP"
            )
          ) : (
            "Send OTP"
          )}
        </button>
      </form>
    </div>
  );
}
