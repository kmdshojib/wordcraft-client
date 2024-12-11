
import React, { createContext, useState, ReactNode, useEffect } from 'react';

// to do export this to inderface file
export interface AppContextType {
    user: string | null;
    setUser: (user: string | null) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);
    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
};
export default AppProvider;