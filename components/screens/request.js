import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, RefreshControl } from 'react-native';
import car from '../../images/request.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useAuth } from '../auth/authContext';
import RequestCard from '../helper/requestCard';

export default function Request() {
  const { token, user } = useAuth();
  const navigation = useNavigation();
  const [val, setVal] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, [val]);

  const getData = async () => {
    try {
      const response = await fetch(`https://carpool.qwertyexperts.com/api/requests/list`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setVal(data.result.data);
      } else {
        console.error('Error fetching data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#1E90FF',
                borderRadius: 50,
                width: 50,
                height: 50,
                justifyContent: 'center',
                marginBottom: 10,
              }}
              onPress={() => { navigation.goBack(); }}
            >
              <Ionicons style={{ alignSelf: 'center' }} name='arrow-back' size={30} color={'white'} />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>Request</Text>
            </View>
          </View>
          <Image source={car} style={styles.image} />
          {val.map((item, index) => {
            if (item.post.status !== 'Booked'&&item.from._id!==user._id) {
              return (
                <RequestCard
                  key={index}
                  name={item.from.firstName + ' ' + item.from.lastName}
                  from={item.post.from}
                  to={item.post.to}
                  email={item.from.email}
                  time={item.post.departureTime + ' to ' + item.post.arrivalTime}
                  seats={item.post.availableSeats}
                  postid={item.post._id}
                />
              );
            }
            return null; // Return null if the item is not to be displayed
          })}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    padding: 16,
    backgroundColor: 'white',
  },
  image: {
    height: 250,
    width: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
