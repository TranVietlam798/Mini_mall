import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import OrderScreen from '../screens/OrderScreen'


const MainScreen = () => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Image source={require('../assets/icon/HomeFocused.png')} />
                        ) : (
                            <Image source={require('../assets/icon/Home.png')} />
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
                            <Image source={require('../assets/icon/CartFocused.png')} />
                        ) : (
                            <Image source={require('../assets/icon/Cart.png')} />
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
                            <Image source={require('../assets/icon/OrderFocused.png')} />
                        ) : (
                            <Image source={require('../assets/icon/Order.png')} />
                        ),
                    tabBarIconStyle: {
                        margin: '10%'
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default MainScreen