import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Cookie from 'js-cookie';

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    loading: true,
    setLoading: () => {},
    logout: () => {}
});

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        Cookie.remove('AT');
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const token = Cookie.get('AT')
        console.log("update")

        if (token) {
            setIsAuthenticated(true);
        }
        else{
            setIsAuthenticated(false);
        }
    });

    return (
        <>
            <AuthContext.Provider value={{ isAuthenticated, loading, setLoading, logout }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuth = () => useContext(AuthContext);