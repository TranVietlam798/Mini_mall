import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ProductCart = ({ product, updateCount }) => {
    const [count, setCount] = useState(Number(product.description))





    return (

        <View style={styles.containerProduct}>
            <Image style={styles.imageProduct} source={{ uri: (product.images[0]) }} />

            <View style={{ justifyContent: 'space-around', marginHorizontal: 10, width: '60%' }}>
                <View style={styles.containerTitle}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{product.title.split('LamTran')}</Text>

                </View>
                <View style={styles.containerPrice}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>$ {product.price * Number(product.description)}</Text>

                    <View style={styles.count}>
                        <TouchableOpacity onPress={() => { updateCount(product.id, product.images, Number(product.description) - 1) }}>
                            <Text style={{ width: 30, textAlign:'center' }}>-</Text>
                        </TouchableOpacity>
                        <Text>{Number(product.description)}</Text>
                        <TouchableOpacity onPress={() => { updateCount(product.id, product.images, Number(product.description) + 1) }}>
                            <Text style={{ width: 30, textAlign:'center' }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ProductCart

const styles = StyleSheet.create({
    count: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: 'black',
        borderWidth: 1,
        height: 25,
        width: 70,
        alignItems: 'center',
        borderRadius: 12.5
    },
    containerPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerProduct: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#0000002a'
    },
    imageProduct: {
        height: 99,
        width: 99,
        backgroundColor: '#776f6f4c',
        borderRadius: 24
    }
})