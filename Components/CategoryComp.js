import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity ,StyleSheet, Dimensions } from 'react-native'
import WooCommerce from '../Components/WooCommerce'
import Category from '../Components/Category'
import { useNavigation } from '@react-navigation/native';
import CategoryLoader from '../Loaders/CategoryLoader'
import  Icon  from 'react-native-vector-icons/FontAwesome';

export default function CategoryComp() {
    const navigation = useNavigation();
    var food = [];
    var breverages = []
    var homecare = []
    var personalcare = []
    var food1 = [];
    var breverages1 = []
    var homecare1 = []
    var personalcare1 = []
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
    if(loading) return <CategoryLoader/>
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
                        food1.push(item)
                        food.push(
                        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('CatProducts', {id : item.id})}>
                            <Category url={i[0]+'.'+i[1]+'.'+i[2]+'-100x100.jpg'} title={item.name}/>
                        </TouchableOpacity>)
                    }else if(item.parent === 85){
                        breverages1.push(item)
                        breverages.push(
                        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('CatProducts', {id : item.id})}>
                            <Category url={i[0]+'.'+i[1]+'.'+i[2]+'-100x100.jpg'} title={item.name}/>
                        </TouchableOpacity>)
                    }else if(item.parent === 103){
                        homecare1.push(item)
                        homecare.push(
                        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('CatProducts', {id : item.id})}>
                            <Category url={i[0]+'.'+i[1]+'.'+i[2]+'-100x100.jpg'} title={item.name}/>
                        </TouchableOpacity>)
                    }else if(item.parent === 95){
                        personalcare1.push(item)
                        personalcare.push(
                        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('CatProducts', {id : item.id,})}>
                            <Category url={i[0]+'.'+i[1]+'.'+i[2]+'-100x100.jpg'} title={item.name}/>
                        </TouchableOpacity>)
                    }
                })}
                <View style={{alignItems :'center'}}>
                    <View style={styles.head}>
                        <Text style={styles.CatHead}>Food</Text>
                        <TouchableOpacity style={styles.seeAll} onPress={()=>navigation.navigate('CategoryDetailed', {item : food1})}>
                            <Text style={{color : 'white'}}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.CatView}>
                        {food.slice(0,6)}
                    </View>
                    <View style={styles.head}>
                        <Text style={styles.CatHead}>Beverages</Text>
                        <TouchableOpacity style={styles.seeAll} onPress={()=>navigation.navigate('CategoryDetailed', {item : breverages1})}>
                            <Text style={{color : 'white'}}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.CatView}>
                        {breverages.slice(0,6)}
                    </View>
                    <View style={styles.head}>
                        <Text style={styles.CatHead}>Home Care</Text>
                        <TouchableOpacity style={styles.seeAll} onPress={()=>navigation.navigate('CategoryDetailed', {item : homecare1})}>
                            <Text style={{color : 'white'}}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.CatView}>
                        {homecare.slice(0,6)}
                    </View>
                    <View style={styles.head}>
                        <Text style={styles.CatHead}>Personal Care</Text>
                        <TouchableOpacity style={styles.seeAll} onPress={()=>navigation.navigate('CategoryDetailed', {item : personalcare1})}>
                            <Text style={{color : 'white'}}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.CatView}>
                        {personalcare.slice(0,6)}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    CatHead : {
        fontWeight : '700',
        fontSize : 30,
        marginVertical : 20
    },
    CatView : {
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'center'
    },
    head : {
        flexDirection :'row',
        alignItems :'center',
        width : Dimensions.get('window').width,
        justifyContent : 'space-between',
        paddingHorizontal : 20
    },
    seeAll : {
        backgroundColor : '#62BA03',
        paddingHorizontal : 10,
        paddingVertical : 2,
        borderRadius : 10

    }
})
