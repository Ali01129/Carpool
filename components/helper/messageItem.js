import React from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function MessageItem(){
    const navigation=useNavigation();
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',marginBottom:20}}>
                <TouchableOpacity style={{backgroundColor:'#1E90FF',borderRadius:50,width:50,height:50,justifyContent:'center',marginBottom:10}} 
                onPress={()=>{navigation.goBack();}}>
                    <Ionicons style={{alignSelf:'center'}} name='arrow-back' size={30} color={'white'}/>
                </TouchableOpacity>
                <View style={{flex:1}}>
                    <Text style={{fontWeight:'bold',textAlign:'center',fontSize:20}}>Messages</Text>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E6E6E6',
      padding: 20,
      marginTop:60,
    },
    searchContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
    },
});