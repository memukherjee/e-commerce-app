import { useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import PageFadeTransitionContainer from "../../components/PageFadeTransitionContainer";
import { MouseOverLinkContext } from "../../contexts/mouseOverLinkContext";
import useCategories from "../../hooks/useCategories";
import useTitle from "../../hooks/useTitle";

export default function Category() {
  const { setMouseOverLink } = useContext(MouseOverLinkContext);

  useTitle("Categories || Elegant Apparels");

  const categories = useCategories();

  return categories.length === 0 ? (
    <Loader />
  ) : (
    <PageFadeTransitionContainer className="text-center py-10 min-h-100vh">
      <h1 className="mb-8 text-2xl font-bold">Category</h1>

      <div className="flex flex-wrap justify-around items-center gap-8">
        {categories.map((category) => (
          <Link
            onMouseOver={() => setMouseOverLink(true)}
            onMouseOut={() => setMouseOverLink(false)}
            onClick={() => setMouseOverLink(false)}
            key={category.category_name}
            to={`/products?category=${JSON.stringify({"category_id": category.category_id, "category_name": category.category_name})}`}
            state={{ category }}
            className="w-11/12 md:w-1/4"
          >
            <div
              style={{
                backgroundImage: `url(${category.category_image})`,
              }}
              className="outline bg-center bg-cover outline-4 outline-cyan-900 outline-offset-4 bg-cyan-900 w-full py-16"
            >
              <span className="text-white font-medium text-xl bg-black bg-opacity-70 py-6 px-8 backdrop-blur-sm inline-block">
                {category.category_name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PageFadeTransitionContainer>
  );
}
