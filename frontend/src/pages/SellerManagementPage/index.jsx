import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import ConfirmationForm from "../../components/ConfirmationForm";
import DetailsCard from "../../components/DetailsCard";
import Modal from "../../components/Modal";
import ModalButton from "../../components/ModalButton";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import useModal from "../../hooks/useModal";
import useObserver from "../../hooks/useObserver";
import useSellers from "../../hooks/useSellers";

export default function SellerManagementPage() {
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
    <PageFadeTransitionContainer className="min-h-100vh relative pt-12">
      <Modal
        close={close}
        modalOpen={modalOpen}
        ModalChild={
          modalAction === "delete" ? (
            <ConfirmationForm
              success="Delete"
              successAction={() => {
                console.log("Delete seller");
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
      <div className="container text-center w-11/12 mx-auto my-4">
        <div className="seller-search mb-8">
          <input
            className="search-input outline-none border-b-2 border-cyan-900 w-full max-w-500 md:text-xl text-cyan-900 mt-8 px-2"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search by name, email or phone"
          />
        </div>
        <motion.div
          layout
          className="sellers flex flex-wrap justify-center items-center md:gap-x-16 gap-y-8 mx-auto"
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
                  <div className="seller-details text-left text-lg">
                    <div className="seller-id flex gap-1 justify-start items-center">
                      <span className="text-cyan-900 font-medium">ID:</span>
                      <span>{seller?.id}</span>
                    </div>
                    <div className="seller-name flex gap-1 justify-start items-center">
                      <span className="text-cyan-900 font-medium">Name:</span>
                      <span>{seller?.name}</span>
                    </div>
                    <div className="seller-email flex gap-1 justify-start items-center">
                      <span className="text-cyan-900 font-medium">
                        <i className="fa-regular fa-envelope"></i>
                      </span>
                      <span>{seller?.email}</span>
                    </div>
                    <div className="seller-phone flex gap-1 justify-start items-center">
                      <span className="text-cyan-900 font-medium">
                        <i className="fa-solid fa-phone"></i>
                      </span>
                      <span>{seller?.mobile}</span>
                    </div>
                  </div>
                  <div className="seller-actions flex justify-center items-center">
                    <ModalButton
                      onClick={() => viewSellerDetails(seller)}
                      className="btn bg-cyan-900 text-white px-2 py-1 rounded-l shadow-sm shadow-black w-1/2"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </ModalButton>
                    <ModalButton
                      onClick={() => deleteSeller(seller)}
                      className="btn bg-red-600 text-white px-2 py-1 rounded-r shadow-sm shadow-black w-1/2"
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
              className="loading flex justify-center w-full mt-8 mb-28"
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
            <div className="no-sellers text-cyan-900 flex flex-col gap-y-4 justify-center items-center w-full mt-8 mb-28">
              <span className="rotate-12 text-3xl">
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
