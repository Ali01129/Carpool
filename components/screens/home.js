import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';
import car from '../../images/car2.png';
import { useNavigation } from '@react-navigation/native';
import Card from '../helper/card';
import { useAuth } from '../auth/authContext';

export default function Home() {
    const { token,user } = useAuth();
    const navigation = useNavigation();
    const [val, setVal] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getData();
    }, [val]);

    const getData = async () => {
        try {
            const response = await fetch('https://carpool.qwertyexperts.com/api/posts/list', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setVal(data.result.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <ScrollView
                style={styles.header}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.headerIcons}>
                    <Icon name='menu' size={25} onPress={() => { navigation.toggleDrawer(); }} />
                    <Icon1 name='bell' size={25} onPress={() => { navigation.navigate('Request'); }} />
                </View>
                <View style={styles.headerText}>
                    <Text style={styles.title}>Find Your Nearest Route</Text>
                    <Image source={car} style={styles.image} />
                </View>
                {val.map((element, index) => {
                    if(user._id!=element.userId._id){
                        return (
                            <Card
                                key={index}
                                icon={'car'}
                                name={`${element.userId.firstName} ${element.userId.lastName}`}
                                seats={element.totalSeats}
                                avseats={element.availableSeats}
                                to={element.to}
                                from={element.from}
                                atime={element.arrivalTime}
                                dtime={element.departuteTime}
                                id={element._id}
                            />
                        );
                    }
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginTop: 60,
    },
    header: {
        paddingHorizontal: 16,
    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    headerText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        flexShrink: 1,
    },
    image: {
        marginRight: 20,
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
    box: {
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 15,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    verticalLine: {
        width: 1,
        height: 8,
        backgroundColor: 'grey',
        marginHorizontal: 10,
        marginBottom: 3
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        fontSize: 16,
        padding: 10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#1E90FF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        elevation: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});
