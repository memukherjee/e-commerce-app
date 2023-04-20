import AnimatedText from "../../components/AnimatedText";
import MemberCard from "../../components/MemberCard";
import members from "../../assets/members";
import useTitle from "../../hooks/useTitle";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";

export default function About() {
  useTitle("About Us || Elegant Apparels");

  return (
    <PageFadeTransitionContainer className="w-11/12 pt-12 mx-auto about min-h-100vh">
      <h1 className="block mb-4 text-4xl font-bold font-pen text-cyan-900">
        <AnimatedText text="Our Team" align="center" direction="y" />
      </h1>
      <div className="flex flex-wrap items-center justify-between gap-8 mx-auto team max-w-1000 md:gap-2">
        {members.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>
      <div className="w-full mx-auto mt-16 mb-4 text-center max-w-750">
        <span className="text-xl font-semibold text-transparent rainbow-text bg-clip-text">
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
