import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image,TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import MessageCard from '../helper/messageCard';
import { useEffect } from 'react';
import { useAuth } from '../auth/authContext';

const people = [
  { id: '1', name: 'Mollie Austin', message: "Really? That's great...", time: '2:34pm', avatar: 'https://via.placeholder.com/50' },
  { id: '2', name: 'Charlie Sharp', message: 'Where do you go?', time: '1:23pm', avatar: 'https://via.placeholder.com/50' },
  { id: '3', name: 'Maude McKinney', message: 'Amazing job!', time: '9:12am', avatar: 'https://via.placeholder.com/50' },
  { id: '4', name: 'Samuel Carlson', message: 'Ok!', time: '8:20am', avatar: 'https://via.placeholder.com/50' },
  { id: '5', name: 'Hattie Brewer', message: 'Congratulations 😁', time: '8:20am', avatar: 'https://via.placeholder.com/50' },
  { id: '6', name: 'Eunice Diaz', message: "I'm ok", time: '7:17am', avatar: 'https://via.placeholder.com/50' },
];

export default function Message() {
  const navigation=useNavigation();
  const [val, setVal] = React.useState([]);
  const {token}=useAuth();
  // useEffect(() => {
  //   getData();
  // }, [val]);

  // const getData = async () => {
  //     try {
  //         const response = await fetch('https://carpool.qwertyexperts.com/api/thread/list', {
  //             method: 'GET',
  //             headers: {
  //                 'Authorization': `Bearer ${token}`,
  //             },
  //         });
  //         const data = await response.json();
  //         console.log(data);
  //         if (response.ok) {
  //             setVal(data.result.data);
  //         }
  //     } catch (error) {
  //         console.error('Error fetching data:', error);
  //     }
  // };


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

      <FlatList
        data={people}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MessageCard item={item} />
        )}
      />
    </View>
  );
}

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
