export const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getUser = (): any | null => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
