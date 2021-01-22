import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import {FlatListSlider} from 'react-native-flatlist-slider';

const {width} = Dimensions.get('window')

export default function FlatCarousel() {
    const DATA = [
        {
          id: '1',
          url: 'https://gms.upgrate.in/wp-content/uploads/h1.jpg',
        },
        {
          id: '2',
          url: 'https://gms.upgrate.in/wp-content/uploads/h2.jpg',
        },
        {
          id: '3',
          url: 'https://gms.upgrate.in/wp-content/uploads/h3.jpg',
        },
        {
          id: '4',
          url: 'https://gms.upgrate.in/wp-content/uploads/h4.jpg',
        }
      ];
    return (
          <FlatListSlider
            data={DATA}
            imageKey={'url'}
            timer={5000}
            height={width*0.5}
            onPress={()=>{}}
          />
    )
}
