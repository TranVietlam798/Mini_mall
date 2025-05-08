import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const ProductItem = ({ product }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.item}
            onPress={() => {

                navigation.navigate('Infor', { product: product, })

            }}>
            <Image style={styles.ProductIImage} source={{ uri: product.thumbnail }} />
            <Text style={styles.ProductTitle}>{product.title}</Text>
            <Text style={styles.ProductPrice}>$ {product.price}</Text>

        </TouchableOpacity>
    )
};
export default ProductItem

const styles = StyleSheet.create({

    ProductIImage: {
        height: '200', width: '100%', resizeMode: 'contain',
        backgroundColor: '#3b61ba1d',
        borderRadius: 10
    },
    ProductPrice: {
        width: '100%',
        marginTop: '2%',
        fontWeight: '800'
    },
    ProductTitle: {
        width: '100%',
        height: 20,
        marginTop: '10%',
    },
    item: {
        width: 150, // is 50% of container width
        alignItems: 'center',
    },

})