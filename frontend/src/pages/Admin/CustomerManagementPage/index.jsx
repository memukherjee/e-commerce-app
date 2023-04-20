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
import useTitle from "../../../hooks/useTitle";

export default function CustomerManagementPage() {
  useTitle("Manage Customers || Elegant Apparels");
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
    <PageFadeTransitionContainer className="relative pt-12 min-h-100vh">
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

      <div className="w-11/12 mx-auto my-4 text-center customers-container">
        <div className="mb-8 customers-search">
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
          className="flex flex-wrap items-center justify-center mx-auto customers md:gap-x-16 gap-y-8"
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
                    <div className="text-lg text-left customer-details">
                      <div className="flex items-center justify-start gap-1 customer-id">
                        <span className="font-medium text-cyan-900">ID:</span>
                        <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                          {customer?.id}
                        </span>
                      </div>
                      <div className="flex items-center justify-start gap-1 customer-name">
                        <span className="font-medium text-cyan-900">Name:</span>
                        <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                          {customer?.name}
                        </span>
                      </div>
                      <div className="flex items-center justify-start gap-1 customer-email">
                        <span className="font-medium text-cyan-900">
                          <i className="fa-regular fa-envelope"></i>
                        </span>
                        <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                          {customer?.email}
                        </span>
                      </div>
                      <div className="flex items-center justify-start gap-1 customer-phone">
                        <span className="font-medium text-cyan-900">
                          <i className="fa-solid fa-phone"></i>
                        </span>
                        <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                          {customer?.mobile}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center customer-actions">
                      <ModalButton
                        onClick={() => viewCustomerDetails(customer)}
                        className="w-1/2 px-2 py-1 text-white rounded-l shadow-sm btn bg-cyan-900 shadow-black"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </ModalButton>
                      <ModalButton
                        onClick={() => deleteCustomer(customer)}
                        className="w-1/2 px-2 py-1 text-white bg-red-600 rounded-r shadow-sm btn shadow-black"
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
          {allFetched && customers.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full mt-8 no-customers text-cyan-900 gap-y-4 mb-28">
              <span className="text-3xl rotate-12">
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
