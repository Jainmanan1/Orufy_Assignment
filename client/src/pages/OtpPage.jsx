import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
const OtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; 
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); 
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  //   it will Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Resend OTP with 20s countdown
  const handleResend = async () => {
    const loginValue = localStorage.getItem("loginValue");
    const payload = loginValue.includes("@")
      ? { email: loginValue }
      : { phone: loginValue };
    try {
     const res= await api.post("/auth/resend-otp", payload);
      localStorage.setItem("otpToken", res.data.token);
      toast.success(`Demo OTP: ${res.data.otp}`);
      setTimer(20);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (err) {
      setError("Failed to resend OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const otpValue = otp.join("");
    if (otpValue.length < 6) return setError("Please enter all 6 digits");

    const loginValue = localStorage.getItem("loginValue");
    const payload = loginValue.includes("@")
      ? { email: loginValue, otp: otpValue }
      : { phone: loginValue, otp: otpValue };

    try {
      setLoading(true);
      const res = await api.post("/auth/verify-otp", payload);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      <div
        className="bg-white  w-full min-h-screen
       flex overflow-hidden "
      >
        {/* Left Panel */}
        <div className="   w-[45%] relative hidden md:flex flex-col items-center justify-center rounded-xl">
          <img
            src="/loginImg.svg"
            alt="Login Background"
            className="w-full  h-[700px]  object-fill"
          />
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col items-center px-10 py-12  min-h-full">
          <div className="w-full flex flex-col items-center mt-20">
            <h2 className="text-2xl font-semibold text-[#1a1a2e] mb-8">
              Login to your Productr Account
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* OTP Label */}
              <label className="text-sm text-gray-600">Enter OTP</label>

              {/* 6 OTP Boxes */}
              <div className="flex gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 h-10 border border-gray-300 rounded-md text-center text-sm font-semibold outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                ))}
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

             
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a1a8c] hover:bg-[#15157a] text-white py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Enter your OTP"}
              </button>

             
              <p className="text-xs text-gray-500 text-center">
                Didn't receive OTP?{" "}
                {timer > 0 ? (
                  <span className="text-gray-400">Resend in {timer}s</span>
                ) : (
                  <span
                    onClick={handleResend}
                    className="text-blue-600 font-semibold cursor-pointer hover:underline"
                  >
                    Resend in 20s
                  </span>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
