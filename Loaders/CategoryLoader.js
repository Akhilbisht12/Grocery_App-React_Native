import React from 'react'
import { Dimensions } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const {width, height} = Dimensions.get('window')

export default function CategoryLoader() {
    return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" flexWrap='wrap' justifyContent='center' alignItems="center">
        <SkeletonPlaceholder.Item alignItems='center'>
            <SkeletonPlaceholder.Item height={height*0.125} width={width*0.25} borderRadius={10} margin={5}/>
            <SkeletonPlaceholder.Item height={20} width={width*0.25} borderRadius={10}/>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item alignItems='center'>
            <SkeletonPlaceholder.Item height={height*0.125} width={width*0.25} borderRadius={10} margin={5}/>
            <SkeletonPlaceholder.Item height={20} width={width*0.25} borderRadius={10}/>
        </SkeletonPlaceholder.Item><SkeletonPlaceholder.Item alignItems='center'>
            <SkeletonPlaceholder.Item height={height*0.125} width={width*0.25} borderRadius={10} margin={5}/>
            <SkeletonPlaceholder.Item height={20} width={width*0.25} borderRadius={10}/>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
    )
}
