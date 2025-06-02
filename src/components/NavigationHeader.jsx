import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const NavigationHeader = ({ title, rightIcon, leftIcon }) => {
    const navigator = useNavigation()
    return (
        <View style={styles.container}>
            {
                rightIcon ?
                    <TouchableOpacity onPress={() => navigator.goBack()}>
                        <Image style={styles.Icon} source={rightIcon} />
                    </TouchableOpacity> :
                    <View style={styles.Icon}></View>
            }
            <Text style={styles.title}>{title}</Text>
            {
                leftIcon ?
                    <TouchableOpacity style={styles.Buttom} onPress={() => navigator.navigate('Main', { screen: 'Cart' })}>
                        <Image style={styles.Icon} source={leftIcon} />
                    </TouchableOpacity> :
                    <View style={styles.Icon}></View>

            }
        </View>
    )
}

export default NavigationHeader

const styles = StyleSheet.create({
    Buttom: {
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    Icon: {
        height: 36,
        width: 36,
        resizeMode: 'stretch',

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    }
})