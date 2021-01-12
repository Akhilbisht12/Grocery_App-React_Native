import React, { useEffect, useState } from 'react'
import { ScrollView, StatusBar, Text, View } from 'react-native';
import WooCommerce from '../Components/WooCommerce';
import ProductComp from '../Components/ProductComp'
import ProductLoader from '../Loaders/ProductLoader';
import Header from '../Components/Header'
import { FlatList } from 'react-native-gesture-handler';

export default function CatProducts({route}) {
    const id = route.params.id;
    var temp =[]
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        WooCommerce.get('products', {
            category : id,
            per_page : 100
        })
        .then(res=>{
            setProducts(res);
            setLoading(false)
        })
    },[])

    const renderItem = (item,i) => {
        if(i%2==0){
            temp=[];
            item.images.map((image)=>{
                temp.push(<ProductComp key={item.id} item={item} image={image.src}/>);
                })
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
            <Header/>
            <ScrollView>
                <ProductLoader/>
                <ProductLoader/>
            </ScrollView>
        </View>
        
    )
    else{
        return (
            <View>
                <Header/>
                <FlatList
                data={products}
                renderItem={({item,index})=>renderItem(item,index)}
                keyExtractor={item=>(item.id).toString()}
                />
            </View>
        )
}
}
