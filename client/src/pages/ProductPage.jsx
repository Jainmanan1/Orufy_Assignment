import { useEffect, useMemo, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import AddProductModal from "../components/product/AddProductModal";
import EmptyState from "../components/product/EmptyState";
import {
  deleteProduct,
  getAllProducts,
  toggleProductPublish,
} from "../services/productService";

const ProductsPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [banner, setBanner] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data.data || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!banner) return;
    const timeout = setTimeout(() => setBanner(""), 2500);
    return () => clearTimeout(timeout);
  }, [banner]);

  const orderedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (a.isPublished === b.isPublished) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return a.isPublished ? -1 : 1;
    });
  }, [products]);

  const handleOpenCreate = () => {
    setSelectedProduct(null);
    setOpenModal(true);
  };

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleTogglePublish = async (id) => {
    try {
      setActionLoadingId(id);
      const res = await toggleProductPublish(id);
      setBanner(res.message || "Product updated successfully");
      await fetchProducts();
    } catch (error) {
      console.error("Failed to toggle publish status", error);
    } finally {
      setActionLoadingId("");
    }
  };

  const handleDelete = async (id) => {
    try {
      setActionLoadingId(id);
      const res = await deleteProduct(id);
      setBanner(res.message || "Product deleted successfully");
      await fetchProducts();
    } catch (error) {
      console.error("Failed to delete product", error);
    } finally {
      setActionLoadingId("");
    }
  };

  const handleProductSaved = async () => {
    await fetchProducts();
    setBanner(
      selectedProduct
        ? "Product updated successfully"
        : "Product added successfully",
    );
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header title="Products" showSearch />

        <div className="relative bg-white flex-1 px-4 py-5">
          {loading ? (
            <div className="h-[calc(100vh-90px)] flex items-center justify-center text-gray-500 text-sm">
              Loading products...
            </div>
          ) : orderedProducts.length === 0 ? (
            <div className="h-[calc(100vh-90px)] flex items-center justify-center">
              <EmptyState
                title="Feels a little empty over here..."
                description={
                  <>
                    You can create products without connecting store
                    <br />
                    you can add products to store anytime
                  </>
                }
                buttonText="Add your Products"
                showButton
                onButtonClick={handleOpenCreate}
              />
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[14px] font-semibold text-[#222]">
                  Products
                </h2>

                <button
                  onClick={handleOpenCreate}
                  className="inline-flex items-center gap-2 text-[12px] font-medium text-[#4a5568] hover:text-[#2140d9] transition-colors"
                >
                  <FiPlus size={14} />
                  Add Products
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {orderedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="rounded-xl border border-[#e7eaf3] bg-white p-3 shadow-[0_2px_12px_rgba(15,23,42,0.06)]"
                  >
                    <div className="h-[150px] rounded-lg border border-[#edf0f7] bg-[#fbfcff] overflow-hidden mb-3 flex items-center justify-center">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.productName}
                          className="w-full h-full object-contain p-3"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No Image</span>
                      )}
                    </div>

                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="text-[11px] font-semibold text-[#1f2937] leading-4">
                        {product.productName}
                      </h3>
                      <span className="shrink-0 text-[10px] text-[#9aa3b2]">
                        {product.productType}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[10px] leading-4">
                      <div className="flex justify-between gap-3">
                        <span className="text-[#9aa3b2]">Quantity Stock -</span>
                        <span className="text-[#4b5563]">
                          {product.quantityStock}
                        </span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-[#9aa3b2]">MRP -</span>
                        <span className="text-[#4b5563]">₹ {product.mrp}</span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-[#9aa3b2]">Selling Price -</span>
                        <span className="text-[#4b5563]">
                          ₹ {product.sellingPrice}
                        </span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-[#9aa3b2]">Brand Name -</span>
                        <span className="text-[#4b5563]">
                          {product.brandName}
                        </span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-[#9aa3b2]">
                          Total Number of images -
                        </span>
                        <span className="text-[#4b5563]">
                          {product.images?.length || 0}
                        </span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-[#9aa3b2]">
                          Exchange Eligibility -
                        </span>
                        <span className="text-[#4b5563]">
                          {product.exchangeOrReturn}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(product._id)}
                        disabled={actionLoadingId === product._id}
                        className={`min-w-[78px] rounded-md px-3 py-2 text-[10px] font-semibold text-white transition-colors disabled:opacity-60 ${
                          product.isPublished
                            ? "bg-[#73d13d] hover:bg-[#66c12f]"
                            : "bg-[#2f45ff] hover:bg-[#2136e6]"
                        }`}
                      >
                        {actionLoadingId === product._id
                          ? "Updating..."
                          : product.isPublished
                            ? "Unpublish"
                            : "Publish"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenEdit(product)}
                        className="inline-flex min-w-[62px] items-center justify-center gap-1 rounded-md border border-[#dfe4ee] bg-white px-3 py-2 text-[10px] font-medium text-[#4b5563]"
                      >
                        <FiEdit2 size={11} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(product._id)}
                        disabled={actionLoadingId === product._id}
                        className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#dfe4ee] text-[#9aa3b2] hover:text-[#ef4444] disabled:opacity-60"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {banner && (
            <div className="pointer-events-none fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
              <div className="rounded-md border border-[#d8f0de] bg-white px-4 py-2 text-[11px] font-medium text-[#2f855a] shadow-lg">
                {banner}
              </div>
            </div>
          )}
        </div>
      </div>

      {openModal && (
        <AddProductModal
          product={selectedProduct}
          onClose={() => {
            setOpenModal(false);
            setSelectedProduct(null);
          }}
          onSuccess={handleProductSaved}
        />
      )}
    </div>
  );
};

export default ProductsPage;
