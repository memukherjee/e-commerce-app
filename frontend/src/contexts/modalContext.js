import { useState } from "react";
import { createContext } from "react";

export const ModalContext = createContext({
    modalOpen: false,
    setModalOpen: () => {},
});

const ModalProvider = ({ children }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;