import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import NavigationHeader from '../components/NavigationHeader'
import { useNavigation } from '@react-navigation/native'
import OrderItem from '../components/OrderItem'
import { SafeAreaView } from 'react-native-safe-area-context'


const OrderDetailScreen = ({ route }) => {
    const navigator = useNavigation()
    return (
        <SafeAreaView>
            <NavigationHeader rightIcon={require('../assets/icon/Back.png')} title={'Order ' + route.params.name} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 200 }}>
                    <View style={styles.ImageContainer}>
                        <Image source={require('../assets/image/BeingDelivered.png')} />
                    </View>

                    <View style={{ alignItems: 'center', }}>

                        <View style={
                            {
                                marginTop: 40,
                                borderRadius: 20,
                                borderWidth: 1,
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderColor: '#00000038'
                            }
                        }>

                            <View style={[styles.container, { paddingVertical: 8 }]}>
                                <Text style={styles.Title}>Order number</Text>
                                <Text style={[styles.Content, { width: '50%' }]}>{route.params.name}</Text>
                            </View>
                            <View style={[styles.container, { paddingVertical: 8 }]}>
                                <Text style={styles.Title}>Tracking Number</Text>
                                <Text style={[styles.Content, { width: '50%' }]}>LM{route.params.trackingNumber}</Text>
                            </View>
                            <View style={[styles.container, { paddingVertical: 8 }]}>
                                <Text style={styles.Title}>Delivery address</Text>
                                <Text style={[styles.Content, { width: '50%' }]}>{route.params.address}</Text>
                            </View>
                        </View>



                        <View style={
                            {
                                marginTop: 40,
                                borderRadius: 20,
                                borderWidth: 1,
                                paddingHorizontal: 20,
                                paddingBottom: 30,
                                borderColor: '#00000038'
                            }
                        }>

                            {route.params.details.map((product, index) =>
                                <View key={index} style={[styles.container, { paddingVertical: 10 }]}>
                                    <Text style={[styles.Title, { fontSize: 18 }]}>{product.title.slice(4).split('LamTran')}</Text>
                                    <View style={[styles.container, { width: '40%' }]}>
                                        <Text style={[styles.Content, { fontSize: 18 }]}>x{product.description}</Text>
                                        <Text style={[styles.Content, { fontSize: 18 }]}>${product.price * product.description}</Text>
                                    </View>
                                </View>
                            )}




                            <View style={[styles.container, { paddingVertical: 10 }]}>
                                <Text style={[styles.Title, { fontSize: 18 }]}>Sub Total</Text>
                                <Text style={[styles.Content, { fontSize: 18 }]}>${route.params.subtotal}</Text>
                            </View>
                            <View style={[styles.container, { paddingVertical: 10 }]}>
                                <Text style={[styles.Title, { fontSize: 18 }]}>Shipping</Text>
                                <Text style={[styles.Content, { fontSize: 18 }]}>{'0.00'}</Text>
                            </View>
                            <View style={[styles.container, { paddingVertical: 10 }]}>
                                <Text style={[styles.Title, { fontSize: 18 }]}>Discount</Text>
                                <Text style={[styles.Content, { fontSize: 18 }]}>{'90%'}</Text>
                            </View>
                            <View style={[styles.container, { paddingVertical: 10, borderTopWidth: 1, borderColor: '#00000038' }]}>
                                <Text style={[styles.Title, { fontSize: 18 }]}>Total</Text>
                                <Text style={[styles.Content, { fontSize: 18 }]}>${(route.params.subtotal * 0.9).toFixed()}</Text>
                            </View>
                        </View>


                        <View style={styles.BtnContainer}>
                            <TouchableOpacity
                                style={styles.BtnGoHome}
                                onPress={() => {
                                    navigator.navigate('Main')
                                }}>
                                <Text style={styles.BtnTitle}>Return Home</Text>
                            </TouchableOpacity>
                        </View>
                    </View >
                </View>
            </ScrollView >
        </SafeAreaView >
    )
}

export default OrderDetailScreen

const styles = StyleSheet.create({
    Content: {
        fontSize: 14,
        color: '#000000',
        textAlign: 'right'
    },
    Title: {
        fontSize: 14,
        color: '#777E90',
        width: '60%',
    },
    container: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ImageContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 30
    },
    BtnTitle: {
        fontSize: 14,
        color: '#000000'
    },
    BtnContainer: {
        marginTop: 50,
        alignItems: 'center',
        width: '100%'
    },
    BtnGoHome: {
        width: "40%",
        height: 40,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        borderColor: '#CF6212',
        backgroundColor: '#CF6212'
    },
})