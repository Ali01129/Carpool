import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadAuthData = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('authToken');
                const storedUser = await AsyncStorage.getItem('userData');
                if (storedToken) {
                    setToken(storedToken);
                }
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Failed to load auth data:', error);
                // Handle error as needed, e.g., redirect to login screen
            }
        };

        loadAuthData();
    }, []);

    const saveToken = async (tokenValue) => {
        try {
            await AsyncStorage.setItem('authToken', tokenValue);
            setToken(tokenValue);
        } catch (error) {
            console.error('Failed to save token:', error);
            // Handle error as needed
        }
    };

    const clear = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.removeItem('userData');
            setToken(null);
            setUser(null);
        } catch (error) {
            console.error('Failed to clear auth data:', error);
            // Handle error as needed
        }
    };

    const saveUser = async (userData) => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error('Failed to save user data:', error);
            // Handle error as needed
        }
    };

    return (
        <AuthContext.Provider value={{ token, user, saveToken, clear, saveUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);