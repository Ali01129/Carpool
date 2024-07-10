import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import logopic from '../../images/logo2.png';
import { useNavigation, CommonActions } from '@react-navigation/native';
import * as yup from 'yup';
import { useState } from 'react';
import { Formik } from 'formik';

// Validation schema
const validationSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
});

export default function ForgetPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const submit = async (values) => {
    try {
      const response = await fetch('https://carpool.qwertyexperts.com/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      });
      const data = await response.json();
      if (response.ok) {
        navigation.navigate('Login');
        Alert.alert('Note', data.message);
      } else {
        Alert.alert('Reset Failed', 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      Alert.alert('Reset Failed', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Image source={logopic} style={{ height: 50, width: 100, marginBottom: 20, resizeMode: 'contain' }} />
        <Text style={styles.title}>Forget Password</Text>
        <Text style={styles.subtitle}>
          No worries, we'll send you instructions for resetting your password
        </Text>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View>
                <Text style={styles.text}>Email Address</Text>
                <View style={styles.inputContainer}>
                  <Icon name="mail-outline" size={25} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                </View>
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              <View style={{marginTop:350}}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Login' }] }))}>
                  <Text style={styles.buttonOutlineText}>Back To Log In</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 8,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
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
  buttonOutline: {
    borderWidth: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
  },
  buttonOutlineText: {
    textAlign: 'center',
  },
});
