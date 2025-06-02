import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainScreen from './BottomTabBar'
import CheckoutScreen from '../screens/CheckoutScreen'
import ProductInfor from '../screens/ProductInforScreen'
import OrderDetailScreen from '../screens/OrderDetailScreen'
import OrderCompletedScreen from '../screens/OrderCompletedScreen'

const StackNavigator = () => {
    const stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <stack.Navigator>

                <stack.Screen
                    name='Main'
                    component={MainScreen}
                    options={{ headerShown: false }}
                />
                <stack.Screen
                    name='Checkout'
                    component={CheckoutScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <stack.Screen
                    name='Infor'
                    component={ProductInfor}
                    options={{
                        headerShown: false
                    }}
                />
                <stack.Screen
                    name='OrderDetails'
                    component={OrderDetailScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <stack.Screen
                    name='OrderCompleted'
                    component={OrderCompletedScreen}
                    options={{
                        headerShown: false
                    }}
                />


            </stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})



