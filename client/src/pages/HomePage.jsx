import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ProductTabs from "../components/product/ProductTabs";
import EmptyState from "../components/product/EmptyState";
import {
  getPublishedProducts,
  getUnpublishedProducts,
} from "../services/productService";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("published");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (tab) => {
    try {
      setLoading(true);

      const data =
        tab === "published"
          ? await getPublishedProducts()
          : await getUnpublishedProducts();

      setProducts(data.data || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(activeTab);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header title="Home" />

        <div className="bg-white flex-1">
          <ProductTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="h-[calc(100vh-100px)] flex items-center justify-center px-4">
            {loading ? (
              <p className="text-sm text-gray-500">Loading products...</p>
            ) : products.length === 0 ? (
              <EmptyState
                title={
                  activeTab === "published"
                    ? "No Published Products"
                    : "No Unpublished Products"
                }
                description={
                  activeTab === "published" ? (
                    <>
                      Your Published Products will appear here
                      <br />
                      Create your first product to publish
                    </>
                  ) : (
                    <>
                      Your Unpublished Products will appear here
                      <br />
                      Create your first product to publish
                    </>
                  )
                }
              />
            ) : (
              <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
                  >
                    <div className="h-40 bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No Image</span>
                      )}
                    </div>

                    <h3 className="text-sm font-semibold text-[#222] mb-1">
                      {product.productName}
                    </h3>

                    <p className="text-xs text-gray-500 mb-1">
                      {product.brandName}
                    </p>

                    <p className="text-xs text-gray-500 mb-1">
                      Type: {product.productType}
                    </p>

                    <p className="text-xs text-gray-500 mb-1">
                      Stock: {product.quantityStock}
                    </p>

                    <p className="text-xs text-gray-500 mb-1">
                      MRP: Rs. {product.mrp}
                    </p>

                    <p className="text-xs text-gray-500">
                      Selling: Rs. {product.sellingPrice}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
