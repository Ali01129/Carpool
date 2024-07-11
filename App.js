import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import SplashScreen from './components/screens/splash';
import Second from './components/screens/second';
import Login from './components/screens/login';
import SignUp from './components/screens/signup';
import ForgetPassword from './components/screens/forgetPass';
import ChangePassword from './components/screens/changePass';
import Drawer from './components/others/drawer';
import CardItem from './components/helper/cardItem';
import Request from './components/screens/request';
import RequestCard from './components/helper/requestCard';
import { AuthProvider } from './components/auth/authContext';
import MessageItem from './components/helper/messageItem';
import Message from './components/screens/message';

const Stack = createNativeStackNavigator();

export default function App() {
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSplashVisible(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isSplashVisible) {
        return <SplashScreen />;
    }

    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Second">
                    <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Drawer" component={Drawer} options={{ headerShown: false }} />
                    <Stack.Screen name="Second" component={Second} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                    <Stack.Screen name="Forget" component={ForgetPassword} options={{ headerShown: false }} />
                    <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
                    <Stack.Screen name="Request" component={Request} options={{ headerShown: false }} />
                    <Stack.Screen name="CardItem" component={CardItem} options={{ headerShown: false }} />
                    <Stack.Screen name="RequestCard" component={RequestCard} options={{ headerShown: false }} />
                    <Stack.Screen name="Message" component={Message} options={{ headerShown: false }} />
                    <Stack.Screen name="MessageItem" component={MessageItem} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}