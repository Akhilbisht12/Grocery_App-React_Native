import React from 'react'
import { View, ScrollView, TouchableOpacity, Text } from 'react-native'
import Category from '../Components/Category'
import { useNavigation } from '@react-navigation/native';

export default function CategoryDetailed({route}) {
    const navigation = useNavigation();
    const item = route.params.item
    return (
        <ScrollView style={{backgroundColor : 'white'}}>
            <View style={{flexDirection : 'row', flexWrap : 'wrap', justifyContent :'center', paddingVertical : 20}}>
                {item.map((item)=>{
                    var i = item.image.src.split('.')
                    return(
                        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('CatProducts', {id : item.id,})}>
                            <Category url={i[0]+'.'+i[1]+'.'+i[2]+'-100x100.jpg'} title={item.name}/>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </ScrollView>
    )
}
