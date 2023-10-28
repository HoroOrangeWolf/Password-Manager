const getToken = async (): Promise<string | string[] | undefined> => (
  window.electronAPI.getToken()
);

const setToken = async (token: string) => (
  window.electronAPI.setToken(token)
);

const AppStorageService = {
  getToken,
  setToken,
};

export default AppStorageService;
