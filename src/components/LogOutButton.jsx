import React from "react";
import { logout } from "@/utils/authUtils";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
    // Handle logout logic here
    await logout();
    } catch (error) {
      console.log("error during logout;", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex-left bg-gray-500 text-white p-2 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
