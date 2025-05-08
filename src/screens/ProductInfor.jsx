import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductItem from '../components/ProductItem'
import axios from 'axios'
import NavigationHeader from '../components/NavigationHeader'

const ProductInfor = ({ route }) => {
    const product = (route.params.product)
    const [similarProduct, setSimilarProduct] = useState([])
    const [showDecription, setShowDecription] = useState(false)
    const [showSimilarProduct, setShowSimilarProduct] = useState(false)

    useEffect(() => {
        const url = 'https://dummyjson.com/products/category/' + product.category
        axios.get(url)
            .then(function (response) {
                const data = []

                // response.data.map((product) => {
                // //     // product.category.image === selectedCategory && 
                // data.push(product)
                // })
                console.log(response.data.products);
                response.data.products.map((item) => {
                    item.title !== product.title && data.length < 5 && data.push(item)
                })

                setSimilarProduct(data)


            })
            .catch(function (error) {
                // handle error
            })
    }, [product])


    return (
        <SafeAreaView style={{ flex: 1, paddingBottom: 80 }}>
            <ScrollView>

                <NavigationHeader rightIcon={require('../assets/icon/Back.png')} />

                {/* image list */}
                <FlatList
                    horizontal={true}
                    data={product.images}
                    renderItem={({ item }) =>

                        <Image style={styles.Image} source={{ uri: item }} />
                    }
                    showsHorizontalScrollIndicator={false}

                />
                <View style={styles.TitleContainer}>
                    <View>
                        <Text style={styles.Title}>{product.title}</Text>
                        <View style={styles.RatingContainer}>
                            <Image source={require('../assets/icon/star.png')} style={styles.RatingIcon} />
                            <Text style={styles.Rating}>{product.rating}</Text>
                        </View>
                    </View>
                    <Text style={styles.Price} >$ {product.price}</Text>
                </View>
                <View style={[styles.DescriptionContainer, showDecription && {
                    borderBottomWidth: 1,
                    borderBottomColor: '#3131332b',
                }]}>
                    <Text style={styles.DescriptionTitle}>Description</Text>
                    <TouchableOpacity onPress={() => setShowDecription(!showDecription)}>
                        {
                            showDecription ?
                                <Image source={require('../assets/icon/ArrowDown.png')} /> :
                                <Image source={require('../assets/icon/ArrowLeft.png')} />
                        }
                    </TouchableOpacity>
                </View>
                {

                    showDecription && <Text style={styles.Description}>{product.description}</Text>
                }



                <View style={[styles.DescriptionContainer, , showSimilarProduct && {
                    borderBottomWidth: 1,
                    borderBottomColor: '#3131332b',
                }]}>
                    <Text style={[styles.DescriptionTitle]}>Similar Product</Text>
                    <TouchableOpacity onPress={() => setShowSimilarProduct(!showSimilarProduct)}>
                        {
                            showSimilarProduct ?
                                <Image source={require('../assets/icon/ArrowDown.png')} /> :
                                <Image source={require('../assets/icon/ArrowLeft.png')} />
                        }
                    </TouchableOpacity>
                </View>
                {
                    showSimilarProduct && <FlatList
                        style={styles.SimilarProduct}
                        horizontal={true}
                        data={similarProduct}
                        renderItem={({ item, index }) =>
                            <View style={{ padding: 5 }}>
                                <ProductItem key={index} product={item} />
                            </View>
                        }
                        showsHorizontalScrollIndicator={false}

                    />
                }



            </ScrollView >
            <View style={styles.AddToCartBtnContainer}>
                <TouchableOpacity style={styles.AddToCartBtn} onPress={() => { }}>
                    <Text style={styles.AddToCartText}>Add To Cart</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default ProductInfor

const styles = StyleSheet.create({
    AddToCartBtnContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        width: Dimensions.get('window').width,

    },
    AddToCartText: {
        color: '#ffffff',
    },
    AddToCartBtn: {
        height: 70,
        width: 0.8 * Dimensions.get('window').width,
        backgroundColor: '#343434',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30

    },
    SimilarProduct: {
        marginVertical: 15,
        marginHorizontal: 10,
    },
    Description: {
        marginVertical: 15,
        marginHorizontal: 10,
        fontSize: 12,
        color: '#555151'
    },
    DescriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,

        borderTopColor: '#3131332b',
        marginHorizontal: 10,
        paddingVertical: 20,
        marginVertical: 5

    },
    DescriptionTitle: {
        fontSize: 20,
        fontWeight: '400',
        height: 25,
        width: 200,
    },
    TitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    Title: {
        marginHorizontal: 10,
        fontSize: 20,
        fontWeight: '231',
        height: 25,
        width: 200
    },
    RatingContainer: {
        flexDirection: 'row',

    },
    Rating: {
        fontSize: 15,
    },

    RatingIcon: {
        height: 15,
        width: 15,
        marginHorizontal: '5%'
    },
    Price: {
        marginHorizontal: 30,
        fontSize: 26,
        fontWeight: 'bold'
    },
    Image: {
        width: Dimensions.get('window').width,

        height: 0.45 * Dimensions.get('window').height,
        resizeMode: 'contain'
    }
})