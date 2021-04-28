import React from 'react'
import { Dimensions } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const {width, height} = Dimensions.get('window')

export default function HeaderLoader() {
    return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item justifyContent='center' alignItems="center">
            <SkeletonPlaceholder.Item height={height*0.25} width={width-20} borderRadius={10} margin={5}/>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
    )
}
