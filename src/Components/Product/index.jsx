import { sanitize } from "../../utils/miscellaneous";
import { Link } from "react-router-dom";
import AddToCart from "../cart/add-to-cart";
import "../../styles/product.scss";
const ProductCard = ({ product, defaultImage, shortDescription }) => {
  const productType = product?.type ?? "";

  return (
    <div className="card-deco flex flex-col items-center justify-center mx-auto px-2 py-5">
      <div className="w-100 h-100 bg-red-50 rounded-xl border-none p-3">
        <img
          src={product?.images[0]?.src || defaultImage}
          className="w-48 h-48 object-cover object-center rounded-full border-0"
        />
      </div>
      <Link
        to={`/shop/${product?.slug}`}
        className="text-red-700 mt-3 capitalize font-medium text-lg text-center"
      >
        {product?.name}
      </Link>
      <p className="mt-2 text-sm tracking-wide text-gray-500">
        {shortDescription}
      </p>
      <div className="flex gap-8 justify-center items-center mt-3 ">
        <p
          className="font-bold text-base"
          dangerouslySetInnerHTML={{
            __html: sanitize(product?.price_html ?? ""),
          }}
        />
        {"simple" === productType ? <AddToCart product={product} /> : null}
      </div>
    </div>
  );
};

export default ProductCard;
