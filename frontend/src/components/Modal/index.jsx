import { AnimatePresence, motion } from "framer-motion";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0vh",
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 50,
      stiffness: 500,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
};


export default function Modal({ modalOpen, close, ModalChild }) {
  return (
    <AnimatePresence initial={false} mode="wait">
      {modalOpen && (
        <motion.div
          className="backdrop fixed inset-0 bg-black bg-opacity-70 w-full h-100vh z-20 flex items-center justify-center overflow-y-hidden"
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="modal overflow-hidden bg-white w-full max-w-500 rounded h-auto max-h-90vh p-4 pt-12"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.button
              className="modal-button absolute top-0 right-0 text-xl text-red-700 m-4"
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={close}
            >
              <i className="fa-solid fa-xmark"></i>
            </motion.button>
            {ModalChild}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
