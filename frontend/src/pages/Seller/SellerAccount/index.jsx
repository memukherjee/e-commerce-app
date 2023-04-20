import { useContext, useState } from "react";
import Modal from "../../../components/Modal";
import ModalButton from "../../../components/ModalButton";
import PageFadeTransitionContainer from "../../../components/PageFadeTransitionContainer";
import useModal from "../../../hooks/useModal";
import useTitle from "../../../hooks/useTitle";
import DataContainer from "../../../components/DataContainer";
import ProfileAvatar from "../../../components/ProfileAvatar";
import { SellerContext } from "../../../contexts/sellerContext";
import SellerProfileDetailsForm from "../../../components/SellerProfileDetailsForm";
import UpdateSellerAvatarForm from "../../../components/UpdateSellerAvatarForm";
import UpdateSellerPasswordForm from "../../../components/UpdateSellerPasswordForm";

export default function SelllerAccount() {
  useTitle("Account || Elegant Apparels");
  const { seller } = useContext(SellerContext);
  const { modalOpen, open, close } = useModal();
  const [modalChild, setModalChild] = useState("");

  return (
    <PageFadeTransitionContainer className="relative pt-16 bg-gray-100 min-h-100vh">
      <Modal
        modalOpen={modalOpen}
        close={close}
        ModalChild={
          modalChild === "Change Details" ? (
            <SellerProfileDetailsForm close={close} />
          ) : modalChild === "Change Avatar" ? (
            <UpdateSellerAvatarForm close={close} />
          ) : modalChild === "Change Password" ? (
            <UpdateSellerPasswordForm close={close} />
          ) : (
            ""
          )
        }
      />
      <div className="flex flex-col items-center justify-start w-11/12 mx-auto profile-container max-w-1200 md:flex-row gap-y-4 md:justify-between md:items-stretch">
        <div className="flex flex-col w-full personal-details-container md:w-5/12">
          <h2 className="mb-4 text-2xl font-bold">Personal Details</h2>
          <div className="relative flex flex-col h-full px-4 py-6 bg-white data gap-y-4">
            <ProfileAvatar
              user={seller}
              setModalChild={setModalChild}
              open={open}
            />
            <DataContainer
              onClick={() => {
                setModalChild("Change Details");
                open();
              }}
              data={seller?.name}
              label="Name"
            />
            <DataContainer
              onClick={() => {
                setModalChild("Change Details");
                open();
              }}
              data={seller?.mobile}
              label="Phone"
            />
            <DataContainer
              onClick={() => {
                setModalChild("Change Details");
                open();
              }}
              data={seller?.address}
              label="Address"
            />
            <UpdateDetailsButton setModalChild={setModalChild} open={open} />
          </div>
        </div>
        <div className="flex flex-col w-full md:w-5/12 gap-y-8">
          <div className="w-full credentials-container">
            <h2 className="mb-4 text-2xl font-bold">Login Credentials</h2>
            <div className="flex flex-col px-4 py-6 bg-white data gap-y-4">
              <DataContainer
                onClick={() => {
                  setModalChild("Change Details");
                  open();
                }}
                data={seller?.email}
                label="Email"
              />
              <ChangePasswordButton setModalChild={setModalChild} open={open} />
            </div>
          </div>
          <div className="w-full achievements-container">
            <h2 className="mb-4 text-2xl font-bold">Your Achievements</h2>
            <div className="flex flex-wrap items-center px-4 py-6 text-2xl bg-white data gap-x-4 justify-evenly">
              {seller?.accountStatus && (
                <div
                  title="Verified Seller"
                  className="text-center bumper-sales text-cyan-500"
                >
                  <span>
                    <i className="fa-solid fa-user-shield"></i>
                  </span>
                  <h3 className="text-base font-medium text-gray-400">
                    Verified
                  </h3>
                </div>
              )}
              {seller?.totalSoldItems >= 50000 && (
                <div
                  title="Sales more than ₹50000"
                  className="text-center text-green-500 bumper-sales"
                >
                  <span>
                    <i className="fa-solid fa-money-check-dollar"></i>
                  </span>
                  <h3 className="text-base font-medium text-gray-400">
                    Bumper Sales
                  </h3>
                </div>
              )}
              {seller?.totalProduct >= 10 && (
                <div
                  title="Inventory has more than 10 Products"
                  className="text-center pro-inventory text-amber-500"
                >
                  <span>
                    <i className="fa-solid fa-box"></i>
                  </span>
                  <h3 className="text-base font-medium text-gray-400">
                    Pro Inventory
                  </h3>
                </div>
              )}
              {seller?.totalReviews >= 10 && (
                <div
                  title="Has Product reviews more than 10"
                  className="text-center text-yellow-500 bumper-sales"
                >
                  <span>
                    <i className="fa-solid fa-star"></i>
                  </span>
                  <h3 className="text-base font-medium text-gray-400">
                    Well Reviewed
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageFadeTransitionContainer>
  );
}

const UpdateDetailsButton = ({ setModalChild, open }) => {
  return (
    <ModalButton
      className="p-4 text-white bg-cyan-900 text-3/4xl"
      onClick={() => {
        setModalChild("Change Details");
        open();
      }}
    >
      <span>Update Details</span>
    </ModalButton>
  );
};

const ChangePasswordButton = ({ setModalChild, open }) => {
  return (
    <ModalButton
      className="p-4 text-white bg-cyan-900 text-3/4xl"
      onClick={() => {
        setModalChild("Change Password");
        open();
      }}
    >
      <span>Change Password</span>
    </ModalButton>
  );
};
