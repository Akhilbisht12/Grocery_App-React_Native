import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';


export default function IncrementComp(props) {
    const [num, setNum] = useState('1');
    const handleIncrement = ()=>{
        setNum((parseInt(num)+1).toString())
    }
    const handleDecrement = ()=>{
        const temp = parseInt(num)
        if(temp>1){
            setNum((parseInt(num)-1).toString())
        }
    }
    useEffect(()=>{
        props.onChange(num)
    },[num])
    return (
        <View style={styles.main}>
            <TouchableOpacity style={styles.btn} onPress={handleDecrement}>
                <Icon color='black' name='minus'/>
            </TouchableOpacity>
            
            <TextInput
             keyboardType={'numeric'}
             value={num}
             style={styles.input}
             onChangeText={(text)=>setNum(text)}
             />
            <TouchableOpacity style={styles.btn} onPress={handleIncrement}>
                <Icon color='black' name='plus'/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    btn : {
        backgroundColor : 'white',
        paddingHorizontal : 12,
        paddingVertical : 10,
        borderRadius : 20
        
    },
    input : {
        textAlign : 'center',
        textAlignVertical : 'center'
    }
})