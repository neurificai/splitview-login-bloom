export const isUserLoggedIn = (): boolean => {
  return !!localStorage.getItem("user");
};