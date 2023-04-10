import { useContext, useEffect, useState } from "react";
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

export default function Profile() {
  useTitle("Profile || Elegant Apparels");
  const { user } = useContext(UserContext);
  const { modalOpen, open, close } = useModal();
  const [modalChild, setModalChild] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("subscribed") === "true") setSubscribed(true);
  }, []);
  return (
    <PageFadeTransitionContainer className="min-h-100vh relative pt-16 bg-gray-100">
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
      <div className="profile-container w-11/12 max-w-1200 mx-auto flex flex-col md:flex-row justify-start items-center gap-y-4 md:justify-between md:items-stretch">
        <div className="personal-details-container w-full md:w-5/12 flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
          <div className="data relative bg-white px-4 py-6 flex flex-col gap-y-4 h-full">
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
        <div className="w-full md:w-5/12 flex flex-col gap-y-8">
          <div className="credentials-container w-full">
            <h2 className="text-2xl font-bold mb-4">Login Credentials</h2>
            <div className="data bg-white px-4 py-6 flex flex-col gap-y-4">
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
          <div className="newsletter-container w-full">
            <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
            <div className="data bg-white px-4 py-6 flex flex-col gap-y-4">
              <DataContainer
                data={subscribed ? "Subscribed" : "Not Subscribed"}
                label="Discover The Latest Newsletters"
              />
              <SubscribeToNewsletterButton
                subscribed={subscribed}
                setSubscribed={setSubscribed}
              />
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
      className="bg-cyan-900 text-white p-4 text-3/4xl"
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
      className="bg-cyan-900 text-white p-4 text-3/4xl"
      onClick={() => {
        setModalChild("Change Password");
        open();
      }}
    >
      <span>Change Password</span>
    </ModalButton>
  );
};

const SubscribeToNewsletterButton = ({ subscribed, setSubscribed }) => {
  return (
    <button
      onClick={() => {
        if (subscribed) {
          localStorage.setItem("subscribed", false);
          setSubscribed(false);
        } else {
          localStorage.setItem("subscribed", true);
          setSubscribed(true);
        }
      }}
      className="bg-cyan-900 text-white p-4 text-3/4xl"
    >
      <span>{subscribed ? "Unsubscribe" : "Subscribe"}</span>
    </button>
  );
};
