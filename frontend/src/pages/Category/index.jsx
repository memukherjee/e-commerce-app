import { motion as m } from "framer-motion";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MouseOverLinkContext } from "../../App";

export default function Category() {
  const categories = ["Shirt", "Pant", "Kurta", "Shoe", "Watch", "Bag", "Hat"];
  const images = {
    Shirt:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    Pant: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    Kurta:
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    Shoe: "https://images.unsplash.com/photo-1617606002806-94e279c22567?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    Watch:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
    Bag: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
    Hat: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  };
  const { setMouseOverLink } = useContext(MouseOverLinkContext);

  useEffect(() => {
    document.title = "Categories || Elegant Apparels";
  }, []);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-10"
    >
      <h1 className="mb-8 text-2xl font-bold">Category</h1>
      <div className="flex flex-wrap justify-around items-center gap-8">
        {categories.map((category) => (
          <Link
            onMouseOver={() => setMouseOverLink(true)}
            onMouseOut={() => setMouseOverLink(false)}
            onClick={() => setMouseOverLink(false)}
            key={category}
            to={`/products/${category}`}
            className="w-11/12 md:w-1/4"
          >
            <div
              style={{
                backgroundImage: `url(${images[category]})`,
              }}
              className="outline bg-center outline-4 outline-cyan-900 outline-offset-4 bg-cyan-900 w-full py-20"
            >
              <span className="text-white font-medium text-xl bg-black bg-opacity-80 py-4 px-8">
                {category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </m.div>
  );
}
