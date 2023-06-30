import { axiosClient, oauth, baseURL, siteUploadFolder } from "../../api";
import { sanitize } from "../../utils/miscellaneous";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductGallery from "./Productgallery";
function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const requestData = {
          url: `${baseURL}/products`,
          method: "GET",
        };
        // Simulate an asynchronous API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axiosClient.get(requestData.url, {
          params: oauth.authorize(requestData),
        });
        const filteredProduct = response.data.find(
          (product) => product.slug === slug
        );

        if (filteredProduct) {
          setProduct(filteredProduct);
        } else {
          setProduct(null);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-t-4 border-b-4 border-red-700 rounded-full animate-spin"></div>
        </div>
      ) : product ? (
        <div className="container mx-auto my-32 px-4 xl:px-0">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="product-images">
              {product.images.length ? (
                <ProductGallery items={product?.images} />
              ) : null}
            </div>
            <div>
              <h1>{product?.name}</h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
                className="product-description mb-5"
              />

              <p
                className="font-bold text-lg"
                dangerouslySetInnerHTML={{
                  __html: sanitize(product?.price_html ?? ""),
                }}
              />
              <button className="inline-flex items-center bg-red-700 rounded-3xl border-0 py-2 px-4 text-white font-medium hover:bg-red-500">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>No product found.</p>
      )}
    </div>
  );
}

export default ProductDetails;
