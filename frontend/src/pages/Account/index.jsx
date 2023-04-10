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
      <div className="min-h-100vh py-16 w-11/12 max-w-1000 mx-auto">
        <Link to="/account/profile">
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="profile-image-container w-20 mx-auto rounded-full overflow-hidden"
          >
            <img
              src={user.avatar}
              alt="profile"
              className="profile-image w-full h-full object-cover"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = `https://avatars.dicebear.com/api/initials/${user?.name}.svg`;
              }}
            />
          </m.div>
        </Link>
        <span className="font-pen text-cyan-900 text-4xl font-bold block mb-4">
          <AnimatedText
            text={`Hi, ${user.name.split(" ")[0]}`}
            align="center"
            direction="y"
          />
        </span>
        <div className="account-options flex flex-wrap justify-start gap-2">
          {getAccountOptions(user).map((option, index) => (
            <AccountOptionCard key={index} option={option} />
          ))}
        </div>
      </div>
    </PageFadeTransitionContainer>
  );
}
