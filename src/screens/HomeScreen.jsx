import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Categories from '../components/Categories'
import axios from 'axios'
import ProductItem from '../components/ProductItem'
import Promotion from '../constans/Promotion'

const HomeScreen = () => {
    const [categories, setcategories] = useState([])
    const [selectedCategory, SetSelectedCategory] = useState("")
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('https://dummyjson.com/products/categories')
            .then(function (response) {
                setcategories(response.data)
             })
            .catch(function (error) {
                // handle error
                console.log(error);

            })

    }, [])

    useEffect(() => {
        const url = 'https://dummyjson.com/products/category/' + selectedCategory
        axios.get(url)
            .then(function (response) {
                setProducts(response.data.products)
            })
            .catch(function (error) {
                // handle error
                console.log(error);

            })

    }, [selectedCategory])

    return (
        <ScrollView>
            <SafeAreaView style={styles.Container}>
                {/* header */}
                <Text style={styles.Header} >MINI MALL</Text>

                {/* category */}
                <View style={styles.Categories}>
                    {
                        categories.map((category, index) => ["Laptops", "Womens Dresses", "Furniture", "Womens Shoes"].includes(category.name) &&
                            <Categories key={index} name={category.name} SetSelectedCategory={SetSelectedCategory} selectedCategory={selectedCategory} slug={category.slug} />

                        )
                    }
                </View>


                {/* Promotion */}
                {Promotion.map((item, index) =>
                    item.slug === selectedCategory && <Image key={index} style={styles.Promotion} source={{ uri: item.image }} />


                )
                }


                {/* product */}

                {/* <View style={styles.ProductsContainer}> */}
                <Text style={styles.ProductsHeader}>Product</Text>
                <View style={styles.ProductsContainer}>
                    {
                        products.map((item, index) =>
                            <View key={index} style={styles.ProductItemContainer}>
                                <ProductItem product={item} />
                            </View>)
                    }
                </View>

                {/* </View> */}

            </SafeAreaView>
        </ScrollView>
    )
}

export default HomeScreen



const styles = StyleSheet.create({
    ProductItemContainer: {
        width: '44%', // is 50% of container width
        alignItems: 'center',

        marginTop: '5%',
        marginLeft: '4%'
    },
    item: {
        // flex:1,
        width: '44%', // is 50% of container width
        alignItems: 'center',

        marginTop: '5%',
        marginLeft: '4%'
    },
    ProductsHeader: {
        fontSize: 28,
        width: '100%',
        marginVertical: 20,
        paddingHorizontal: 20,
        fontWeight: '600'

    },
    ProductsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    Container: {
        // flex: 1,
        alignItems: 'center'
    },
    Header: {
        color: '#000000',
        fontSize: '30',
        fontWeight: '900',
        textAlign: 'center',
        width: '100%',

    },
    Categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: '5%',
    },
    Promotion: {
        height: 200,
        width: "90%",
        resizeMode: 'stretch',
        marginTop: '8%',
        borderRadius: "5%"
    }
})