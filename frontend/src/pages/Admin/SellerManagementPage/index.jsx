import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import ConfirmationForm from "../../../components/ConfirmationForm";
import DetailsCard from "../../../components/DetailsCard";
import Modal from "../../../components/Modal";
import ModalButton from "../../../components/ModalButton";
import PageFadeTransitionContainer from "../../../components/PageFadeTransitionContainer";
import useModal from "../../../hooks/useModal";
import useObserver from "../../../hooks/useObserver";
import useSellers from "../../../hooks/useSellers";
import useTitle from "../../../hooks/useTitle";

export default function SellerManagementPage() {
  useTitle("Manage Sellers || Elegant Apparels");
  const [containerRef, isVisible] = useObserver({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });
  const { sellers, deleteSellerApi, allFetched } = useSellers(isVisible);
  const { modalOpen, close, open } = useModal();
  const [selectedSeller, setSelectedSeller] = useState({});
  const [modalAction, setModalAction] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const viewSellerDetails = (seller) => {
    open();
    setSelectedSeller(seller);
    setModalAction("view");
  };
  const deleteSeller = (seller) => {
    open();
    setSelectedSeller(seller);
    setModalAction("delete");
  };

  return (
    <PageFadeTransitionContainer className="relative pt-12 min-h-100vh">
      <Modal
        close={close}
        modalOpen={modalOpen}
        ModalChild={
          modalAction === "delete" ? (
            <ConfirmationForm
              success="Delete"
              successAction={() => {
                // console.log("Delete seller");
                deleteSellerApi(selectedSeller.id);
                close();
              }}
              close={close}
              text="Are you sure you want to delete this seller?"
            />
          ) : modalAction === "view" ? (
            <DetailsCard person={selectedSeller} />
          ) : null
        }
      />
      <div className="container w-11/12 mx-auto my-4 text-center">
        <div className="mb-8 seller-search">
          <input
            className="w-full px-2 mt-8 border-b-2 outline-none search-input border-cyan-900 max-w-500 md:text-xl text-cyan-900"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search by name, email or phone"
          />
        </div>
        <motion.div
          layout
          className="flex flex-wrap items-center justify-center mx-auto sellers md:gap-x-16 gap-y-8"
        >
          <AnimatePresence>
            {sellers
              .filter(
                (seller) =>
                  seller?.name
                    ?.toLowerCase()
                    .includes(searchValue?.toLowerCase()) ||
                  seller?.email
                    ?.toLowerCase()
                    .includes(searchValue?.toLowerCase()) ||
                  seller?.mobile
                    ?.toLowerCase()
                    .includes(searchValue?.toLowerCase())
              )
              .map((seller) => (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={seller.id}
                  className="seller bg-gray-200 rounded-sm shadow shadow-gray-400 p-6 max-w-300 md:w-[32%] flex flex-col gap-y-4"
                >
                  <div className="text-lg text-left seller-details">
                    <div className="flex items-center justify-start gap-1 seller-id">
                      <span className="font-medium text-cyan-900">ID:</span>
                      <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                        {seller?.id}
                      </span>
                    </div>
                    <div className="flex items-center justify-start gap-1 seller-name">
                      <span className="font-medium text-cyan-900">Name:</span>
                      <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                        {seller?.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-start gap-1 seller-email">
                      <span className="font-medium text-cyan-900">
                        <i className="fa-regular fa-envelope"></i>
                      </span>
                      <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                        {seller?.email}
                      </span>
                    </div>
                    <div className="flex items-center justify-start gap-1 seller-phone">
                      <span className="font-medium text-cyan-900">
                        <i className="fa-solid fa-phone"></i>
                      </span>
                      <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                        {seller?.mobile}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center seller-actions">
                    <ModalButton
                      onClick={() => viewSellerDetails(seller)}
                      className="w-1/2 px-2 py-1 text-white rounded-l shadow-sm btn bg-cyan-900 shadow-black"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </ModalButton>
                    <ModalButton
                      onClick={() => deleteSeller(seller)}
                      className="w-1/2 px-2 py-1 text-white bg-red-600 rounded-r shadow-sm btn shadow-black"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </ModalButton>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Loading */}
          {!allFetched && (
            <div
              ref={containerRef}
              className="flex justify-center w-full mt-8 loading mb-28"
            >
              <ClipLoader
                color="#164e63"
                loading={true}
                size={50}
                aria-label="Loading Spinner"
              />
            </div>
          )}
          {allFetched && sellers.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full mt-8 no-sellers text-cyan-900 gap-y-4 mb-28">
              <span className="text-3xl rotate-12">
                <i className="fa-solid fa-person-circle-exclamation"></i>
              </span>
              <h1 className="text-2xl font-medium">No sellers found</h1>
              <p className="text-lg">Try searching for something else</p>
            </div>
          )}
        </motion.div>
      </div>
    </PageFadeTransitionContainer>
  );
}
