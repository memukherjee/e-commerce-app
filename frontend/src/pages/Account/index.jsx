import { useContext } from "react";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import AccountOptionCard from "../../components/AccountOptionCard";
import { UserContext } from "../../contexts/userContext";
import AnimatedText from "../../components/AnimatedText";
import getAccountOptions from "../../assets/accountOptions";
import useTitle from "../../hooks/useTitle";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";

export default function Account() {
  useTitle("Account || Elegant Apparels");
  const { user } = useContext(UserContext);

  return (
    <PageFadeTransitionContainer>
      <div className="w-11/12 py-16 mx-auto min-h-100vh max-w-1000">
        <Link to="/account/profile">
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="w-20 mx-auto overflow-hidden rounded-full profile-image-container"
          >
            <img
              src={user.avatar}
              alt="profile"
              className="object-cover w-full h-full profile-image"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = `https://avatars.dicebear.com/api/initials/${user?.name}.svg`;
              }}
            />
          </m.div>
        </Link>
        <span className="block mb-4 text-4xl font-bold font-pen text-cyan-900">
          <AnimatedText
            text={`Hi, ${user.name.split(" ")[0]}`}
            align="center"
            direction="y"
          />
        </span>
        <div className="flex flex-wrap justify-start gap-2 account-options">
          {getAccountOptions(user).map((option, index) => (
            <AccountOptionCard key={index} option={option} />
          ))}
        </div>
      </div>
    </PageFadeTransitionContainer>
  );
}
