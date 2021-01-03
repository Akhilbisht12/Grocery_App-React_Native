import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, StatusBar, TextInput, Alert } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../Components/Loader';
import WooCommerce from '../Components/WooCommerce'

const {width,height} = Dimensions.get('window');

export default function Cart({navigation}) {
    const [step, setStep] = useState(1);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    useEffect(()=>{
        AsyncStorage.getItem('cart')
        .then((cartData)=>{
            if(cartData!==null){
                setCart(JSON.parse(cartData))
            }
            AsyncStorage.getItem('user')
            .then((userdata)=>{
                setUser(JSON.parse(userdata));
                setLoading(false)
            })
        })
        
    },[])

    const handleQuantityChange = (state, i)=>{
        console.log(state,i)
        if(state === true){
            const temp = [...cart];
            temp[i].quantity = temp[i].quantity+1;
            setCart(temp);
        }else if(state === false && cart[i].quantity>1){
            const temp = [...cart];
            temp[i].quantity = temp[i].quantity-1;
            setCart(temp);
            }
    }

    const handleTrash = (i) => {
        var temp = [...cart];
        temp.splice(i,1);
        setCart(temp)
        AsyncStorage.setItem('cart', JSON.stringify(temp))
    }

    const calculateTotal = () => {
        var sum =0;
        cart.forEach(element => {
            sum = sum + (element.price*element.quantity)
        });
        return parseFloat(sum).toFixed(2)
    }
    const calculateSavings = () => {
        var save =0;
        cart.forEach(element => {
            if(element.sale_price){
                console.log(element.regular_price, element.sale_price, save)
                save = save + ((element.regular_price - element.sale_price)*element.quantity)
            }
        });
        return parseFloat(save).toFixed(2)
    }

    const trashHide = () => {
        if(cart.length !== 0){
            return(
                <TouchableOpacity onPress={handleCartFlush}>
                    <Icon name='trash' color='rgb(244,10,10)' size={30} style={{}}/>
                </TouchableOpacity>
            )
        }
    }

    const handlePlaceOrder =()=>{
        const products =[];
        cart.map((item)=>products.push({
            product_id : item.id,
            quantity : item.quantity
        }))
        const data = {
            payment_method: "cod",
            payment_method_title: "Cash on delivery",
            set_paid: false,
            billing: user.billing,
            shipping: user.shipping,
            line_items: products,
            customer_id :user.id,
            shipping_lines: [
              {
                method_id: "flat_rate",
                method_title: "Flat Rate",
                total: "0.00"
              }
            ]
          };
          
          WooCommerce.post("orders", data)
            .then((response) => {
              setCart([])
              setStep(1)
              AsyncStorage.setItem('cart', JSON.stringify([]))
              Alert.alert('Order Successful', 'Thank You For Your Order')
            })
            .catch((error) => {
              alert(error.response)
            });
          
    }

    const handleCartFlush = () => {
        setCart([]);
        AsyncStorage.setItem('cart', JSON.stringify([]));
    }

    const handleUpdate = () => {
        const dataup = {
            billing: {
              address_1: user.billing.address_1,
              address_2 : user.billing.address_2,
              city : user.billing.city,
              phone : user.billing.mobile
            },
            shipping: {
                address_1: user.billing.address_1,
                address_2 : user.billing.address_2,
                city : user.billing.city,
            }
          };
          
          WooCommerce.put(`customers/${user.id}`, dataup)
            .then((response) => {
              console.log(response);
              AsyncStorage.setItem('user', JSON.stringify(user))
              setStep(2)
            })
            .catch((error) => {
              console.log(error.response);
            });
          
    }

    if(loading){
        return <Loader/>
        }else if(step === 1){
    return (
        <View style={styles.main}>
            <ScrollView >
                <View>
                    <View style={{paddingVertical : 10, flexDirection : 'row', justifyContent : 'space-around'}}>
                        <View>
                            <Text style={{fontSize : 25, fontWeight : 'bold'}}>Cart Items</Text>
                            <Text>You have {cart.length} items in your cart</Text>
                        </View>
                        <View>
                            {trashHide()}
                        </View>
                    </View>
                    <View style={{marginVertical : 20 }}>
                        {cart.map((item,i)=>{
                            return(
                                <View style={styles.cartItem} key={item.id}>
                                    <View>
                                        <Image style={{width : width*0.20, height : 0.10*height, borderRadius : 10}} source={{uri : item.image}}/>
                                    </View>
                                    <View style={styles.nameView}>
                                        <Text style={{fontSize : 20, fontWeight : 'bold'}}>{item.name}</Text>
                                        <View style={styles.priceView}>
                                            <Text style={{fontSize : 18, fontWeight : 'bold', color : '#62BA03'}}>₹ {parseFloat(item.price*item.quantity).toFixed(2)}</Text>
                                            <View style={{flexDirection : 'row'}}>
                                                <TouchableOpacity onPress={()=>handleQuantityChange(true,i)}>
                                                    <Icon color='#62BA03' name='plus' style={styles.icon}/>
                                                </TouchableOpacity>
                                                <Text style={{textAlignVertical : 'center', marginHorizontal : 15}}>{item.quantity}</Text>
                                                <TouchableOpacity onPress={()=>handleQuantityChange(false,i)}>
                                                    <Icon color='#62BA03' name='minus' style={styles.icon}/>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.trash} onPress={()=>handleTrash(i)}>
                                                    <Icon color='white' name='trash'/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
            <View style={{alignItems : 'center'}}>
                    <TouchableOpacity style={styles.btn} onPress={()=>{
                        if(cart.length!==0){
                            setStep(2)
                        }else alert('Cart Empty')
                        }}>
                        <Text style={{fontSize : 20, color : 'white', textAlign : 'center'}}>₹ {calculateTotal()}  </Text>
                        <View style={{flexDirection : 'row'}}>
                            <Text style={{color : 'white', fontSize : 20}}>Checkout  </Text>
                            <Icon color='white' size={20} name='arrow-right'/>
                        </View>
                    </TouchableOpacity>
                </View>
        </View>
    )
            }else if(step === 2){
                return(
                    <View style={{paddingHorizontal : 10, justifyContent : 'space-between'}}>
                        <Text style={styles.orderHead}>Order Summary</Text>
                        <View style={styles.cont}>
                            <View style={styles.orderDetails}>
                                <Text style={styles.txt}>Sub Total</Text>
                                <Text style={styles.txt}>₹ {calculateTotal()}</Text>
                            </View>
                            <View style={styles.orderDetails}>
                                <Text style={styles.txt}>Total Items</Text>
                                <Text style={styles.txt}>{cart.length}</Text>
                            </View>
                            <View style={styles.orderDetails}>
                                <Text style={styles.txt}>Delivery Charges</Text>
                                <Text style={styles.txt}>₹ 0</Text>
                            </View>
                            <View style={styles.orderDetails}>
                                <Text style={styles.txt}>Total Savings</Text>
                                <Text style={styles.txt}>₹ {calculateSavings()}</Text>
                            </View>
                            <View style={styles.orderDetails}>
                                <Text style={{color : '#62BA03', fontSize : 20, fontWeight : 'bold'}}>Grand Total</Text>
                                <Text style={{color : '#62BA03', fontSize : 20, fontWeight : 'bold'}}>{calculateTotal()}</Text>
                            </View>
                        </View>
                        <View style={styles.cont}>
                            <Text style={{fontSize : 18, fontWeight : 'bold', padding : 5}}>Deliver to :</Text>
                            <View style={styles.orderDetails}>
                                <View>
                                    <Text style={{fontSize : 16}}>{user.first_name} {user.last_name}</Text>
                                    <Text  style={{fontSize : 16}}>{user.shipping.address_1}</Text>
                                    <Text  style={{fontSize : 16}}>{user.shipping.address_2}</Text>
                                    <Text  style={{fontSize : 16}}>{user.shipping.city}</Text>
                                    <Text  style={{fontSize : 16}}>{user.billing.phone}</Text>
                                    <Text  style={{fontSize : 16}}>{user.billing.email}</Text>
                                </View>
                                <TouchableOpacity style={styles.changeBtn} onPress={()=>setStep(3)}>
                                    <Text style={{color : '#62BA03', fontWeight : 'bold'}}>Change</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={handlePlaceOrder}>
                            <Text style={{color : 'white'}}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                )
            }else if(step === 3){
                return (
                    <View style={{justifyContent : 'space-evenly', alignItems : 'center'}}>
                        <Text style={{fontSize : 30 }}>Fill Details For Your Orders</Text>
                        <TextInput placeholderTextColor={'grey'} style={styles.input} placeholder='Flat, House no'
                            onChangeText={(text)=>{user.shipping.address_1=text}}/>
                        <TextInput placeholderTextColor={'grey'} style={styles.input} placeholder='Area, Colony, Street Name'
                            onChangeText={(text)=>{user.shipping.address_2=text}}/>
                        <TextInput placeholderTextColor={'grey'} style={styles.input} placeholder='Landmark'
                            onChangeText={(text)=>{user.shipping.city=text}}/>
                        <TextInput placeholderTextColor={'grey'} style={styles.input} placeholder='Mobile Number'
                            onChangeText={(text)=>{user.billing.mobile=text}}/>
                        <TouchableOpacity style={styles.btn} onPress={handleUpdate}>
                            <Text style={{color : 'white' }}>Save Details</Text>
                        </TouchableOpacity>
                    </View>  
                )
            }
}

const styles = StyleSheet.create({
    main : {
        flex : 1,
        justifyContent : 'space-between',
        alignItems : 'center',
        marginTop : StatusBar.currentHeight
    },
    cartItem : {
        flexDirection : 'row',
        width : width-20,
        marginVertical : 5,
    },
    priceView : {
        width : width*0.7,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    icon : {
        padding : 10,
        borderRadius : 5,
        borderWidth : 1,
        borderColor : 'lightgrey'
    },
    nameView : {
        width : width*0.7,
        justifyContent : 'space-evenly',
        marginLeft : 5
    },
    btn : {
        backgroundColor : '#62BA03',
        paddingVertical : 10,
        paddingHorizontal : 20,
        borderRadius : 10,
        flexDirection : 'row',
        width : width-10,
        justifyContent : "center",
        alignItems : 'center'
    },
    trash : {
        padding : 10,
        backgroundColor : 'red',
        borderRadius : 20,
        marginLeft : 10
    },
    orderHead : {
        fontSize : 30,
        textAlign : 'center',
        marginVertical : 10
    },
    orderDetails : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        borderBottomWidth : 1,
        padding : 8,
        borderColor : 'lightgrey'
    },
    changeBtn : {
        paddingHorizontal : 15,
        paddingVertical : 10,
        borderRadius : 10,
        borderColor : '#62BA03',
        borderWidth : 1,
    },
    txt : {
        fontSize : 16,
        marginVertical : 3
    },
    cont : {
        borderWidth : 1,
        borderRadius : 5,
        borderColor : 'lightgrey',
        marginVertical : 20
    },
    input : {
        borderWidth : 1,
        borderColor : 'lightgrey',
        width : Dimensions.get('window').width - 50,
        marginVertical : 15,
        paddingHorizontal : 10,
        paddingVertical : 5,
        borderRadius : 5
    },
})