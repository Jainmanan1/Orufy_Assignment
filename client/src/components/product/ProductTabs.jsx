const ProductTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 px-4">
      <div className="flex gap-6 text-[11px]">
        <button
          onClick={() => onTabChange("published")}
          className={`py-3 border-b-2 transition-colors ${
            activeTab === "published"
              ? "border-[#2140d9] text-[#1f2f8f] font-medium"
              : "border-transparent text-gray-400"
          }`}
        >
          Published
        </button>

        <button
          onClick={() => onTabChange("unpublished")}
          className={`py-3 border-b-2 transition-colors ${
            activeTab === "unpublished"
              ? "border-[#2140d9] text-[#1f2f8f] font-medium"
              : "border-transparent text-gray-400"
          }`}
        >
          Unpublished
        </button>
      </div>
    </div>
  );
};

export default ProductTabs;
