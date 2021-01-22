import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, Dimensions, Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../../Components/Loader';
import WooCommerce from '../../Components/WooCommerce'

const {width, height} = Dimensions.get('window');

export default function MyAccount({navigation}) {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState(false);

    useEffect(()=>{
        AsyncStorage.getItem('user')
        .then((res)=>{
            setUser(JSON.parse(res))
            setLoading(false)
        })
    },[change])

    const handleUpdate = () => {
        setLoading(true)
        const data = {
            email : user.email,
            first_name: user.first_name,
            last_name : user.last_name,
            billing: {
                first_name: user.first_name,
                last_name : user.last_name,
                phone : user.billing.phone,
                address_1 : user.shipping.address_1,
                address_2 : user.shipping.address_2,
                city : user.shipping.city
            },
            shipping: {
                first_name: user.first_name,
                last_name : user.last_name,
                address_1 : user.shipping.address_1,
                address_2 : user.shipping.address_2,
                city : user.shipping.city
            }
          };
          
          WooCommerce.put(`customers/${user.id}`, data)
            .then((response) => {
              console.log(response);
              AsyncStorage.setItem('user', JSON.stringify(user));
              setChange(true);
              setLoading(false)
            })
            .catch((error) => {
              console.log(error.response);
            });
    }

    if(loading) return <View style={{flex : 1}}><Loader/></View>
    else{
    return (
        <ScrollView style={{flex : 1}}>
            <View style={{flexDirection : 'row', paddingHorizontal : 20, alignItems : 'center', paddingVertical : 10}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                    <Icon name='arrow-left' size={20} style={{marginRight : 20}}/>
                </TouchableOpacity>
                <Text style={{fontSize : 25, fontWeight : 'bold'}}>Account Information</Text>
            </View>
            <View style={{alignItems : 'center'}}>
                <View style={styles.textBox}>
                    <Text style={{color : 'grey', fontWeight : 'bold'}}>Email</Text>
                    <TextInput placeholder={user.email} onChangeText={(text)=>{
                        var temp = user;
                        temp.email = text;
                        setUser(temp)
                    }}/>
                </View>
                <View style={styles.textBox}>
                    <Text style={{color : 'grey', fontWeight : 'bold'}}>First Name</Text>
                    <TextInput placeholder={user.first_name} onChangeText={(text)=>{
                        var temp = user;
                        temp.first_name = text;
                        setUser(temp)
                    }}/>
                </View>
                <View style={styles.textBox}>
                    <Text style={{color : 'grey', fontWeight : 'bold'}}>Last Name</Text>
                    <TextInput placeholder={user.last_name} onChangeText={(text)=>{
                        var temp = user;
                        temp.last_name = text;
                        setUser(temp)
                    }}/>
                </View>
                <View style={styles.textBox}>
                    <Text style={{color : 'grey', fontWeight : 'bold'}}>Phone Number</Text>
                    <TextInput placeholder={user.billing.phone} onChangeText={(text)=>{
                        var temp = user;
                        temp.billing.phone = text;
                        setUser(temp)
                    }}/>
                </View>
                <View style={styles.textBox}>
                    <Text style={{color : 'grey', fontWeight : 'bold'}}>Flat / House No.</Text>
                    <TextInput placeholder={user.shipping.address_1} onChangeText={(text)=>{
                        var temp = user;
                        temp.shipping.address_1 = text;
                        setUser(temp)
                    }}/>
                </View>
                <View style={styles.textBox}>
                    <Text style={{color : 'grey', fontWeight : 'bold'}}>Area / Locality</Text>
                    <TextInput placeholder={user.shipping.address_2} onChangeText={(text)=>{
                        var temp = user;
                        temp.shipping.address_2 = text;
                        setUser(temp)
                    }}/>
                </View>
                <View style={styles.textBox}>
                    <Text style={{color : 'grey', fontWeight : 'bold'}}>Landmark</Text>
                    <TextInput placeholder={user.shipping.city} onChangeText={(text)=>{
                        var temp = user;
                        temp.shipping.city = text;
                        setUser(temp)
                    }}/>
                </View>
                <TouchableOpacity onPress={handleUpdate} style={{backgroundColor : '#62BA03', width : width-100, paddingVertical : 5, borderRadius : 10, marginTop : 20}}>
                    <Text style={{color : 'white', fontSize : 20, textAlign : 'center'}}>Update</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
                }
}

const styles = StyleSheet.create({
    textBox : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : "space-between",
        backgroundColor : 'white',
        width : width-25,
        borderRadius : 5,
        paddingVertical : 5,
        paddingHorizontal : 15,
        marginVertical : 10,
        borderWidth : 1,
        borderColor : 'lightgrey'
    }
})
