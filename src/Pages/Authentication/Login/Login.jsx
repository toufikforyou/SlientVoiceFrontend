import { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaUserSecret } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { GlobalContext } from "../../../Context/Global_Provider";

const quotes = [
  "Speak up — your voice matters.",
  "Share evidence. Protect identity.",
  "Courage is anonymous.",
  "One post can spark change.",
  "Be brave. Be anonymous. Be heard.",
];

const AuthPage = () => {
  const { connect_google } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((i) => (i + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const user = await connect_google();
      toast.success("Signed in successfully!", { duration: 4000 });
    } catch (error) {
      const errorMessage =
        error?.code === "auth/popup-closed-by-user" ||
        error?.code === "auth/cancelled-popup-request" ||
        error?.message?.toLowerCase()?.includes("popup")
          ? "Sign-in was cancelled. Please try again."
          : "Google sign-in failed. Please try again.";
      toast.error(errorMessage, { duration: 4000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <div className="mb-6 flex items-start gap-3">
          <div className="rounded-full bg-gray-100 p-2">
            <FaUserSecret size={22} className="text-gray-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Welcome, Anonymous User
            </h3>
            <p className="text-sm text-gray-500">
              Your identity stays hidden — feel free to post without fear.
            </p>
          </div>
        </div>

        <div className="mb-6 h-12 flex items-center justify-center">
          <p className="text-center text-sm font-medium text-gray-700 transition-opacity duration-700 opacity-100">
            “{quotes[currentQuoteIndex]}”
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 font-medium shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin" size={20} />
              <span>Signing in…</span>
            </>
          ) : (
            <>
              <FcGoogle size={22} />
              <span>Continue with Google</span>
            </>
          )}
        </button>

        <div className="mt-6 text-center text-xs text-gray-400">
          By continuing, you agree to use the platform responsibly. Moderators
          may review flagged content.
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
