import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [postid,setPostid]=useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUser = await AsyncStorage.getItem("user");
        const storedPostid = await AsyncStorage.getItem("postid");

        if (storedToken) {
          setToken(storedToken);
        }
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        if(storedPostid){
          setPostid(JSON.parse(storedPostid));
        }
        
      } catch (error) {
        console.log("Error loading stored data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStoredData();
  }, []);

  const saveToken = async (token) => {
    try {
      setToken(token);
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.log("Error saving token:", error);
    }
  };

  const clear = async () => {
    try {
      setToken(null);
      setUser(null);
      setPostid(null);
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.log("Error clearing token:", error);
    }
  };

  const saveUser = async (userData) => {
    try {
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.log("Error saving user data:", error);
    }
  };

  const savePostid = async (id) => {
    try {
      setPostid(id);
      await AsyncStorage.setItem("postid", JSON.stringify(id));
    } catch (error) {
      console.log("Error saving user data:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user,postid, saveToken, clear, saveUser,savePostid, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);