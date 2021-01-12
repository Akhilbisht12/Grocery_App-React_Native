import React from 'react'
import { Dimensions } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const {width, height} = Dimensions.get('window')

export default function ProductLoader() {
    return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" flexWrap='wrap' justifyContent='space-evenly' alignItems="center">
        <SkeletonPlaceholder.Item alignItems='flex-start' marginVertical={5}>
            <SkeletonPlaceholder.Item height={height*0.2} width={width*0.35} borderRadius={10} margin={5}/>
            <SkeletonPlaceholder.Item height={10} width={width*0.35} borderRadius={10} margin={2}/>
            <SkeletonPlaceholder.Item width={width*0.35} flexDirection='row' justifyContent='space-evenly'>
                <SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item height={5} width={width*0.25} borderRadius={10} margin={2}/>
                    <SkeletonPlaceholder.Item height={5} width={width*0.25} borderRadius={10} margin={2}/>
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item height={18} width={18} borderRadius={5} margin={2}/>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item alignItems='flex-start' marginVertical={5}>
            <SkeletonPlaceholder.Item height={height*0.2} width={width*0.35} borderRadius={10} margin={5}/>
            <SkeletonPlaceholder.Item height={10} width={width*0.35} borderRadius={10} margin={2}/>
            <SkeletonPlaceholder.Item width={width*0.35} flexDirection='row' justifyContent='space-evenly'>
                <SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item height={5} width={width*0.25} borderRadius={10} margin={2}/>
                    <SkeletonPlaceholder.Item height={5} width={width*0.25} borderRadius={10} margin={2}/>
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item height={18} width={18} borderRadius={5} margin={2}/>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item alignItems='flex-start' marginVertical={5}>
            <SkeletonPlaceholder.Item height={height*0.2} width={width*0.35} borderRadius={10} margin={5}/>
            <SkeletonPlaceholder.Item height={10} width={width*0.35} borderRadius={10} margin={2}/>
            <SkeletonPlaceholder.Item width={width*0.35} flexDirection='row' justifyContent='space-evenly'>
                <SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item height={5} width={width*0.25} borderRadius={10} margin={2}/>
                    <SkeletonPlaceholder.Item height={5} width={width*0.25} borderRadius={10} margin={2}/>
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item height={18} width={18} borderRadius={5} margin={2}/>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item alignItems='flex-start' marginVertical={5}>
            <SkeletonPlaceholder.Item height={height*0.2} width={width*0.35} borderRadius={10} margin={5}/>
            <SkeletonPlaceholder.Item height={10} width={width*0.35} borderRadius={10} margin={2}/>
            <SkeletonPlaceholder.Item width={width*0.35} flexDirection='row' justifyContent='space-evenly'>
                <SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item height={5} width={width*0.25} borderRadius={10} margin={2}/>
                    <SkeletonPlaceholder.Item height={5} width={width*0.25} borderRadius={10} margin={2}/>
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item height={18} width={18} borderRadius={5} margin={2}/>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
    )
}
