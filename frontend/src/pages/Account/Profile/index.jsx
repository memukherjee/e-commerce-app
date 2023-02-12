import { useContext, useState } from "react";
import Modal from "../../../components/Modal";
import ModalButton from "../../../components/ModalButton";
import PageFadeTransitionContainer from "../../../components/PageFadeTransitionContainer";
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
      <Modal modalOpen={modalOpen} close={close} ModalChild={modalChild} />
      <div className="profile-card-wrapper w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[550px]">
        <div className="profile-card text-white bg-gray-400 mx-2 rounded py-6 px-4 shadow-xl shadow-gray-700">
          <ModalButton
            className="absolute top-5 right-10 bg-white bg-opacity-30 p-2 rounded-md"
            onClick={() => {
              setModalChild("Change Details");
              open();
            }}
          >
            <span className="text-white">
              <i className="fa-solid fa-user-pen"></i>
            </span>
          </ModalButton>

          <div className="profile-card__header text-center mx-auto">
            <div
              onMouseOver={() => setAvatarHover(true)}
              onMouseLeave={() => setAvatarHover(false)}
              className="profile-card__header__avatar w-20 rounded-full overflow-hidden mx-auto relative"
            >
              <img
                className="w-full h-full object-cover transition-all duration-100 ease-in-out"
                style={
                  avatarHover
                    ? { filter: "brightness(50%) blur(1px)" }
                    : { filter: "brightness(100%)" }
                }
                src={user?.avatar}
                alt="avatar"
              />
              {avatarHover && (
                <ModalButton className="absolute inset-0" onClick={()=>{
                  setModalChild("Change Avatar")
                  open()
                }}>
                  <i className="fa-solid fa-edit"></i>
                </ModalButton>
              )}
            </div>
            <div className="profile-card__body__name text-center text-2xl font-normal">
              <span>{user?.name}</span>
            </div>
            <hr className="mt-4 border-2 border-gray-200 rounded" />
          </div>
          <div className="profile-card__body text-left mt-4">
            <div className="profile-card__body__email text-lg font-normal">
              <span className="mr-2">Email Id:</span>
              <span>{user?.email}</span>
            </div>
            <div className="profile-card__body__mobile text-lg font-normal">
              <span className="mr-2">Mobile No:</span>
              <span>{user?.mobile}</span>
            </div>
            <div className="profile-card__body__address text-lg font-normal">
              <span className="mr-2">Address:</span>
              <span>{user?.address}</span>
            </div>
            <div className="profile-card__body__password text-lg font-normal">
              <span className="mr-2">Password:</span>
              <span>********</span>
              <ModalButton
                className="bg-white rounded text-gray-400 px-2 mx-2 shadow-sm shadow-gray-700 hover:bg-gray-200 hover:text-gray-500 transition-colors duration-100 ease-in-out"
                onClick={() => {
                  setModalChild("ChangePassword");
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
