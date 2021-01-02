import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity ,StyleSheet } from 'react-native'
import WooCommerce from '../Components/WooCommerce'
import Category from '../Components/Category'
import { useNavigation } from '@react-navigation/native';
import Loader from '../Components/Loader'

export default function CategoryComp() {
    const navigation = useNavigation();
    var food = [];
    var breverages = []
    var homecare = []
    var personalcare = []
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        WooCommerce.get("products/categories", {
            per_page : 70,
        })
        .then((response) => {
            setCategory(response);
            setLoading(false)
        })
        .catch((error) => {
        console.log(error.response.data);
        });

    },[])
    if(loading) return <Loader/>
    else{
        return (
            <View style={{flexWrap : 'wrap'}}>
                {category.map((item)=>{
                   if(item.image){
                       var i = item.image.src.split('.')
                   }else{
                       var i = 'http://gms.upgrate.in/wp-content/uploads/2020/12/Pulses-1.jpg'
                   }
                    if(item.parent === 65){
                        food.push(
                        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('CatProducts', {id : item.id})}>
                            <Category url={i[0]+'.'+i[1]+'.'+i[2]+'-100x100.jpg'} title={item.name}/>
                        </TouchableOpacity>)
                    }else if(item.parent === 85){
                        breverages.push(
                        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('CatProducts', {id : item.id})}>
                            <Category url={i[0]+'.'+i[1]+'.'+i[2]+'-100x100.jpg'} title={item.name}/>
                        </TouchableOpacity>)
                    }else if(item.parent === 103){
                        homecare.push(
                        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('CatProducts', {id : item.id})}>
                            <Category url={i[0]+'.'+i[1]+'.'+i[2]+'-100x100.jpg'} title={item.name}/>
                        </TouchableOpacity>)
                    }else if(item.parent === 95){
                        personalcare.push(
                        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('CatProducts', {id : item.id,})}>
                            <Category url={i[0]+'.'+i[1]+'.'+i[2]+'-100x100.jpg'} title={item.name}/>
                        </TouchableOpacity>)
                    }
                })}
                <View style={{alignItems :'center'}}>
                    <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}}>
                        <Text style={styles.CatHead}>Food</Text>
                    </View>
                    <View style={styles.CatView}>
                        {food}
                    </View>
                    <Text style={styles.CatHead}>Beverages</Text>
                    <View style={styles.CatView}>
                        {breverages}
                    </View>
                    <Text style={styles.CatHead}>Homecare</Text>
                    <View style={styles.CatView}>
                        {homecare}
                    </View>
                    <Text style={styles.CatHead}>Personal Care</Text>
                    <View style={styles.CatView}>
                        {personalcare}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    CatHead : {
        fontWeight : 'bold',
        fontSize : 30,
        marginVertical : 20
    },
    CatView : {
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'center'
    }
})
