import React from 'react'
import { View, Text, Image, Dimensions,StyleSheet } from 'react-native'


const { height, width}= Dimensions.get('window')


export default function Category({url,title}) {
    return (
        <View style={styles.main}>
            <Image style={{height : height*0.1+10, width : width*0.19+10}}
                    source={{uri : url}}/>
            <Text style={{textAlign : 'center'}}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        alignItems : 'center',
        width : width*0.3,
        borderTopWidth : 0.3,
        borderLeftWidth : 0.3,
        borderRightWidth : 0.3,
        borderBottomWidth : 1,
        borderColor : 'rgba(140, 212, 63,0.4)',
        borderRadius : 10,
        margin : 2,
        height : Dimensions.get('window').height*0.145 +30,
        paddingVertical : 10,
        justifyContent : 'center'
    }
})