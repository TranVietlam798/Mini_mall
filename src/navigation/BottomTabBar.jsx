import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import OrderScreen from '../screens/OrderScreen'
import { useContextState } from '../Contexts/StateContext'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'


const MainScreen = ({ route }) => {

    const Tab = createBottomTabNavigator()
    const { state, dispatch } = useContextState()
    const isFocused = useIsFocused();


    useEffect(() => {

        axios.get('https://api.escuelajs.co/api/v1/categories/')
            .then(function (response) {
                const id = response.data[0].id
                dispatch({ type: 'SET_ID', payload: response.data[0].id })
                const url = 'https://api.escuelajs.co/api/v1/categories/' + String(id) + '/products'
                axios.get(url)
                    .then(function (response) {
                        const products = []
                        response.data.map((item) => {

                            item.title.includes('LamTran') ? products.push(item) : {};

                        })
                        dispatch({ type: 'SET_QUANTYTI', payload: products.reduce((total, num) => total + Number(num.description), 0) })
                    })
                    .catch(function (error) {
                        // handle error
                        consconsole.log(error);

                    })

            })
            .catch(function (error) {
                // handle error
                consconsole.log(error);

            })

        const url = 'https://api.escuelajs.co/api/v1/categories/' + String(state.id) + '/products'
        axios.get(url)
            .then(function (response) {
                const products = []
                response.data.map((item) => {
                    item.title.includes('LamTran') ? products.push(item) : {};

                })
                dispatch({ type: 'SET_QUANTYTI', payload: products.reduce((total, num) => total + Number(num.description), 0) })
            })
            .catch(function (error) {
                // handle error
                consconsole.log(error);

            })




    }, [state.flat, isFocused])

    useEffect(() => {
        axios.get('https://api.escuelajs.co/api/v1/categories/')
            .then((response) => {
                let quantityOrder = 0;

                response.data.map(async (item) => {
                    if (item.name.includes('NewCategoryLam')) {
                        const url = 'https://api.escuelajs.co/api/v1/categories/' + item.id + '/products'
                        await axios.get(url)
                            .then(function (response) {
                                const cart = response.data
                                if (cart.length > 0) {
                                    quantityOrder += 1
                                }
                            })
                            .catch(function (error) {
                                consconsole.log(error);
                            })
                    }
                    dispatch({ type: 'SET_QUANTYTI_ORDER', payload: quantityOrder })
                })
            })
            .catch(() => {
                consconsole.log(error);
            })
    }, [isFocused])


    return (
        <Tab.Navigator
            initialRouteName={route.params?.screen === undefined ? 'Home' : route.params?.screen}
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <View style={{ marginBottom: 5 }}>
                                <Image source={require('../assets/icon/HomeFocused.png')} />
                            </View>
                        ) : (
                            <View style={{ marginBottom: 5 }}>
                                <Image source={require('../assets/icon/Home.png')} />
                            </View>
                        ),
                    tabBarIconStyle: {
                        margin: '10%'
                    }
                }}

            />
            <Tab.Screen
                name='Cart'
                component={CartScreen}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                <Image source={require('../assets/icon/CartFocused.png')} />
                                <View>
                                    <Text style={styles.quantityFocused} >{state.quantityProductInCart}</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                <Image source={require('../assets/icon/Cart.png')} />
                                <View >
                                    <Text style={styles.quantity} >{state.quantityProductInCart}</Text>
                                </View>
                            </View>
                        ),
                    tabBarIconStyle: {
                        margin: '10%'
                    }

                }}

            />
            <Tab.Screen
                name='Order'
                component={OrderScreen}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                <Image source={require('../assets/icon/OrderFocused.png')} />
                                <View >
                                    <Text style={styles.quantityFocused} >{state.quantityOrder}</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                <Image source={require('../assets/icon/Order.png')} />
                                <View>
                                    <Text style={styles.quantity}  >{state.quantityOrder}</Text>
                                </View>
                            </View>
                        ),
                    tabBarIconStyle: {
                        margin: '10%'
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    quantityFocused: {
        backgroundColor: 'red',
        fontSize: 12,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#cf6112ff',
        backgroundColor: '#cf6112ff',
        borderRadius: 8,
        paddingHorizontal: 3,
        height: 18,
    },
    quantity: {
        backgroundColor: 'red',
        fontSize: 12,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#cf6112ff',
        backgroundColor: 'transparent',
        borderRadius: 8,
        paddingHorizontal: 3,
        height: 18,
        color: '#cf6112ff'
    }
})

export default MainScreen