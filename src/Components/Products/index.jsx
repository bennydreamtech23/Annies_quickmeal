import { useState, useEffect } from "react";
import { axiosClient, oauth, baseURL, siteUploadFolder } from "../../api";
import ProductCard from "../Product";
import "../../styles/product.scss";

function Products({ showSidebar }) {
  console.log(showSidebar)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [prevButtonLoading, setPrevButtonLoading] = useState(false);
  const [nextButtonLoading, setNextButtonLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const defaultImage = siteUploadFolder + "woocommerce-placeholder-300x300.png";
  //fetch product
  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        per_page: 9,
      });

      if (selectedCategory) {
        queryParams.append("category", selectedCategory);
      }

      const url = `${baseURL}/products?${queryParams}`;
      console.log(url);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { data, headers } = await axiosClient.get(url, {
        params: oauth.authorize({ url, method: "GET" }),
      });

      setProducts(data);
      setTotalPages(parseInt(headers["x-wp-totalpages"]));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  //pagination
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setPrevButtonLoading(true);
      setCurrentPage((prevPage) => prevPage - 1);
    }
    setPrevButtonLoading(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setNextButtonLoading(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
    setNextButtonLoading(false);
  };

  const handleCategoryChange = (event) => {
    const categorySlug = event.target.value;
    setSelectedCategory(categorySlug);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchResults([]);
    fetchProducts();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = `${baseURL}/products/categories`;
        const { data } = await axiosClient.get(url, {
          params: oauth.authorize({ url, method: "GET" }),
        });
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    const filteredProducts = searchQuery
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : products;
    setSearchResults(filteredProducts);
  }, [products, searchQuery]);

  return (
    <main className="container mx-auto py-8">
      {loading ? (
        <div className="flex items-center justify-center w-100 h-100 mx-auto pt-48">
          <img width="100" src="/cart-spinner.gif" alt="spinner" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center ml-3 mr-3">
          <div className="bg-red-900  p-5 flex justify-between items-center rounded-l border-0 container">
            <div className="flex items-center">
              {categories.length > 0 && (
                <select
                  className="bg-white text-gray-700 py-4 font-bold px-10 border-0 rounded-3xl"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex items-center">
              <input
                className="placeholder-gray-400 bg-white text-gray-700 py-4 font-bold px-10 border-0 rounded-3xl"
                placeholder="Search food..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
          </div>
          <div>
            {searchResults.length > 0 ? (
              <div
                className={`grid ${
                  showSidebar === true
                    ? "lg:grid-cols-2"
                    : "grid-cols-1 lg:grid-cols-3 md:grid-cols-2"
                } mt-3 px-6 py-5 mb-3 gap-20`}
              >
                {searchResults.map((product) => (
                  <ProductCard
                    product={product}
                    defaultImage={defaultImage}
                    key={product?.id}
                    shortDescription={product?.short_description.replace(
                      /<\/?p>/g,
                      ""
                    )}
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center mt-4">No products found.</div>
            )}
            <div className="flex justify-center mt-4">
              <button
                className={`mr-2 px-4 py-2 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-red-700"
                } text-white`}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                {prevButtonLoading ? "Loading..." : "Previous"}
              </button>
              <button
                className={`ml-2 px-4 py-2 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-red-700"
                } text-white`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                {nextButtonLoading ? "Loading..." : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Products;
