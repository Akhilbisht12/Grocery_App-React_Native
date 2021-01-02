import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, StatusBar, Dimensions, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import Loader from '../Components/Loader';
import ProductComp from '../Components/ProductComp'
import WooCommerce from '../Components/WooCommerce';

export default function Search() {
    const [search, setSearch] =  useState()
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(1);

    const handleSearch = () =>{
        setLoading(2)
        WooCommerce.get("products",{
            search : search
        })
        .then((response) => {
            setProducts(response);
            setLoading(3);
        })
        .catch((error) => {
            console.log(error.response);
        });
    }

    if(loading === 2){
        return <Loader/>
    }else if(loading ===1){
        return(
            <View style={{flex : 1}}>
                <View style={styles.search}>
                    <TextInput style={{height : 40,width : Dimensions.get('window').width-100}} value={search} onChangeText={(text)=>setSearch(text)}/>
                    <TouchableOpacity onPress={handleSearch}>
                        <Icon style={styles.icon} name='search' color='white' size={20}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex : 1,justifyContent : 'center', alignItems : 'center'}}>
                    <Image source={require('../Screens/OnBoardingScreens/onbTwo.png')}/>
                    <Text style={{fontSize : 30, color : "#62BA03"}}>Find Grocery For Your Home</Text>
                </View>
            </View>
        )
    }
    else if(loading === 3) {
        return (
            <View style={{alignItems : 'center'}}>
                <View style={styles.search}>
                    <TextInput style={{height : 40,width : Dimensions.get('window').width-100}} onChangeText={(text)=>setSearch(text)}/>
                    <TouchableOpacity onPress={handleSearch}>
                        <Icon style={styles.icon} name='search' color='white' size={20}/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{marginBottom : StatusBar.currentHeight*2}}>
                    <View style={{flexWrap : 'wrap', alignItems : 'center', flexDirection : 'row', alignItems :'center'}}>
                        {products.map((item)=>{
                            return item.images.map((image)=>{
                                return(<ProductComp key={item.id} item={item} image={image.src}/>)
                            })
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    search : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        borderWidth : 1,
        margin : 10,
        borderRadius : 5,
        borderColor : '#62BA03',
        paddingHorizontal : 5
    },
    icon : {
        backgroundColor : '#60BA03',
        paddingHorizontal : 10,
        paddingVertical : 5,
        borderRadius : 5
    }
})