import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import WooCommerce from '../Components/WooCommerce';
import Category from '../Components/Category';
import Loader from '../Components/Loader'
import { FlatList } from 'react-native-gesture-handler';
import { render } from 'react-dom';

export default function CatFlat({navigation}) {
    const [category, setCategory] = useState([]);
    const [finalcat, SetFinalcat] = useState([]);
    var cat = [
        {
            id : 65,
            name : 'Food',
            data : []
        },
        {
            id : 85,
            name : 'Breverages',
            data : []
        },
        {
            id : 103,
            name : 'HomeCare',
            data : []
        },
        {
            id : 95,
            name : 'Personal Care',
            data : []
        }
    ]
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        WooCommerce.get("products/categories", {
            per_page : 55,
        })
        .then((response) => {
            setCategory(response);
        })
        .catch((error) => {
            console.log(error.response);
        });

    },[])

    useEffect(()=>{
        cat.map((item=>item.data = []))
        category.map((item ,i)=>{
            if(item.parent === 65){
                cat[0].data.push(item)
            }else if(item.parent === 85){
                cat[1].data.push(item)
            }else if(item.parent === 103){
                cat[2].data.push(item)
            }else if(item.parent === 95){
                cat[3].data.push(item)
            }

            if(i===category.length-1){
                setLoading(false)
                SetFinalcat(cat)
            }

        })
    },[category])

    const renderItem = ({item}) => {
        return(
                <View key={item.id} style={{alignItems : 'center'}}>
                    <Text style={{fontSize : 30, fontWeight :'bold'}}>{item.name}</Text>
                    <View style={{flexDirection : 'row', flexWrap : 'wrap', justifyContent : 'center'}}>
                        {item.data.map((cat)=>{
                            var i = (cat.image.src).split('.')
                            return(<TouchableOpacity  key={cat.id} onPress={()=>navigation.navigate('CatProducts', {id : cat.id})}>
                                    <Category url={i[0]+'.'+i[1]+'.'+i[2]+'-100x100.jpg'} title={cat.name}/>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
               
        )
    }

    if(loading){
        return <Loader/>
    }else{
        return (
            <FlatList
            data={finalcat}
            renderItem={renderItem}
            keyExtractor={item=>item.id}
            />
        )
    }
}
