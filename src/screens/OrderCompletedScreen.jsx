import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import NavigationHeader from '../components/NavigationHeader'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'


const OrderCompletedScreen = () => {
    const navigator = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationHeader title={'Check out'} />
            <View style={styles.ImageContainer}>
                <Image source={require('../assets/image/OrderCompleted.png')} />
            </View>
            <Text style={styles.OrderCompletedText}>
                Order Completed
            </Text>
            <View style={[styles.ImageContainer, { marginTop: 100 }]}>
                <Image source={require('../assets/image/Completed.png')} />
            </View>
            <View style={styles.BtnContainer}>
                <TouchableOpacity style={styles.Buttom} onPress={() => { navigator.navigate('Main', { screen: 'Order' }) }}>
                    <Text style={styles.BtnText}>Check Orders</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default OrderCompletedScreen

const styles = StyleSheet.create({
    BtnContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 100,
        width: Dimensions.get('window').width,

    },
    BtnText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    Buttom: {
        height: 60,
        width: '80%',
        backgroundColor: '#343434',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        flexDirection: 'row'

    },
    ImageContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20
    },
    OrderCompletedText: {
        fontSize: 30,
        fontWeight: '600',
        marginLeft: 20,
        marginTop: 20
    }
})