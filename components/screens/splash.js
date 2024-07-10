import React, { useEffect, useRef } from 'react';
import { Animated, StatusBar, View, StyleSheet } from 'react-native';
import img from '../../images/logo2.png';

export default function SplashScreen() {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
        }).start();
    }, [opacity]);

    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <Animated.Image 
                source={img} 
                style={[styles.image, { opacity }]} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
    },
});
