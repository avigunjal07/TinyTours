import toast from 'react-hot-toast';

const setPageTitle = (title) => {
    document.title = title;
};

const isUserLoggedIn = () => {
  const userJwtToken = localStorage.getItem("userJwtToken");

  return !!userJwtToken;
};

const getUserJwtToken = () => {
  const userJwtToken = localStorage.getItem("userJwtToken");

  return userJwtToken;
};

const getUserData = () => {
  const userData = localStorage.getItem("userData") || "{}";

  return JSON.parse(userData);
};

const logoutUser = () => {
  localStorage.clear();
  toast.success("Logged out successfully!");
  setTimeout(() => {
    window.location.href = "/login";
  }, 1500);
};

export {
    setPageTitle,
    isUserLoggedIn,
    getUserJwtToken,
    getUserData,
    logoutUser,
};