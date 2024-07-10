import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

export default function Select() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <BlurView intensity={150} style={styles.select}>
                <Text style={styles.title}>Uniting Rides, Sharing Lives</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btnText}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'white', marginTop: 0 }]}>
                    <Text style={[styles.btnText, { color: 'black' }]}>Log in</Text>
                </TouchableOpacity>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ce9f2f',
        padding: 20,
        justifyContent: 'flex-end',
    },
    select: {
        width: '100%',
        backgroundColor: 'rgba(51, 51, 51, 0.8)',
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'rgba(255, 77, 77, 0.8)',
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 20,
        width: '100%',
    },
    btnText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
});
