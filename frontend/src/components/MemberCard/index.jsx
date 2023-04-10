import SignAkash from "../../assets/SignAkash";
import "./index.css";

export default function MemberCard({ member }) {
  return (
    <div
      style={{ "--accent-color": member.accentColor }}
      className="member text-center overflow-hidden relative w-full max-w-300 mx-auto md:w-23% bg-gray-100 pt-12 pb-20 md:pt-8 md:pb-14 shadow-lg shadow-gray-600"
    >
      <div className="avatar-container relative inline-block z-10 h-32 w-32 mb-8">
        <img
          className="avatar w-full h-auto rounded-full scale-100 transition-all duration-900"
          alt=""
          src={member.avatar}
        />
      </div>
      <div className="member-details">
        <h3 className="name text-lg font-medium mb-1">
          <span
            style={{ backgroundColor: member.accentColor }}
            className="text-white px-1"
          >
            {member.name.split(" ")[0]}
          </span>
          <span>{" " + member.name.split(" ")[1]}</span>
        </h3>
        <h4 className="title text-base text-gray-500">{member.title}</h4>
      </div>
      {member.name === "Akash Mukherjee" &&
        <SignAkash strokeColor={member.accentColor} />}
      <ul className="social z-[1]">
        {member.social.linkedIn && (
          <li>
            <a href={member.social.linkedIn} aria-hidden="true" rel="noreferrer" target="_blank">
              <i className="fab fa-linkedin"></i>
            </a>
          </li>
        )}
        {member.social.github && (
          <li>
            <a href={member.social.github} aria-hidden="true" rel="noreferrer" target="_blank">
              <i className="fab fa-github"></i>
            </a>
          </li>
        )}
        {member.social.twitter && (
          <li>
            <a href={member.social.twitter} aria-hidden="true" rel="noreferrer" target="_blank">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
        )}
        {member.social.facebook && (
          <li>
            <a href={member.social.facebook} aria-hidden="true" rel="noreferrer" target="_blank">
              <i className="fab fa-facebook"></i>
            </a>
          </li>
        )}
        {member.social.website && (
          <li>
            <a href={member.social.website} aria-hidden="true" rel="noreferrer" target="_blank">
              <i className="fas fa-globe"></i>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
