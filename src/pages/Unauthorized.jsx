import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="
      min-h-screen flex flex-col items-center justify-center text-center
      bg-lightBg text-lightText
      dark:bg-bg dark:text-white
    ">
      <h1 className="text-4xl font-bold text-red-600 dark:text-red-500 mb-4">
        Access Denied 🚫
      </h1>

      <p className="text-lightMuted dark:text-gray-400 mb-6">
        You don’t have permission to access this page.
      </p>

      <Link
        to="/"
        className="px-6 py-2 bg-primary rounded-xl text-white"
      >
        Go to Login
      </Link>
    </div>
  );
}
