import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../services/api";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = value.includes("@") ? { email: value } : { phone: value };

    try {
      const res = await api.post("/auth/request-otp", payload);
      if (res.data.message) {
        localStorage.setItem("loginValue", value);
        localStorage.setItem("otpToken", res.data.token);
        toast.success(`Demo OTP: ${res.data.otp}`);
        navigate("/otp");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP");
    }
  };
  return (
    <div className="min-h-screen bg-[#6b7a99] flex items-center justify-center">
      {/* Outer Card */}
      <div
        className="bg-white  w-full min-h-screen
       flex overflow-hidden "
      >
        {/* Left Panel */}
        <div className="w-[45%] relative hidden  md:flex flex-col items-center justify-center rounded-xl  ">
          <img
            src="/loginImg.svg"
            alt="Login Background"
            className=" w-full h-[700px] object-fill"
          />
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col items-center px-10 py-12  min-h-full">
          
          <div className="w-full flex flex-col items-center mt-20">
            <h2 className="text-2xl font-semibold text-[#1a1a2e] mb-8">
              Login to your Productr Account
            </h2>

            <form
              onSubmit={handleSubmit}
              className="w-full max-w-[320px] flex flex-col gap-4"
            >
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Email or Phone number
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter email or phone number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a1a8c] hover:bg-[#15157a] text-white py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-60"
              >
                {loading ? "Sending OTP..." : "Login"}
              </button>
            </form>
          </div>

    
          <div className="mt-auto border border-gray-200 rounded-md px-6 py-8 text-center text-xs text-gray-500 w-full max-w-[320px]">
            Don't have a Productr Account?{" "}
            <span className="text-[#1a1a8c] font-semibold cursor-pointer hover:underline">
              SignUp Here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
