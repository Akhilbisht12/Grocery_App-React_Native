import React, { useEffect, useState } from 'react'
import { ScrollView, FlatList, TouchableOpacity, Text, View, Alert } from 'react-native';
import WooCommerce from '../Components/WooCommerce';
import ProductComp from '../Components/ProductComp'
import ProductLoader from '../Loaders/ProductLoader';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function CatProducts({route}) {
    const navigation = useNavigation();
    const item = route.params.item;
    var temp =[]
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    useEffect(()=>{
        WooCommerce.get('products', {
            category : item.id,
            per_page : 20,
            page : page
        })
        .then(res=>{
            if(res.length!==0){
                setProducts(res);
            }else Alert.alert('Product Message', 'You have browsed all products')
            setLoading(false)
        })
    },[page])

    const handlePageChange = () =>{
        setLoading(true);
        setPage(page+1)
    }

    const renderItem = (item,i) => {
        if(i%2==0){
            temp=[];
            item.images.map((image)=>{
                temp.push(<ProductComp key={item.id} item={item} image={image.src}/>);
                })
        }else if(i === products.length-1){
            return(
                <TouchableOpacity onPress={handlePageChange} style={{alignItems : 'center', paddingVertical : 10, backgroundColor : '#62BA03', marginBottom : 5}}>
                    <Text style={{color : 'white'}}>Load More</Text>
                </TouchableOpacity>
            )
        }else{
            return(
                <View style={{flexDirection : 'row', flexWrap : 'wrap', justifyContent : 'center'}}>
                    {temp[0]}
                    {item.images.map((image)=>{
                        return (<ProductComp key={item.id} item={item} image={image.src}/>);
                        })}
                </View>
            )
        }
    }

    if(loading) return(
        <View>
            <ScrollView>
                <ProductLoader/>
                <ProductLoader/>
            </ScrollView>
        </View>
        
    )
    else{
        return (
            <View style={{flex : 1}}>
                <View style={{flexDirection : 'row',justifyContent : 'space-between', padding : 10}}>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                            <Icon color='#62BA03' style={{marginHorizontal : 10}} name='arrow-left' size={25}/>
                        </TouchableOpacity>
                        <Text style={{fontSize : 25, fontWeight : '500', color : '#62BA03'}}>{item.name}</Text>
                    </View>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                            <Icon color='#62BA03' style={{marginHorizontal : 10}} name='search' size={25}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
                            <Icon color='#62BA03' style={{marginHorizontal : 10}} name='opencart' size={25}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                data={products}
                renderItem={({item,index})=>renderItem(item,index)}
                keyExtractor={item=>(item.id).toString()}
                />
            </View>
        )
}
}
