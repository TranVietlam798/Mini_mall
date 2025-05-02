import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainScreen from './BottomTabBar'
import CheckoutScreen from '../screens/CheckoutScreen'

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
                />


            </stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})



