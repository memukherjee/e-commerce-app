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

// https://tailwindcomponents.com/component/tooltip-on-hover

export default function Profile() {
  useTitle("Profile || Elegant Apparels");
  const { user } = useContext(UserContext);
  const { modalOpen, open, close } = useModal();
  const [avatarHover, setAvatarHover] = useState(false);
  const [modalChild, setModalChild] = useState("");
  return (
    <PageFadeTransitionContainer className="min-h-100vh relative">
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
      <div className="profile-card-wrapper w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 max-w-[550px]">
        <div
          style={{
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/cubes.png")',
          }}
          className="profile-card text-black bg-white backdrop-blur-sm mx-2 rounded py-6 px-8 shadow-xl shadow-gray-700"
        >
          <ModalButton
            className="absolute top-5 right-10 p-2 rounded-md shadow-inner shadow-black hover:bg-gray-200 hover:text-gray-500 transition-colors duration-100 ease-in-out"
            onClick={() => {
              setModalChild("Change Details");
              open();
            }}
          >
            <span>
              <i className="fa-solid fa-user-pen"></i>
            </span>
          </ModalButton>

          <div className="profile-card__header text-center mx-auto flex flex-wrap justify-around items-end mt-8">
            <div
              onMouseOver={() => setAvatarHover(true)}
              onMouseLeave={() => setAvatarHover(false)}
              className="profile-card__header__avatar w-20 rounded-full overflow-hidden relative shadow shadow-gray-900 hover:border-gray-500 bg-gray-500 border-4 border-gray-300 transition-colors duration-100 ease-in-out"
            >
              <img
                className="w-full h-full object-cover transition-all duration-100 ease-in-out"
                style={
                  avatarHover
                    ? { filter: "brightness(50%) blur(1px)" }
                    : { filter: "brightness(100%)" }
                }
                src={user?.avatar}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = `https://avatars.dicebear.com/api/initials/${user?.name}.svg`;
                }}
                alt="avatar"
              />
              {avatarHover && (
                <ModalButton
                  className="absolute inset-0"
                  onClick={() => {
                    setModalChild("Change Avatar");
                    open();
                  }}
                >
                  <i className="fa-solid fa-edit"></i>
                </ModalButton>
              )}
            </div>
            <div className="profile-card__body__name text-center text-2xl font-bold text-cyan-900">
              <span>{user?.name}</span>
            </div>
            <hr className="mt-8 w-full border-[1px] border-gray-400 rounded" />
          </div>
          <div className="profile-card__body text-gray-500 font-normal text-left mt-4 flex flex-col gap-1 justify-start items-start">
            <div className="profile-card__body__email w-full whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="mr-2 text-cyan-900 font-medium">Email Id:</span>
              <span>{user?.email}</span>
            </div>
            <div className="profile-card__body__mobile w-full whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="mr-2 text-cyan-900 font-medium">Mobile No:</span>
              <span>{user?.mobile}</span>
            </div>
            <div className="profile-card__body__address w-full whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="mr-2 text-cyan-900 font-medium">Address:</span>
              <span>{user?.address}</span>
            </div>
            <div className="profile-card__body__password w-full whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="mr-2 text-cyan-900 font-medium">Password:</span>
              <span>********</span>
              <ModalButton
                className="bg-white rounded px-2 mx-2 mb-2 shadow shadow-gray-700 border-2 hover:bg-gray-200 transition-colors duration-100 ease-in-out"
                onClick={() => {
                  setModalChild("Change Password");
                  open();
                }}
              >
                <span>Change Password</span>
              </ModalButton>
            </div>
          </div>
        </div>
      </div>
    </PageFadeTransitionContainer>
  );
}
