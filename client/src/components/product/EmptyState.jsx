import { FiGrid } from "react-icons/fi";

const EmptyState = ({
  title,
  description,
  buttonText,
  onButtonClick,
  showButton = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <div className="text-[#1f2f8f] flex justify-center mb-4">
        <FiGrid size={42} strokeWidth={2.2} />
      </div>

      <h2 className="text-[18px] font-semibold text-[#222] mb-2">{title}</h2>

      <p className="text-[12px] text-gray-400 leading-5 mb-6 max-w-[260px]">
        {description}
      </p>

      {showButton && (
        <button
          onClick={onButtonClick}
          className="bg-[#2140d9] hover:bg-[#1932b0] text-white text-[12px] font-medium px-10 py-2 rounded-md transition-colors"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
