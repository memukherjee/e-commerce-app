import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import ConfirmationForm from "../../../components/ConfirmationForm";
import DetailsCard from "../../../components/DetailsCard";
import Modal from "../../../components/Modal";
import ModalButton from "../../../components/ModalButton";
import PageFadeTransitionContainer from "../../../components/PageFadeTransitionContainer";
import useCustomers from "../../../hooks/useCustomers";
import useModal from "../../../hooks/useModal";
import useObserver from "../../../hooks/useObserver";
import { getCookie } from "../../../utils/cookie";

export default function CustomerManagementPage() {
  const [containerRef, isVisible] = useObserver({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });
  const { customers, setCustomers, allFetched } = useCustomers(isVisible);
  const [searchValue, setSearchValue] = useState("");

  const { modalOpen, close, open } = useModal();

  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [modalAction, setModalAction] = useState("");

  const viewCustomerDetails = (customer) => {
    open();
    setSelectedCustomer(customer);
    setModalAction("view");
  };

  const deleteCustomer = (customer) => {
    open();
    setSelectedCustomer(customer);
    setModalAction("delete");
  };

  const deleteCustomerApi = (id) => {
    axios
      .post(
        process.env.REACT_APP_API + "/admin/auth/deleteUser",
        { id },
        {
          headers: {
            Authorization: getCookie("admin-refreshToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setCustomers((prev) => prev.filter((customer) => customer.id !== id));
        toast.success("Customer deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
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
                console.log("Delete customer");
                deleteCustomerApi(selectedCustomer.id);
                close();
              }}
              close={close}
              text="Are you sure you want to delete this customer?"
            />
          ) : modalAction === "view" ? (
            <DetailsCard person={selectedCustomer} />
          ) : null
        }
      />

      <div className="customers-container text-center w-11/12 mx-auto my-4">
        <div className="customers-search mb-8">
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
          className="customers flex flex-wrap justify-center items-center md:gap-x-16 gap-y-8 mx-auto"
        >
          <AnimatePresence>
            {customers
              .filter(
                (customer) =>
                  customer?.name
                    ?.toLowerCase()
                    .includes(searchValue?.toLowerCase()) ||
                  customer?.email
                    ?.toLowerCase()
                    .includes(searchValue?.toLowerCase()) ||
                  customer?.mobile
                    ?.toLowerCase()
                    .includes(searchValue?.toLowerCase())
              )
              .map((customer) => {
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={customer.id}
                    className="customer bg-gray-200 rounded-sm shadow shadow-gray-400 p-6 max-w-300 md:w-[32%] flex flex-col gap-y-4"
                  >
                    <div className="customer-details text-left text-lg">
                      <div className="customer-id flex gap-1 justify-start items-center">
                        <span className="text-cyan-900 font-medium">ID:</span>
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">{customer?.id}</span>
                      </div>
                      <div className="customer-name flex gap-1 justify-start items-center">
                        <span className="text-cyan-900 font-medium">Name:</span>
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">{customer?.name}</span>
                      </div>
                      <div className="customer-email flex gap-1 justify-start items-center">
                        <span className="text-cyan-900 font-medium">
                          <i className="fa-regular fa-envelope"></i>
                        </span>
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">{customer?.email}</span>
                      </div>
                      <div className="customer-phone flex gap-1 justify-start items-center">
                        <span className="text-cyan-900 font-medium">
                          <i className="fa-solid fa-phone"></i>
                        </span>
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">{customer?.mobile}</span>
                      </div>
                    </div>
                    <div className="customer-actions flex justify-center items-center">
                      <ModalButton
                        onClick={() => viewCustomerDetails(customer)}
                        className="btn bg-cyan-900 text-white px-2 py-1 rounded-l shadow-sm shadow-black w-1/2"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </ModalButton>
                      <ModalButton
                        onClick={() => deleteCustomer(customer)}
                        className="btn bg-red-600 text-white px-2 py-1 rounded-r shadow-sm shadow-black w-1/2"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </ModalButton>
                    </div>
                  </motion.div>
                );
              })}
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
          {allFetched && customers.length === 0 && (
            <div className="no-customers text-cyan-900 flex flex-col gap-y-4 justify-center items-center w-full mt-8 mb-28">
              <span className="rotate-12 text-3xl">
                <i className="fa-solid fa-person-circle-exclamation"></i>
              </span>
              <h1 className="text-2xl font-medium">No customers found</h1>
              <p className="text-lg">Try searching for something else</p>
            </div>
          )}
        </motion.div>
      </div>
    </PageFadeTransitionContainer>
  );
}
