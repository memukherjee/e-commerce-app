import { useContext } from "react";
import { ModalContext } from "../contexts/modalContext";

export default function useModal() {
  const { modalOpen, setModalOpen } = useContext(ModalContext);
  const close = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };
  const open = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  return { modalOpen, close, open };
}
