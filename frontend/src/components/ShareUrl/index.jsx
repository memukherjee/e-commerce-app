import { motion as m } from "framer-motion";
import { toast } from "react-toastify";
export default function ShareUrl({ className, children, title, text, url }) {
  function shareNative() {
    return new Promise(async (resolve) => {
      await navigator.share({
        title: title ?? document.title,
        text: text ?? document.title,
        url: url ?? window.location.href,
      });

      resolve();
    });
  }

  function shareFallback() {
    return new Promise(async (resolve) => {
      if (navigator.clipboard) {
        await navigator.clipboard
          .writeText(url)
          .then(() => {
            console.log("Copied to clipboard");
            toast.success("Link Copied to clipboard");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      resolve();
    });
  }

  const handleOnClick = async () => {
    if (navigator.share) {
      console.log("Share supported");
      await shareNative();
    } else {
      console.log("Share not supported");
      await shareFallback();
    }
  };
  return (
    <m.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className={`${className}`}
      onClick={handleOnClick}
    >
      {children ?? <i className="fa-solid fa-share"></i>}
    </m.button>
  );
}
