export {};

global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        electronAPI: {
            getToken: () => Promise<string | string[] | undefined>
            setToken: (token: string) => Promise<any>
            onLogout: (cb: ()=>any) => Promise<any>,
            onLock: (cb: ()=>any) => Promise<any>
            changePassword: (cb: ()=>any) => Promise<any>
        }
    }
}
