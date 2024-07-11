import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import car from '../../images/frame3.png';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../auth/authContext';

export default function Second (){
    const navigation=useNavigation();
    const { token, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (token) {
        navigation.replace("Drawer");
      } else {
        navigation.replace("Login");
      }
    }
  }, [loading, token, navigation]);

  return (
    <View style={styles.container}>
      <Image source={car} style={styles.logo}/>
      <View style={{width:'100%'}}>
          <Text style={[styles.title,{marginBottom:0}]}>Book Your</Text>
          <Text style={[styles.title,{fontSize:25,fontWeight:'bold'}]}>Carpool Now</Text>
        <TouchableOpacity style={styles.signUpButton} onPress={()=>{navigation.navigate('SignUp')}}>
            <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logInButton} onPress={()=>{navigation.navigate('Login')}}>
            <Text style={styles.logInText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding:20
  },
  logo: {
    width: 300,
    height: 300,
    marginTop:150,
    resizeMode:'contain'
  },
  title: {
    fontSize: 20,
    marginBottom: 40,
    textAlign:'center'
  },
  signUpButton: {
    justifyContent:'center',
    width:'100%',
    backgroundColor: '#0075fd',
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  signUpText: {
    textAlign:'center',
    color: '#fff',
    fontSize: 16,
    fontWeight:'bold'
  },
  logInButton: {
    paddingVertical: 15,
    borderWidth:1,
    width:'100%',
    borderColor:'#c2c2c2',
    borderRadius: 15,
  },
  logInText: {
    color: '#1E90FF',
    textAlign:'center',
    fontSize: 16,
    fontWeight:'bold'
  },
});

