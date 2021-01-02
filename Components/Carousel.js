import React from 'react'
import { View, Text, FlatList, Image, Dimensions, StyleSheet } from 'react-native'

const { width, height}= Dimensions.get('window');

const DATA = [
    {
      id: '1',
      url: 'https://gms.upgrate.in/wp-content/uploads/2020/12/h1.jpg',
    },
    {
      id: '2',
      url: 'https://gms.upgrate.in/wp-content/uploads/2020/12/h2.jpg',
    },
    {
      id: '3',
      url: 'https://gms.upgrate.in/wp-content/uploads/2020/12/h3.jpg',
    },
  ];

  const Item = ({ url }) => (
    <Image source={{uri : url}} style ={styles.img}/>
  );

export default function carousel() {
      const renderItem = ({ item }) => (
        <Item url={item.url} />
      );
    return (
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          scrollEnabled
          loop
          showsHorizontalScrollIndicator={false}
          />
    )
}

const styles = StyleSheet.create({
  img : {
    width : width-10,
    height : height*0.3-10,
    margin : 5,
    borderRadius : 10
  }
})