export default function ModalButton({ className, onClick, children, disabled }) {
  return (
    <button disabled={disabled} className={className} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
