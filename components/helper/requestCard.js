import React from 'react';
import { View, Text,StyleSheet,Image,TouchableOpacity,Alert } from 'react-native';
import { useAuth } from '../auth/authContext';
import { useNavigation } from '@react-navigation/native';

export default function RequestCard(props) {
    const {name,from,to,email,time,seats,postid}=props;
    const {token,savePostid}=useAuth();
    const navigation = useNavigation();

    const submit = async () => {
        try {
            const response = await fetch(`https://carpool.qwertyexperts.com/api/posts/${postid}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "status": "Booked"
                }),
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Note', data.message);
                savePostid(data.result._id);
                navigation.navigate('Message');
            } else {
                Alert.alert('Accept Request Failed', data.message || 'Failed to update status');
            }
        } catch (error) {
            Alert.alert('Accept Request Failed', error.toString());
        }
    };
    

    return (
        <View style={styles.box}>
                <View style={{ justifyContent: 'center' }}>
                <Image source={require('../../images/bus.jpg')} style={styles.image2} />
                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>{name}</Text>
                <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: '400' }}>{email}</Text>
                <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: '400' }}>{from} To {to}</Text>
                <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: '400' }}>{time}</Text>
                <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: '400' }}>No of Seats: {seats}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity
                    style={[styles.button, { marginEnd: 15, backgroundColor: '#1E90FF' }]} onPress={submit}>
                    <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    box: {
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#f1f1f1',
        marginBottom: 20,
    },
    image2: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
        alignSelf: 'center',
    },
    button: {
        height: 50,
        backgroundColor: '#C80036',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        flex: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
});