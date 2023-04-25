import { useContext, useState } from "react";
import Modal from "../../../components/Modal";
import ModalButton from "../../../components/ModalButton";
import PageFadeTransitionContainer from "../../../components/PageFadeTransitionContainer";
import UpdateUserAvatarForm from "../../../components/UpdateUserAvatarForm";
import UpdateUserPasswordForm from "../../../components/UpdateUserPasswordForm";
import UserProfileDetailsForm from "../../../components/UserProfileDetailsForm";
import { UserContext } from "../../../contexts/userContext";
import useModal from "../../../hooks/useModal";
import useTitle from "../../../hooks/useTitle";
import DataContainer from "../../../components/DataContainer";
import ProfileAvatar from "../../../components/ProfileAvatar";
import axios from "axios";
import { getCookie } from "../../../utils/cookie";
import { toast } from "react-toastify";

export default function Profile() {
  useTitle("Profile || Elegant Apparels");
  const { user, setUser } = useContext(UserContext);
  const { modalOpen, open, close } = useModal();
  const [modalChild, setModalChild] = useState("");
  return (
    <PageFadeTransitionContainer className="relative pt-16 bg-gray-100 min-h-100vh">
      <Modal
        modalOpen={modalOpen}
        close={close}
        ModalChild={
          modalChild === "Change Details" ? (
            <UserProfileDetailsForm close={close} />
          ) : modalChild === "Change Avatar" ? (
            <UpdateUserAvatarForm close={close} />
          ) : modalChild === "Change Password" ? (
            <UpdateUserPasswordForm close={close} />
          ) : (
            ""
          )
        }
      />
      <div className="flex flex-col items-center justify-start w-11/12 mx-auto profile-container max-w-1200 md:flex-row gap-y-4 md:justify-between md:items-stretch">
        <div className="flex flex-col w-full personal-details-container md:w-5/12">
          <h2 className="mb-4 text-2xl font-bold">Personal Details</h2>
          <div className="relative flex flex-col h-full px-4 py-6 bg-white data gap-y-4">
            <ProfileAvatar
              user={user}
              setModalChild={setModalChild}
              open={open}
            />
            <DataContainer
              onClick={() => {
                setModalChild("Change Details");
                open();
              }}
              data={user?.name}
              label="Name"
            />
            <DataContainer
              onClick={() => {
                setModalChild("Change Details");
                open();
              }}
              data={user?.mobile}
              label="Phone"
            />
            <DataContainer
              onClick={() => {
                setModalChild("Change Details");
                open();
              }}
              data={user?.address}
              label="Address"
            />
            <UpdateDetailsButton setModalChild={setModalChild} open={open} />
          </div>
        </div>
        <div className="flex flex-col w-full md:w-5/12 gap-y-8">
          <div className="w-full credentials-container">
            <h2 className="mb-4 text-2xl font-bold">Login Credentials</h2>
            <div className="flex flex-col px-4 py-6 bg-white data gap-y-4">
              <DataContainer
                onClick={() => {
                  setModalChild("Change Details");
                  open();
                }}
                data={user?.email}
                label="Email"
              />
              <ChangePasswordButton setModalChild={setModalChild} open={open} />
            </div>
          </div>
          <div className="w-full newsletter-container">
            <h2 className="mb-4 text-2xl font-bold">Newsletter</h2>
            <div className="flex flex-col px-4 py-6 bg-white data gap-y-4">
              <DataContainer
                data={
                  user?.isSubscribedtoNewsLetter
                    ? "Subscribed"
                    : "Not Subscribed"
                }
                label="Discover The Latest Newsletters"
              />
              <SubscribeToNewsletterButton user={user} setUser={setUser} />
            </div>
          </div>
        </div>
      </div>
    </PageFadeTransitionContainer>
  );
}

const UpdateDetailsButton = ({ setModalChild, open }) => {
  return (
    <ModalButton
      className="p-4 text-white bg-cyan-900 text-3/4xl"
      onClick={() => {
        setModalChild("Change Details");
        open();
      }}
    >
      <span>Update Details</span>
    </ModalButton>
  );
};

const ChangePasswordButton = ({ setModalChild, open }) => {
  return (
    <ModalButton
      className="p-4 text-white bg-cyan-900 text-3/4xl"
      onClick={() => {
        setModalChild("Change Password");
        open();
      }}
    >
      <span>Change Password</span>
    </ModalButton>
  );
};

const SubscribeToNewsletterButton = ({ user, setUser }) => {
  return (
    <button
      onClick={() => {
        axios
          .post(
            process.env.REACT_APP_API + "/auth/newsletter",
            {
              isSubscribed: !user?.isSubscribedtoNewsLetter,
            },
            {
              headers: {
                Authorization: getCookie("refreshToken"),
              },
            }
          )
          .then((res) => {
            // console.log(res);
            setUser((prev) => ({
              ...prev,
              isSubscribedtoNewsLetter: !prev?.isSubscribedtoNewsLetter,
            }));
          })
          .catch((err) => {
            toast.error("Something went wrong");
            console.log(err);
          });
      }}
      className="p-4 text-white bg-cyan-900 text-3/4xl"
    >
      <span>
        {user?.isSubscribedtoNewsLetter ? "Unsubscribe" : "Subscribe"}
      </span>
    </button>
  );
};
