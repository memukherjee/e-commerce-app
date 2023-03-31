import PuffLoader from "react-spinners/PuffLoader";

export default function Loader() {
  return (
    <div className=" w-full h-100vh -mt-12 flex justify-center items-center z-50 backdrop-blur-sm">
      <PuffLoader
        color="#164e63"
        loading={true}
        size={100}
        aria-label="Loading Spinner"
      />
    </div>
  );
}
