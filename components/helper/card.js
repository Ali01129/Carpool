import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function Card(props) {
    const navigation=useNavigation();
    const {icon,name,seats,avseats,to,from,atime,dtime,id}=props;
    return (
        <TouchableOpacity style={styles.box} onPress={()=>{navigation.navigate('CardItem',{
            name:name,
            dtime:dtime,
            atime:atime,
            seats:seats,
            avseats:avseats,
            to:to,
            from:from,
            id:id

        });}}>
                <View style={styles.image}>
                    <Icon name={icon} size={60} color={'#1E90FF'} style={{alignSelf:'center'}}/>
                </View>
                <View>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subtitle}>From: {from}</Text>
                    <Text style={styles.subtitle}>To:     {to}</Text>
                </View>
                <View style={{justifyContent:'space-between',alignItems:'flex-end',flex:1}}>
                    <View style={styles.sbox}><Text style={{color:'#1E90FF',alignSelf:'center',fontWeight:'bold'}}>$5</Text></View>
                    <View style={[styles.sbox,{flexDirection:'row'}]}>
                        <Text style={{color:'#1E90FF',alignSelf:'center',fontWeight:'bold'}}>{avseats}</Text>
                        <Icon2 name='event-seat' size={15} color={'#1E90FF'} style={{alignSelf:'center'}}/>
                    </View>
                </View>
        </TouchableOpacity>
    );
}

const styles=StyleSheet.create({
    box:{
        backgroundColor: '#f1f1f1',
        flexDirection:'row',
        padding:16,
        borderRadius:12,
        marginBottom:20,
        elevation:5
    },
    image:{
        width:110,
        height:110,
        backgroundColor:'white',
        borderRadius:12,
        justifyContent:'center',
        marginEnd:20,
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        marginVertical:8,
    },
    subtitle:{
        fontSize:12,
        color:'grey',
        marginBottom:1,
    },
    sbox:{
        backgroundColor:'white',
        borderRadius:50,
        width:50,
        height:50,
        justifyContent:'center'
    },

});