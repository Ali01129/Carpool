import React from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
export default function MessageCard(porps) {
    const navigation=useNavigation();
    const { item } = porps;
    return (
        <TouchableOpacity style={styles.personContainer} onPress={()=>{navigation.navigate('MessageItem')}}>
            <Icon name="user-circle" size={50} color="#1E90FF" style={styles.avatar} />    
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    personContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 14,
        color: 'grey',
    },
    time: {
        fontSize: 12,
        color: 'grey',
    },
});