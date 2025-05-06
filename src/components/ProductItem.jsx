import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const ProductItem = ({ title, image, price }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.item} onPress={()=> navigation.navigate('Infor')}>
            <Image style={styles.ProductIImage} source={{ uri: image }} />
            <Text style={styles.ProductTitle}>{title}</Text>
            <Text style={styles.ProductPrice}>$ {price}</Text>

        </TouchableOpacity>
    )
};
export default ProductItem

const styles = StyleSheet.create({
    ProductItemContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    ProductIImage: {
        height: '200', width: '100%', resizeMode: 'contain',
        backgroundColor: '#3b61ba1d',
        borderRadius: 10
    },
    ProductPrice: {
        width: '100%',
        paddingHorizontal: 10,
        fontWeight: '800'
    },
    ProductTitle: {
        width: '100%',
        height: 20,
        paddingHorizontal: 10,
    },
    item: {
        // flex:1,
        width: '44%', // is 50% of container width
        alignItems: 'center',

        marginTop: '5%',
        marginLeft: '4%'
    },

})