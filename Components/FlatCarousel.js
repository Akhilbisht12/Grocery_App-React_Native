import React from 'react'
import { View, Text } from 'react-native'
import {FlatListSlider} from 'react-native-flatlist-slider';

export default function FlatCarousel() {
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
    return (
            <FlatListSlider
        data={DATA}
        imageKey={'url'}
        timer={5000}
    />
    )
}
