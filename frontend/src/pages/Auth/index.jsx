import defaultFormBg from "./images/form-bg.jpg";
import useTitle from "../../hooks/useTitle";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import AuthPageBackground from "../../components/AuthPageBackground";

export default function Auth({ Form, formBg }) {
  useTitle("Log In or Sign Up || Elegant Apparels");

  return (
    <PageFadeTransitionContainer className="min-h-100vh">
      <AuthPageBackground formBg={formBg ?? defaultFormBg}>
        <Form />
      </AuthPageBackground>
    </PageFadeTransitionContainer>
  );
}
