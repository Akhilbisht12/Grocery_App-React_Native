import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';

export default function DrawerNavigator (){
  const Drawer = createDrawerNavigator();
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={StackNavigator}/>
        </Drawer.Navigator>
    )
}