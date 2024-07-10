import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Home from '../screens/home';
import Icon from 'react-native-vector-icons/AntDesign';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Ride from '../screens/ride';
import Message from '../screens/message';
import Request from '../screens/request';
import { useAuth } from '../auth/authContext';
import ChangePassword from '../screens/changePass';

const Drawr = createDrawerNavigator();

// Custom Drawer Content Component
const CustomDrawerContent = (props) => {
  const navigaiton=useNavigation();
  const {user,clear}=useAuth();
  return (
    <DrawerContentScrollView {...props} >
    <View style={{ justifyContent: 'space-between', flex: 1 ,padding:16}}>
      <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginBottom:10}} onPress={()=>{navigaiton.navigate('Home');}}>
        <Icon name='left' size={25} color={'grey'}/>
        <Text style={{fontSize:20,marginLeft:5,color:'grey'}}>Back</Text>
      </TouchableOpacity>
      <View>
        <View style={styles.header}>
          <Image source={require('../../images/bus.jpg')} style={styles.image} />
          <Text style={styles.headerText}>{user?`${user.firstName} ${user.lastName}`:'user'}</Text>
          <Text style={{color:'grey'}}>{user?`${user.email}`:'email'}</Text>
        </View>
        <View style={styles.separator} />
        <DrawerItemList {...props} />
        <TouchableOpacity style={styles.logoutButton} onPress={()=>{
          clear();
          navigaiton.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          );}}>
            <Icon name='logout' size={20}  color={'grey'} />
            <Text style={{marginStart:35, fontSize: 15,fontWeight:'bold', marginLeft: 5, color: 'grey' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  </DrawerContentScrollView>
  );
};

// Styles for Custom Drawer Content
const styles = StyleSheet.create({
  header: {
    height: 180,
    justifyContent: 'center',
    backgroundColor: '#f6f6f6', // Adjust this color if needed
    marginBottom: 10,
    padding:10,
    borderRadius:10
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40, // Make the image circular
    marginVertical: 10,

  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal:20,
  }
});

// Drawer Navigator Component
export default function Drawer() {
  return (
    <Drawr.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        drawerStyle: {
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          overflow: 'hidden',
        },
        drawerIcon: ({ focused, size, color }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Ride':
              iconName = 'addfile';
              break;
            case 'Message':
              iconName = 'message1';
              break;
            case 'Notifications':
              iconName = 'bells';
              break;
            case 'ChangePassword':
              iconName = 'unlock';
              break;
            default:
              iconName = 'help-circle';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Drawr.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Drawr.Screen name="Ride" component={Ride} options={{ headerShown: false }}/>
      <Drawr.Screen name="Message" component={Message} options={{ headerShown: false }}/>
      <Drawr.Screen name="Notifications" component={Request} options={{ headerShown: false }}/>
      <Drawr.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }}/>
    </Drawr.Navigator>
  );
}