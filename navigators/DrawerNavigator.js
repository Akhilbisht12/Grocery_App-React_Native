import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import CustomDrawer from './CustomDrawer';
export default function DrawerNavigator ({navigation}){
  const Drawer = createDrawerNavigator();
    return(
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
            <Drawer.Screen name='My Store' component={StackNavigator}/>
        </Drawer.Navigator>
    )
}
