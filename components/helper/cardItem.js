import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Modal, Alert, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import kia from '../../images/kia.jpg';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../auth/authContext';

export default function CardItem({ route }) {
    const { name, dtime, atime, seats,avseats, to, from, id } = route.params;
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const { token,savePostid } = useAuth();

    const validationSchema = Yup.object().shape({
        numSeats: Yup.number().required('Number of seats is required').min(1, 'Number of seats must be at least 1').max(avseats, `Number of seats must be less than or equal to ${avseats}`),
    });

    const submit = async (values) => {
        setModalVisible(false);
        try{
            const response = await fetch('https://carpool.qwertyexperts.com/api/requests/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ post: id, seats: values.numSeats }),
            });
            const data = await response.json();
            if(!response.ok){
                Alert.alert('Request Failed', data.message);
            }
            else{
                Alert.alert('Request SucessFull', data.message);
                savePostid(id);
            }
        }catch(error){
            Alert.alert('Request Failed', 'An error occurred. Please try again.');
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack(); }}>
                    <Ionicons style={{ alignSelf: 'center' }} name='arrow-back' size={30} color={'white'} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>kia Sportage</Text>
                    <Text style={styles.subtitle}>Wed, 5 July 2024</Text>
                </View>
            </View>
            {/* card 1 */}
            <View style={[styles.card, { marginTop: 20 }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={styles.cardText}>{dtime}</Text>
                    <Octicons name='dot-fill' color={'green'} size={25} />
                    <View>
                        <Text style={styles.cardText}>{from}</Text>
                    </View>
                </View>
                <View style={{ width: 1, height: 10, backgroundColor: 'black', position: 'relative', left: 140, marginBottom: 1 }}></View>
                <View style={{ width: 1, height: 10, backgroundColor: 'black', position: 'relative', left: 140 }}></View>
                <Text style={{ color: 'black', left: 120, fontWeight: 'bold' }}>1 Hour</Text>
                <View style={{ width: 1, height: 10, backgroundColor: 'black', position: 'relative', left: 140, marginBottom: 1 }}></View>
                <View style={{ width: 1, height: 10, backgroundColor: 'black', position: 'relative', left: 140, marginBottom: 10 }}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={styles.cardText}>{atime}</Text>
                    <Octicons name='dot-fill' color={'red'} size={25} />
                    <View>
                        <Text style={styles.cardText}>{to}</Text>
                    </View>
                </View>
            </View>
            {/* card 2 */}
            <View style={styles.card}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.title, { marginBottom: 0 }]}>Starting From</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.title, { marginBottom: 0 }]}>$5</Text>
                        <Text style={{ marginTop: 5 }}>/Seat</Text>
                    </View>
                </View>
                <View style={{ width: '100%', height: 1, backgroundColor: 'grey', marginTop: 15 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    {Array.from({ length: seats-avseats }).map((_, index) => (
                        <Octicons
                            key={index}
                            name='dot-fill'
                            color={'#1E90FF'}
                            size={35}
                            style={{ marginEnd: 5 }}
                        />
                    ))}
                    {
                    Array.from({ length: avseats }).map((_, index) => (
                        <Octicons
                            key={index}
                            name='dot'
                            color={'#1E90FF'}
                            size={35}
                            style={{ marginEnd: 5 }}
                        />
                    ))
                    }
                </View>
                <Text style={[styles.subtitle, { textAlign: 'left' }]}>{avseats} Seats Available</Text>
            </View>
            {/* card 3,4 */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={[styles.card, { flex: 1, marginEnd: 10 }]}>
                    <Image source={require('../../images/bus.jpg')} style={styles.image} />
                    <Text style={[styles.subtitle, { textAlign: 'left', fontSize: 16 }]}>Driver</Text>
                    <Text style={[styles.title, { textAlign: 'left' }]}>{name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Octicons name='star-fill' color={'#FFD700'} size={15} style={{ marginEnd: 5 }} />
                        <Octicons name='star-fill' color={'#FFD700'} size={15} style={{ marginEnd: 5 }} />
                        <Octicons name='star-fill' color={'#FFD700'} size={15} style={{ marginEnd: 5 }} />
                        <Octicons name='star-fill' color={'#FFD700'} size={15} style={{ marginEnd: 5 }} />
                        <Octicons name='star' color={'#FFD700'} size={15} style={{ marginEnd: 5 }} />
                    </View>
                </View>
                <View style={[styles.card, { flex: 1 }]}>
                    <Image source={kia} style={styles.image} />
                    <Text style={[styles.subtitle, { textAlign: 'left', fontSize: 16 }]}>Vehicle</Text>
                    <Text style={[styles.title, { textAlign: 'left' }]}>kia Sportage</Text>
                    <Text style={[styles.subtitle, { textAlign: 'left', fontSize: 16 }]}>LEB 1305</Text>
                </View>
            </View>
            <Formik
                validationSchema={validationSchema}
                initialValues={{ numSeats: '' }}
                onSubmit={submit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setModalVisible(!modalVisible);
                            }}>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Request Seats</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Number of Seats"
                                        value={values.numSeats}
                                        onChangeText={handleChange('numSeats')}
                                        onBlur={handleBlur('numSeats')}
                                        keyboardType="numeric"
                                    />
                                    {errors.numSeats && touched.numSeats ? (
                                        <Text style={styles.errorText}>{errors.numSeats}</Text>
                                    ) : null}
                                    <View style={styles.modalButtonContainer}>
                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setModalVisible(!modalVisible)}>
                                            <Text style={styles.textStyle}>Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonOpen]}
                                            onPress={handleSubmit}>
                                            <Text style={styles.textStyle}>OK</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </>
                )}
            </Formik>
            {/* card 5 */}
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Request to Join</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        padding: 16,
        backgroundColor: 'white'
    },
    backButton: {
        backgroundColor: '#1E90FF',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        marginBottom: 10
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '300',
        textAlign: 'center',
    },
    card: {
        marginBottom: 12,
        backgroundColor: '#f1f1f1',
        padding: 16,
        borderRadius: 20,
        elevation: 5
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40, 
        marginBottom: 10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#1E90FF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonOpen: {
        backgroundColor: '#1E90FF',
        flex:1,
    },
    buttonClose: {
        backgroundColor: 'grey',
        flex:1,
        marginEnd: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
