export default function ModalButton({ className, onClick, children }) {
  return (
    <button className={className} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
