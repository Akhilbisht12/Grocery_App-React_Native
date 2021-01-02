import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

export default function Loader() {
    return (
        <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
            <ActivityIndicator size={50} color="#62BA03" />
            <Text style={{fontSize : 20, fontWeight : 'bold', color : '#62BA03'}}>Loading Components</Text>
        </View>
    )
}
