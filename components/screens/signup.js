import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import logo from '../../images/logo2.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import * as yup from 'yup';

// Signup validation schema
const signUpValidationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().min(6, ({ min }) => `Password must be at least ${min} characters`).required('Password is required'),
  dob: yup.date().required('Date of Birth is required'),
});

export default function SignUp() {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const submit = async (values) => {
    try {
      const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
      const response = await fetch('https://carpool.qwertyexperts.com/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ 
          firstName: values.firstName, 
          lastName: values.lastName, 
          email: values.email, 
          password: values.password, 
          dob: formattedDate 
        }),
      });
      const data = await response.json();
      if(response.ok){
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('Sign Up Failed', 'An error occurred. Please try again.');
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>SignUp</Text>

      <Formik
        validationSchema={signUpValidationSchema}
        initialValues={{ firstName: '', lastName: '', email: '', password: '', dob: new Date() }}
        onSubmit={submit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
                <Icon name="person-outline" size={25} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  keyboardType="default"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Icon name="person-outline" size={25} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  keyboardType="default"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                />
              </View>
            </View>
            {errors.firstName && touched.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}
            {errors.lastName && touched.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}

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

            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Date picker */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <View style={[styles.inputContainer, { marginBottom: 20, width: '100%' }]}>
                <Icon name="calendar-outline" size={25} style={styles.icon} />
                <Text style={[styles.input, { padding: 13, color: 'grey' }]}>
                  {`${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`}
                </Text>
              </View>
            </TouchableOpacity>
            {errors.dob && touched.dob && (
              <Text style={styles.errorText}>{errors.dob}</Text>
            )}
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}

            {/* SignUp button */}
            <TouchableOpacity
              style={[styles.button, !isValid ? { backgroundColor: '#ccc' } : null]}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>

            {/* Already have an account navigation */}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signUp}>
                Already have an account? <Text style={styles.signUpLink}>Log in</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: '100%',
    height: 50,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  signUp: {
    color: '#000',
  },
  signUpLink: {
    color: '#1E90FF',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});
