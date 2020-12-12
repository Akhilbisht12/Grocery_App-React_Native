import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native'
import ProductComp from '../Components/ProductComp';
import Carousel from '../Components/Carousel';
import Category from '../Components/Category';
import Header from '../Components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-gesture-handler';
import WooCommerce from '../Components/WooCommerce';
import CategoryData from '../assets/category'
import categoryData from '../assets/category';

const { height, width}= Dimensions.get('window')

export default function Home() {
    const [search, setSearch] = useState();
    const [data, setData] = useState([]);
    const [ loading, setLoading] = useState(true);
    const product = [];
    const cart = [];
    useEffect(()=>{
        // AsyncStorage.clear();
        WooCommerce.get('products')
          .then(data => {
              setData(data);
              setLoading(false);
          })
          .catch(error => {
          	console.log(error);
          });
    },[])

    const handleSearch = () =>{
        console.log(data.includes((el)=>el.name===search))
    }
     
        if(loading){
            return(
                <View style={styles.main}>
                     <ActivityIndicator/>
                </View>
            )
        }else{
            return(
                <SafeAreaView>
                    <Header/>
                    <View style={styles.parentSearch}>
                    <View style={styles.searchBox}>
                        <TextInput value={search} style={styles.search}
                        placeholderTextColor='white' placeholder='Search Products'
                        onChangeText={(text)=>setSearch(text)}/>
                        <TouchableOpacity onPress={handleSearch}>
                            <Icon color='white' size={20} name='search'/>
                        </TouchableOpacity>
                    </View>
            </View>
                <ScrollView style={styles.scroll}>
                <Carousel/>
                <Text style={{fontSize : 25, fontWeight : 'bold', paddingHorizontal : 10, marginTop : 20}}>Shop By Category</Text>
                <View style={styles.cat}>
                    {categoryData.map((item)=>{
                        cart.push(<Text
                        key={item.id}
                            style={{width : width, fontSize : 30, textAlign : 'center', backgroundColor : 'blue', color : 'white', fontWeight : 'bold', marginVertical : 10}}>
                                {item.name}</Text>)
                        item.data.map((element)=>{
                            cart.push(<Category style={{}} key={element.id} url={element.image} title={element.name}/>)
                        })
                    })}
                    {cart}
                </View>
                <Text style={{fontSize : 25, fontWeight : 'bold', paddingHorizontal : 10, marginTop : 20}}>Popular Products</Text>
                    <View style={styles.productGrid}>
                        {
                        data.map((item)=> {
                            if(item){
                                item.images.map((image)=>{
                                    product.push(<ProductComp key={item.id} item={item} image={image.src}/>);
                                })}
                            })
                        }
                        {product}
                    </View>
                </ScrollView>
            </SafeAreaView>
            )}
}

const styles= StyleSheet.create({
    scroll : {
        backgroundColor : 'white',
    },
    main : {
        flex : 1,
        justifyContent : 'center',
        width : Dimensions.get('window').width

    },
    productGrid : {
        width : Dimensions.get('window').width,
        flexWrap : 'wrap',
        flexDirection : 'row',
        alignItems : 'center',
        marginBottom : 300
    },
    cat : {
        flexDirection : 'row',
        flexWrap : 'wrap',
        alignItems : 'center',
        justifyContent : 'center'
    },
    search : {
        paddingHorizontal : 10,
    },
    searchBox : {
        borderWidth : 2,
        padding : 5,
        borderRadius : 10,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        borderColor : 'white'
    },
    parentSearch : {
        backgroundColor : 'blue',
        width : Dimensions.get('window').width,
        padding : 5,
    }
})
