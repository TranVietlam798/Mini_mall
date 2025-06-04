import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const OrderItem = ({ name, date, quantyti, subtotal, trackingNumber, details, address }) => {
 
    const navigator = useNavigation()
    return (
        <View style={styles.OrderItemContaner}>
            <View style={[styles.container, { marginTop: 19 }]}>
                <Text style={styles.OrderTitle}>Order {name}</Text>
                <Text style={styles.OrderDate}>{date}</Text>
            </View>

            <View style={styles.container}>
                <View style={[styles.container, { marginTop: 19 }]}>
                    <Text style={styles.Title}>Tracking number: </Text>
                    <Text style={styles.Content}> LM{trackingNumber}</Text>
                </View>
            </View>


            <View style={styles.container}>
                <View style={[styles.container, { marginTop: 19 }]}>
                    <Text style={styles.Title}>Quanlity:</Text>
                    <Text style={styles.Content}>{quantyti
                    }</Text>
                </View>
                <View style={[styles.container, { marginTop: 19 }]}>
                    <Text style={styles.Title}>Subtotal:</Text>
                    <Text style={styles.Subtotal}>${subtotal}</Text>
                </View>
            </View>

            <View style={styles.BtnContainer}>
                <TouchableOpacity
                    style={styles.BtnDetails}
                    onPress={() => {
                        navigator.navigate(
                            'OrderDetails',
                            {
                                name: name,
                                subtotal: subtotal,
                                trackingNumber: trackingNumber,
                                details: details,
                                address: address
                            }
                        )
                    }}>
                    <Text style={styles.BtnTitle}>Details</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default OrderItem

const styles = StyleSheet.create({
    BtnTitle: {
        fontSize: 14,
        color: '#000000'
    },
    BtnContainer: {
        marginTop: 19,
        alignItems: 'center',
        width: '100%'
    },
    OrderDate: {
        fontSize: 14,
        color: '#777E90'
    },
    OrderTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    Subtotal: {
        fontSize: 16,
        color: '#000000'
    },
    Content: {
        fontSize: 14,
        color: '#000000'
    },
    Title: {
        fontSize: 14,
        color: '#777E90'
    },
    State: {
        color: '#CF6212',
        fontSize: 14,
    },
    BtnDetails: {
        width: "25%",
        height: 28,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 19,
        borderColor: '#CF6212',
        backgroundColor: '#CF6212'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    OrderItemContaner: {
        borderWidth: 1,
        borderColor: '#00000038',
        borderRadius: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        paddingBottom: 20,
        width: '100%'
    }
})