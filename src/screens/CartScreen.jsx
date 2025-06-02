import { SafeAreaView, StyleSheet, Text, View, CheckBox, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import NavigationHeader from '../components/NavigationHeader'
import axios from 'axios'
import ProductCart from '../components/ProductCart'
import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native'
import { useContextState } from '../Contexts/StateContext'



const CartScreen = () => {

    const { state, dispatch } = useContextState()

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [discountedTotal, setDiscountedTotal] = useState(0)
    const [flat, SetFlat] = useState(true)
    const isFocused = useIsFocused();

    const navigator = useNavigation()


    useEffect(() => {

        const url = 'https://api.escuelajs.co/api/v1/categories/' + String(state.id) + '/products'
        axios.get(url)
            .then(function (response) {
                const cart = []
                response.data.map((item) => {
                    item.title.includes('LamTran') ? cart.push(item) : {};

                })
                setProducts(cart)

                setTotal(cart.reduce((total, num) => total + num.price * Number(num.description), 0))
                setDiscountedTotal((cart.reduce((total, num) => total + num.price * Number(num.description), 0) * 0.9).toFixed())


            })
            .catch(function (error) {
                // handle error
                consconsole.log(error);

            })


    }, [flat, isFocused])


    const updateCount = (id, images, value) => {

        const url = 'https://api.escuelajs.co/api/v1/products/' + id
        if (value === 0) {
            axios.delete(url)
                .then(response => {
                    dispatch({ type: 'SET_FLAT', payload: !state.flat });
                    SetFlat(!flat)

                })
                .catch(error => {
                    consconsole.log('Error deleting:', error);
                });
        }
        else {
            axios.put(url, {
                "description": String(value),
                "images": images
            })
                .then(response => {
                    console.log('Update successful:');
                    dispatch({ type: 'SET_FLAT', payload: !state.flat });
                    SetFlat(!flat)

                })
                .catch(error => {
                    consconsole.log('Error updating:', error);
                });
        }

    }
    const Checkout = () => {
        state.quantityProductInCart > 0 ? navigator.navigate('Checkout', { products: products }) : {}
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView  >
                <View style={{ marginBottom: 80 }}>

                    <NavigationHeader
                        title={'Your Cart'}
                    />
                    <View style={{ width: '100%', alignItems: 'center', }}>
                        {
                            products.map((product, index) => <ProductCart product={product} key={index} updateCount={updateCount} />)
                        }
                    </View>

                    <View style={{
                        marginTop: 20,
                        borderTopWidth: 1,
                        borderTopColor: '#3131332b',
                    }}>
                        <View style={[styles.TotalContainer]}>
                            <Text style={[styles.Total]}>Total</Text>

                            <Text style={[styles.Total]}>${total}</Text>

                        </View>
                        <View style={[styles.TotalContainer]}>
                            <Text style={[styles.Total]}>Discounted total</Text>

                            <Text style={[styles.Total]}>${discountedTotal}</Text>

                        </View>

                    </View>
                </View>

            </ScrollView>
            <View style={styles.BtnContainer}>
                <TouchableOpacity style={styles.Buttom} onPress={() => Checkout()}>
                    <Text style={styles.BtnText}>Checkout  </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    Total: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    TotalContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingVertical: 20,
        marginVertical: 5,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#3131332b',

    },
    BtnContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        width: Dimensions.get('window').width,

    },
    BtnText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    Buttom: {
        height: 60,
        width: 0.5 * Dimensions.get('window').width,
        backgroundColor: '#343434',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        flexDirection: 'row'

    },
})