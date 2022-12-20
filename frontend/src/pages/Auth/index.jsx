import defaultFormBg from "./images/form-bg.jpg";
import useTitle from "../../hooks/useTitle";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import AuthPageBackground from "../../components/AuthPageBackground";

export default function Auth({ Form, formBg }) {
  useTitle("Sign Up or Log In || Elegant Apparels");

  return (
    <PageFadeTransitionContainer>
      <AuthPageBackground formBg={formBg ?? defaultFormBg}>
        <Form />
      </AuthPageBackground>
    </PageFadeTransitionContainer>
  );
}
