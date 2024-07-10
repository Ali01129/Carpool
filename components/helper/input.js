import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Input(props) {
    const {name,icon,type}=props;
    return (
        <View style={[styles.inputContainer]}>
            <Icon name={icon} size={25} style={styles.icon}/>
            <TextInput style={styles.input} placeholder={name} keyboardType={type?type:'default'} />
        </View>
        
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
    },
});
