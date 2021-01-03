import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native'
import Header from '../Components/Header';
import ProductShow from '../Components/ProductShow'
import { useNavigation } from '@react-navigation/native';
import CategoryComp from '../Components/CategoryComp';
import FlatCarousel from '../Components/FlatCarousel'
const { height, width}= Dimensions.get('window')

export default function Home() {
    const navigation = useNavigation();
    const cart = [];
            return(
                <SafeAreaView>
                    <Header/>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                <FlatCarousel/>
                <View style={styles.cat}>
                    <CategoryComp/>
                </View>
                <Text style={{fontSize : 25, fontWeight : 'bold', paddingHorizontal : 10, marginTop : 20}}>Popular Products</Text>
                <View style={styles.productGrid}>
                    <ProductShow/>
                </View>
                </ScrollView>
            </SafeAreaView>
            )}

const styles= StyleSheet.create({
    scroll : {
        backgroundColor : 'white'
    },
    main : {
        flex : 1,
        justifyContent : 'center',
        width : Dimensions.get('window').width

    },
    productGrid : {
        width : Dimensions.get('window').width,
        flexWrap : 'wrap',
        flexDirection : 'row',
        alignItems : 'center',
        marginBottom : 300,
        justifyContent : 'center'
    },
    cat : {
        alignItems : 'center',
    }
})
