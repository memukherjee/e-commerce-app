import { useState } from "react";
import ModalButton from "../ModalButton";

const ProfileAvatar = ({ user, setModalChild, open }) => {
  const [avatarHover, setAvatarHover] = useState(false);
  return (
    <div
      onMouseOver={() => setAvatarHover(true)}
      onMouseLeave={() => setAvatarHover(false)}
      className="profile-card__header__avatar self-center w-20 rounded-full overflow-hidden relative shadow shadow-gray-900 hover:border-gray-500 bg-gray-500 border-4 border-gray-300 transition-colors duration-100 ease-in-out"
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
          className="absolute inset-0 text-white"
          onClick={() => {
            setModalChild("Change Avatar");
            open();
          }}
        >
          <i className="fa-solid fa-edit"></i>
        </ModalButton>
      )}
    </div>
  );
};

export default ProfileAvatar;