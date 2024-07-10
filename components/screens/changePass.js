import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import logopic from '../../images/logo2.png';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../auth/authContext';
import { ScrollView } from 'react-native-gesture-handler';

// Validation schema
const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().required('New Password is required').min(6, 'Password must be at least 8 characters'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm New Password is required'),
});

export default function ChangePassword() {
    const { token, user } = useAuth();
    const navigation = useNavigation();

    const submit = async (values) => {
        try {
            const response = await fetch('https://carpool.qwertyexperts.com/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId: user._id, oldPassword: values.oldPassword, newPassword: values.newPassword,confirmNewPassword:values.confirmNewPassword }),
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
            } else {
                Alert.alert('Password change Failed', data.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            Alert.alert('Password change Failed', 'An error occurred. Please try again.');
        }
    };

    return (
      <ScrollView>
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Formik
                initialValues={{ oldPassword: '', newPassword: '', confirmNewPassword: '' }}
                validationSchema={ChangePasswordSchema}
                onSubmit={submit}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <View>
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
                                    }}
                                >
                                    <Icon style={{ alignSelf: 'center' }} name="arrow-back" size={30} color={'white'} />
                                </TouchableOpacity>
                                <Text style={styles.title2}>Change Password</Text>
                            </View>
                            <Image source={logopic} style={styles.image} />
                            <Text style={styles.subtitle}>
                                New Password must be different from your previously used passwords.
                            </Text>
                            <Text style={styles.text}>Old Password</Text>
                            <View style={styles.inputContainer}>
                                <Icon name="lock-closed-outline" size={25} style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    secureTextEntry
                                    onChangeText={handleChange('oldPassword')}
                                    onBlur={handleBlur('oldPassword')}
                                    value={values.oldPassword}
                                />
                            </View>
                            {errors.oldPassword && touched.oldPassword ? (
                                <Text style={styles.errorText}>{errors.oldPassword}</Text>
                            ) : null}
                            <Text style={styles.text}>New Password</Text>
                            <View style={styles.inputContainer}>
                                <Icon name="lock-closed-outline" size={25} style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    secureTextEntry
                                    onChangeText={handleChange('newPassword')}
                                    onBlur={handleBlur('newPassword')}
                                    value={values.newPassword}
                                />
                            </View>
                            {errors.newPassword && touched.newPassword ? (
                                <Text style={styles.errorText}>{errors.newPassword}</Text>
                            ) : null}
                            <Text style={styles.text}>Confirm New Password</Text>
                            <View style={styles.inputContainer}>
                                <Icon name="lock-closed-outline" size={25} style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    secureTextEntry
                                    onChangeText={handleChange('confirmNewPassword')}
                                    onBlur={handleBlur('confirmNewPassword')}
                                    value={values.confirmNewPassword}
                                />
                            </View>
                            {errors.confirmNewPassword && touched.confirmNewPassword ? (
                                <Text style={styles.errorText}>{errors.confirmNewPassword}</Text>
                            ) : null}
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.buttonText}>Change Password</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 60,
        justifyContent: 'space-between',
    },
    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
        marginStart: 50,
    },
    image: {
        height: 100,
        width: 150,
        marginBottom: 20,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'left',
        color: '#999',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 14,
        textAlign: 'left',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
    },
    button: {
        backgroundColor: '#1E90FF',
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        marginBottom: 16,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
