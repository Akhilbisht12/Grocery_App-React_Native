import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import Cart from '../Screens/Cart';
import MyOrders from '../Screens/MyOrders'

export default function DrawerNavigator (){
  const Drawer = createDrawerNavigator();
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='My Store' component={StackNavigator}/>
            <Drawer.Screen name='Cart' component={Cart}/>
            <Drawer.Screen name='My orders' component={MyOrders}/>
            <Drawer.Screen name='Refer & Earn' component={StackNavigator}/>
            <Drawer.Screen name='Cashback & Reward' component={StackNavigator}/>
            <Drawer.Screen name='Logout' component={StackNavigator}/>
        </Drawer.Navigator>
    )
}