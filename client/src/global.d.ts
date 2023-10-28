export {};

global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        electronAPI: {
            getToken: () => Promise<string | string[] | undefined>
            setToken: (token: string) => Promise<any>
        }
    }
}
