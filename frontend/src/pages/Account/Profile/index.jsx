import PageFadeTransitionContainer from "../../../components/PageFadeTransitionContainer";
import useTitle from "../../../hooks/useTitle";

export default function Profile() {
  useTitle("Profile || Elegant Apparels");

  return (
    <PageFadeTransitionContainer>
      <h1>Profile</h1>
    </PageFadeTransitionContainer>
  );
}
