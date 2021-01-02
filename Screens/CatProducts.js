import React, { useEffect, useState } from 'react'
import { ScrollView, StatusBar, Text, View } from 'react-native';
import WooCommerce from '../Components/WooCommerce';
import ProductComp from '../Components/ProductComp'
import Loader from '../Components/Loader';

export default function CatProducts({route}) {
    const id = route.params.id
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        WooCommerce.get('products', {
            category : id,
            per_page : 30
        })
        .then(res=>{
            setProducts(res);
            setLoading(false)
        })
    },[])
    if(loading) return <Loader/>
    else{
        return (
            <ScrollView style={{marginTop : StatusBar.currentHeight}}>
                <View style={{flexDirection :'row', flexWrap : 'wrap', justifyContent : 'center'}}>
                    {products.map((item)=> {
                    if(item){
                        return(item.images.map((image)=>{
                        return(<ProductComp key={item.id} item={item} image={image.src}/>);
                        }))}
                    })}
                </View>
            </ScrollView>
        )
}
}
