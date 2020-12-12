import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { set } from 'react-native-reanimated';
import IncrementComp from '../Components/IncrementComp';

export default function CartComp(props) {
    const item = props.item;
    const [count, setCount] = useState(1);
    const [state,setState] = useState();
    useEffect(()=>{
        const price = item.price
        props.onChangeSum(price,state)
    },[count]);
    return (
        <View style={styles.main}>
            <View style={styles.cont}>
                <View>
                    <Image style={styles.thumbnail} source={{uri : item.image}}/>
                </View>
                <View style={{alignItems : 'flex-start'}}>
                    <Text style={{ fontWeight : 'bold', fontSize : 14}}>{item.name}</Text>
                    <Text style={{fontSize : 20, fontWeight : 'bold'}}>₹ {Math.round((item.price * count)*10/10)}</Text>
                    <IncrementComp onChange={(value)=>{
                        if(parseInt(value)<count){setState(false)}
                        else(setState(true))
                        setCount(parseInt(value))
                        }}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        marginVertical : 10
    },
    cont : {
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        alignItems : 'center',
        borderTopWidth : 0.5,
        borderLeftWidth : 1,
        borderRightWidth : 1,
        borderBottomWidth : 3,
        borderRadius : 10,
        borderColor : 'lightgrey',
        paddingVertical : 10
    },

    thumbnail : {
        height : 80,
        width : 80
    }
})