import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MessageItem(props) {
  const { msg, flex,color } = props;
  return (
    <View style={[styles.container, { alignItems: flex }]}>
      <View style={[styles.messageContainer,{backgroundColor:color}]}>
        <Text style={styles.messageText}>{msg}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  messageContainer: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
});
