import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, Platform,Alert } from 'react-native';
import car from '../../images/car3.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from '../auth/authContext';

// Validation schema
const RideSchema = Yup.object().shape({
    to: Yup.string().required('Required'),
    from: Yup.string().required('Required'),
    noOfSeats: Yup.number().required('Required').positive('Must be positive').integer('Must be an integer').max(7, 'No of Seats must be less than 7'),
    arrivalTime: Yup.string().required('Required'),
    departureTime: Yup.string().required('Required'),
});

export default function Ride() {
    const navigation = useNavigation();
    const {token}=useAuth();

    const [arrivalTime, setArrivalTime] = useState(new Date());
    const [departureTime, setDepartureTime] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);
    const [currentField, setCurrentField] = useState(null);

    const onChange = (event, selectedDate, setFieldValue) => {
        const currentDate = selectedDate || (currentField === 'arrivalTime' ? arrivalTime : departureTime);
        setShow(Platform.OS === 'ios');

        if (currentField === 'arrivalTime') {
            setArrivalTime(currentDate);
            setFieldValue('arrivalTime', currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
        } else {
            setDepartureTime(currentDate);
            setFieldValue('departureTime', currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
        }
    };

    const showTimepicker = (field) => {
        setShow(true);
        setCurrentField(field);
        setMode('time');
    };


    const submit = async (values) => {
        try {
            const response = await fetch('https://carpool.qwertyexperts.com/api/posts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    from: values.from,
                    to: values.to,
                    vehicleType: 'car',
                    totalSeats: values.noOfSeats,
                    arrivalTime: values.arrivalTime,
                    departureTime: values.departureTime
                }),
            });
    
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Note', data.message);
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Drawer' }],
                    })
                );
            } 
        } catch (error) {
            Alert.alert('Submission Failed', 'An error occurred. Please try again.');
        }
    };

    return (
        <ScrollView>
        <Formik
            initialValues={{
                to: '',
                from: '',
                noOfSeats: '',
                arrivalTime: arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
                departureTime: departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
            }}
            validationSchema={RideSchema}
            onSubmit={submit}
        >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#1E90FF',
                                borderRadius: 50,
                                width: 50,
                                height: 50,
                                justifyContent: 'center',
                                marginBottom: 10,
                            }}
                            onPress={() => {
                                navigation.goBack();
                            }}>
                            <Ionicons style={{ alignSelf: 'center' }} name="arrow-back" size={30} color={'white'} />
                        </TouchableOpacity>
                        <Text style={styles.title}> Create Your Ride </Text>
                    </View>

                    <Image source={car} style={styles.image} />
                    <View style={styles.box}>
                        <View style={[styles.inputContainer2]}>
                            <Icon name={"location-outline"} size={25} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder={"To"}
                                keyboardType={'default'}
                                onChangeText={handleChange('to')}
                                onBlur={handleBlur('to')}
                                value={values.to}
                            />
                        </View>
                        {errors.to && touched.to ? <Text style={styles.errorText}>{errors.to}</Text> : null}
                        <View style={[styles.inputContainer2]}>
                            <Icon name={"location-outline"} size={25} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder={"From"}
                                keyboardType={'default'}
                                onChangeText={handleChange('from')}
                                onBlur={handleBlur('from')}
                                value={values.from}
                            />
                        </View>
                        {errors.from && touched.from ? <Text style={styles.errorText}>{errors.from}</Text> : null}
                        <View style={[styles.inputContainer2]}>
                            <Icon name={"people-outline"} size={25} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder={"No of seats"}
                                keyboardType={'numeric'}
                                onChangeText={handleChange('noOfSeats')}
                                onBlur={handleBlur('noOfSeats')}
                                value={values.noOfSeats}
                            />
                        </View>
                        {errors.noOfSeats && touched.noOfSeats ? <Text style={styles.errorText}>{errors.noOfSeats}</Text> : null}

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={[styles.inputContainer, { marginEnd: 10 }]} onPress={() => showTimepicker('departureTime')}>
                                <Icon name={'time-outline'} size={25} style={styles.icon} />
                                <Text style={{ color: 'grey' }}>{`Depart: ${values.departureTime}`}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.inputContainer]} onPress={() => showTimepicker('arrivalTime')}>
                                <Icon name={'time-outline'} size={25} style={styles.icon} />
                                <Text style={{ color: 'grey' }}>{`Arrival: ${values.arrivalTime}`}</Text>
                            </TouchableOpacity>
                            
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={currentField === 'arrivalTime' ? arrivalTime : departureTime}
                                    mode={mode}
                                    is24Hour={false}
                                    display="default"
                                    onChange={(event, selectedDate) => onChange(event, selectedDate, setFieldValue)}
                                />
                            )}
                        </View>
                        {errors.arrivalTime && touched.arrivalTime ? <Text style={styles.errorText}>{errors.arrivalTime}</Text> : null}
                        {errors.departureTime && touched.departureTime ? <Text style={styles.errorText}>{errors.departureTime}</Text> : null}
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 20, justifyContent: 'space-between' }}>
                        <TouchableOpacity style={styles.iconBox}>
                            <FontAwesome name='car' size={35} color={'#1E90FF'} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBox}>
                            <FontAwesome name='motorcycle' size={35} color={'#1E90FF'} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBox}>
                            <FontAwesome name='bus' size={35} color={'#1E90FF'} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBox}>
                            <MaterialCommunityIcons name='jeepney' size={35} color={'#1E90FF'} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Post</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        padding: 16,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
        marginStart: 50,
    },
    image: {
        height: 200,
        width: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    box: {
        borderRadius: 10,
        padding: 16,
    },
    iconBox: {
        borderRadius: 10,
        width: 70,
        height: 70,
        backgroundColor: '#f1f1f1',
        marginRight: 10,
        justifyContent: 'center',
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
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        flex: 1,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
    },
    inputContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
