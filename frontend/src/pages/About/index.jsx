import { motion as m } from "framer-motion";
import AnimatedText from "../../components/AnimatedText";
import MemberCard from "../../components/MemberCard";

export default function About() {
  const members = [
    {
      name: "Akash Mukherjee",
      title: "Full Stack Developer",
      avatar: "https://avatars.githubusercontent.com/u/65893885?v=4",
      accentColor: "#8e7bf0",
      social: {
        linkedIn: "https://www.linkedin.com/in/memukherjee/",
        github: "https://github.com/memukherjee",
        twitter: "https://twitter.com/memukherjeee",
        facebook: "https://www.facebook.com/memukherjeee",
      },
    },
    {
      name: "Anurag Ghosh",
      title: "Java Developer",
      avatar: "https://avatars.githubusercontent.com/u/93001351?v=4",
      accentColor: "#ffa860",
      social: {
        linkedIn: "https://www.linkedin.com/in/anurag-ghosh-3ab5b3214/",
        github: "https://github.com/AnuragGh01",
      },
    },
    {
      name: "Mili Biswas",
      title: "Backend Developer",
      avatar:
        "https://media-exp1.licdn.com/dms/image/C4D03AQHHcf1k530DuQ/profile-displayphoto-shrink_400_400/0/1652020965556?e=1674086400&v=beta&t=BckTXowF2NO10H1m4rmcjbSJtX86uS1_VtEEQp7fqDs",
      accentColor: "#29c1b4",
      social: {
        linkedIn: "https://www.linkedin.com/in/mili-biswas-93b2b71a5/",
        github: "https://github.com/MiliBiswas02",
        facebook: "https://www.facebook.com/mili.biswas.180625",
      },
    },
    {
      name: "Aishwarya Ghosh",
      title: "Backend Developer",
      avatar:
        "https://media-exp1.licdn.com/dms/image/C4D03AQFp2_TZap7hCQ/profile-displayphoto-shrink_400_400/0/1656685909604?e=1674086400&v=beta&t=Hetw6nrL6K0NNF8Jb1jpNmG5gC9S-RMmWYVjavQRcoI",
      accentColor: "#ff6c80",
      social: {
        linkedIn: "https://www.linkedin.com/in/aishwarya-ghosh-5114811b6/",
        github: "https://github.com/AishwaryaGhosh67",
        facebook: "https://www.facebook.com/aishwarya.ghosh.7792",
      },
    },
  ];
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="about min-h-100vh pt-16 w-11/12 mx-auto"
    >
      <h1 className="font-pen text-cyan-900 text-4xl font-bold block mb-4">
        <AnimatedText text="Our Team" align="center" direction="y" />
      </h1>
      <div className="team max-w-1000 mx-auto flex flex-wrap justify-between items-center gap-8 md:gap-2">
        {members.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>
      <div className="text-center mx-auto w-full max-w-750 mt-16 mb-4">
        <span className="rainbow-text bg-clip-text text-transparent text-xl font-semibold">
          “Coming together is a beginning, staying together is progress, and
          working together is a success.”
        </span>
        <span className="ml-4 text-lg font-semibold whitespace-nowrap">- Henry Ford</span>
      </div>
    </m.div>
  );
}
