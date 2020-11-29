import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import OnBoardingScreen from '../Screens/OnBoardingScreens/OnBoardingScreen';

const data = {
  screenOne : {
    title : 'No More Burden Of Bags',
    subTitle : 'Shop on our app and get free home delivery within 10km',
    navigate : 'ScreenTwo',
    image : require('../Screens/OnBoardingScreens/onbOne.png'),
    a : 7,
    b : 5,
    c : 5,
  },
  screenTwo : {
    title : 'Fresh Grocery',
    subTitle : 'Keep yourself and your family safe, eat healthy, stay fit.',
    navigate : 'ScreenThree',
    image : require('../Screens/OnBoardingScreens/onbTwo.png'),
    a : 5,
    b : 7,
    c : 5,
  },
  screenThree : {
    title : 'Free Doorstep Delivery',
    subTitle : 'Free Doorstep Delivery within 10km and minimal charges after that.',
    navigate : 'Home',
    image : require('../Screens/OnBoardingScreens/onbThree.png'),
    a : 5,
    b : 5,
    c : 7,
  }
}

function ScreenOne(){
  return <OnBoardingScreen data={data.screenOne}/>
}

 function ScreenTwo(){
   return <OnBoardingScreen data={data.screenTwo}/>
 }

 function ScreenThree(){
  return <OnBoardingScreen data={data.screenThree}/>
}

export default function StackNavigator() {
const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName='ScreenOne' headerMode='none'>
      <Stack.Screen name='ScreenOne' component={ScreenOne}/>
      <Stack.Screen name='ScreenTwo' component={ScreenTwo}/>
      <Stack.Screen name='ScreenThree' component={ScreenThree}/>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

