import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Categories from '../components/Categories'
import axios from 'axios'
import ProductItem from '../components/ProductItem'
import Promotion from '../constans/Promotion'

const HomeScreen = () => {
    const [categories, setcategories] = useState([])
    const [selectedCategory, SetSelectedCategory] = useState("furniture")
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('https://dummyjson.com/products/categories')
            .then(function (response) {
                console.log(response.data);
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
                const data = []

                // response.data.map((product) => {
                // //     // product.category.image === selectedCategory && 
                // data.push(product)
                // })
                console.log(response.data.products);
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
                    item.slug === selectedCategory && <Image style={styles.ImageCategory} source={{ uri: item.image }} />
                

                )
                }


                {/* product */}

                <View style={styles.ProductContainer}>
                    <Text style={styles.ProductsHeader}>Product</Text>
                    <View style={styles.ProductItemContainer}>
                        {
                            products.map((item, index) => <ProductItem key={index} title={item.title} image={item.thumbnail} price={item.price} />)
                        }
                    </View>

                </View>

            </SafeAreaView>
        </ScrollView>
    )
}

export default HomeScreen



const styles = StyleSheet.create({
    ProductItemContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
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
    ProductContainer: {
        width: "100%"
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
    ImageCategory: {
        height: 150,
        width: "80%",
        resizeMode: 'cover',
        marginTop: '8%',
        borderRadius: "5%"
    }
})