import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Cookie from 'js-cookie';

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext({
    isAuthenticated: false,
});

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookie.get('__Secure-AT')

        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <>
            <AuthContext.Provider value={{ isAuthenticated }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuth = () => useContext(AuthContext);