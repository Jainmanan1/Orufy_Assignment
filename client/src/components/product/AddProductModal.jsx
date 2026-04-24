import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { createProduct, updateProduct } from "../../services/productService";

const AddProductModal = ({ onClose, onSuccess, product = null }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productType: "",
    quantityStock: "",
    mrp: "",
    sellingPrice: "",
    brandName: "",
    images: "",
    exchangeOrReturn: "Yes",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = Boolean(product);

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName || "",
        productType: product.productType || "",
        quantityStock: product.quantityStock || "",
        mrp: product.mrp || "",
        sellingPrice: product.sellingPrice || "",
        brandName: product.brandName || "",
        images: product.images?.[0] || "",
        exchangeOrReturn: product.exchangeOrReturn || "Yes",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const payload = {
        ...formData,
        quantityStock: Number(formData.quantityStock),
        mrp: Number(formData.mrp),
        sellingPrice: Number(formData.sellingPrice),
      };

      if (isEditMode) {
        await updateProduct(product._id, payload);
      } else {
        await createProduct(payload);
      }

      if (onSuccess) {
        await onSuccess();
      }

      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-[395px] rounded-md shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-[13px] font-medium text-[#222]">
            {isEditMode ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <FiX size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-4 space-y-3">
          <div>
            <label className="block text-[10px] text-gray-600 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-[11px] outline-none focus:border-[#2140d9]"
            />
          </div>

          <div>
            <label className="block text-[10px] text-gray-600 mb-1">
              Product Type
            </label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-[11px] outline-none focus:border-[#2140d9] bg-white"
            >
              <option value="">Select product type</option>
              <option value="Food">Food</option>
              <option value="Simple product type">Simple product type</option>
              <option value="Variable product type">
                Variable product type
              </option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-gray-600 mb-1">
              Quantity Stock
            </label>
            <input
              type="number"
              name="quantityStock"
              value={formData.quantityStock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-[11px] outline-none focus:border-[#2140d9]"
            />
          </div>

          <div>
            <label className="block text-[10px] text-gray-600 mb-1">MRP</label>
            <input
              type="number"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-[11px] outline-none focus:border-[#2140d9]"
            />
          </div>

          <div>
            <label className="block text-[10px] text-gray-600 mb-1">
              Selling Price
            </label>
            <input
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-[11px] outline-none focus:border-[#2140d9]"
            />
          </div>

          <div>
            <label className="block text-[10px] text-gray-600 mb-1">
              Brand Name
            </label>
            <input
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-[11px] outline-none focus:border-[#2140d9]"
            />
          </div>

          <div>
            <label className="block text-[10px] text-gray-600 mb-1">
              Upload Product Images
            </label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-[11px] outline-none focus:border-[#2140d9]"
            />
          </div>

          <div>
            <label className="block text-[10px] text-gray-600 mb-1">
              Exchange or return eligibility
            </label>
            <select
              name="exchangeOrReturn"
              value={formData.exchangeOrReturn}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-[11px] outline-none focus:border-[#2140d9] bg-white"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#2140d9] hover:bg-[#1932b0] text-white text-[11px] px-5 py-2 rounded-md transition-colors disabled:opacity-60"
            >
              {loading ? "Saving..." : isEditMode ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
