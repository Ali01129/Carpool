import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../auth/authContext';
import MessageItem from '../helper/messageItem';

export default function Message() {
  const navigation = useNavigation();
  const { token, postid,user } = useAuth();
  const [thread, setThread] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendMsg, setSendMsg] = useState('');


  useEffect(() => {
    if (postid) {
      getData();
    }
  }, [postid]);

  useEffect(() => {
    if (thread) {
      getMsg();
    }
  }, [thread,messages]);

  const getData = async () => {
    try {
      const response = await fetch(`https://carpool.qwertyexperts.com/api/thread/show/${postid}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("getData function", "\n", data, "\n");
      if (response.ok) {
        setThread(data.result._id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getMsg = async () => {
    try {
      const response = await fetch(`https://carpool.qwertyexperts.com/api/message/list/${thread}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        
        setMessages(data.result.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const send = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://carpool.qwertyexperts.com/api/message/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ thread: thread, message: sendMsg }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Message sent');
        setSendMsg('');
        getMsg();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
        <View>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <TouchableOpacity
                style={styles.backButton}
                onPress={() => { navigation.goBack(); }}>
                <Ionicons style={{ alignSelf: 'center' }} name='arrow-back' size={30} color={'white'} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                <Text style={styles.headerText}>Messages</Text>
                </View>
            </View>
            {messages.slice(0).reverse().map((item, index) => (
              user.email === item.userFrom.email ? (
                <MessageItem key={index} msg={item.message} flex={'flex-end'} color={'#1E90FF'}/>
              ) : <MessageItem key={index} msg={item.message} flex={'flex-start'} color={'black'}/>
            ))}
        </View>
        <View>
            <View style={styles.messageInputContainer}>
                <TextInput style={styles.textInput} placeholder='Message' value={sendMsg} onChangeText={(text) => setSendMsg(text)}/>
                <Ionicons style={{ alignSelf: 'center' }} name='send' size={30} color={'#1E90FF'} onPress={send}/>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    padding: 20,
    marginTop: 60,
    justifyContent:'space-between',
  },
  backButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  messageInputContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  textInput: {
    flex: 1,
  },
});
