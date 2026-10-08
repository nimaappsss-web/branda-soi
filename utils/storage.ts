import Cookies from "js-cookie";

const STORAGE_PREFIX = "BRANDA_SOI_";

const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  path: "/",
  expires: 30,
  sameSite: "Lax",
  ...(typeof window !== "undefined" && window.location.protocol === "https:"
    ? { secure: true }
    : {}),
};

const COOKIE_CLEAR_OPTIONS: Cookies.CookieAttributes = { path: "/" };

export const tokenStorage = {
  getToken: () => Cookies.get(`${STORAGE_PREFIX}TOKEN`) as string | undefined,
  setToken: (token: string) =>
    Cookies.set(`${STORAGE_PREFIX}TOKEN`, token, COOKIE_OPTIONS),
  clearToken: () =>
    Cookies.remove(`${STORAGE_PREFIX}TOKEN`, COOKIE_CLEAR_OPTIONS),
};

export const refreshTokenStorage = {
  get: () => Cookies.get(`${STORAGE_PREFIX}REFRESH_TOKEN`) as string | undefined,
  set: (token: string) =>
    Cookies.set(`${STORAGE_PREFIX}REFRESH_TOKEN`, token, COOKIE_OPTIONS),
  clear: () =>
    Cookies.remove(`${STORAGE_PREFIX}REFRESH_TOKEN`, COOKIE_CLEAR_OPTIONS),
};

export const userIDStorage = {
  getUserID: () => Cookies.get(`${STORAGE_PREFIX}USER_ID`) as string | undefined,
  setUserID: (userID: string) =>
    Cookies.set(`${STORAGE_PREFIX}USER_ID`, userID, COOKIE_OPTIONS),
  clearUserID: () =>
    Cookies.remove(`${STORAGE_PREFIX}USER_ID`, COOKIE_CLEAR_OPTIONS),
};

export const roleStorage = {
  getRole: () => Cookies.get(`${STORAGE_PREFIX}ROLE`) as string | undefined,
  setRole: (role: string) =>
    Cookies.set(`${STORAGE_PREFIX}ROLE`, role, COOKIE_OPTIONS),
  clearRole: () =>
    Cookies.remove(`${STORAGE_PREFIX}ROLE`, COOKIE_CLEAR_OPTIONS),
};

export const storage = {
  clear: () => {
    tokenStorage.clearToken();
    refreshTokenStorage.clear();
    userIDStorage.clearUserID();
    roleStorage.clearRole();
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  },
};
