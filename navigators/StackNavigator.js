import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import WebComp from '../Screens/WebComp';
import Cart from '../Screens/Cart';
import OnBoardingScreen from '../Screens/OnBoardingScreens/OnBoardingScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeArea } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";

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

function HomeCall (){
  return <WebComp url = 'https://gms.upgrate.in/'/>
}


export default function StackNavigator() {
  const [ loading, setLoading] = useState(true)
const Stack = createStackNavigator();
const [initialRoute, setInitialRoute] = useState('');
useEffect(()=>{
  AsyncStorage.getItem('user')
  .then((data)=>{
    const user = JSON.parse(data)
    if(user){setInitialRoute('Home')}
    else{setInitialRoute('Login')}
    setLoading(false);
  })
},[])

if(loading) return<ActivityIndicator/>
else{
    return (
      <Stack.Navigator initialRouteName={initialRoute} headerMode='none'>
        <Stack.Screen name='ScreenOne' component={ScreenOne}/>
        <Stack.Screen name='ScreenTwo' component={ScreenTwo}/>
        <Stack.Screen name='ScreenThree' component={ScreenThree}/>
        <Stack.Screen name="WebView" component={HomeCall} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    )
  }
};

