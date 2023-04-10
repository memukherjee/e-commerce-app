import AnimatedText from "../../components/AnimatedText";
import MemberCard from "../../components/MemberCard";
import members from "../../assets/members";
import useTitle from "../../hooks/useTitle";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";

export default function About() {
  useTitle("About Us || Elegant Apparels");

  return (
    <PageFadeTransitionContainer className="about min-h-100vh pt-12 w-11/12 mx-auto">
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
        <span className="ml-4 text-lg font-semibold whitespace-nowrap">
          - Henry Ford
        </span>
      </div>
    </PageFadeTransitionContainer>
  );
}
