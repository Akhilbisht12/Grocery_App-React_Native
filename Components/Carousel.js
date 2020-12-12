import React from 'react'
import { View, Text, FlatList, Image, Dimensions } from 'react-native'

const { width, height}= Dimensions.get('window');

const DATA = [
    {
      id: '1',
      url: 'https://gms.upgrate.in/wp-content/uploads/2020/11/4.jpg',
    },
    {
      id: '2',
      url: 'https://gms.upgrate.in/wp-content/uploads/2020/11/5.jpg',
    },
    {
      id: '3',
      url: 'https://gms.upgrate.in/wp-content/uploads/2020/11/3.jpg',
    },
  ];

  const Item = ({ url }) => (
    <Image source={{uri : url}} style ={{width : width, height : height*0.3}}/>
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
                    />
    )
}
