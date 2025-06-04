import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductItem from '../components/ProductItem'
import axios from 'axios'
import NavigationHeader from '../components/NavigationHeader'
import { useContextState } from '../Contexts/StateContext'

const ProductInfor = ({ route }) => {
    const { state, dispatch } = useContextState()


    const product = (route.params.product)
    const [similarProduct, setSimilarProduct] = useState([])
    const [showDecription, setShowDecription] = useState(false)
    const [showSimilarProduct, setShowSimilarProduct] = useState(true)
    const [flat1, SetFlat1] = useState(true)





    useEffect(() => {

        const url = 'https://dummyjson.com/products/category/' + product.category
        axios.get(url)
            .then(function (response) {
                const data = []
                response.data.products.map((item) => {
                    item.title !== product.title && data.length < 5 && data.push(item)
                })

                setSimilarProduct(data)


            })

            .catch(function (error) {
                // handle error
            })

    }, [product])


    const scrollViewRef = useRef(null);
    const flatListRef = useRef(null);

    const scrollToStart = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });

    };

    const scrollToEnd = () => {
        setTimeout(() => {

            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 0);

    };


    const addToCart = () => {
        let term = false;
        const url = 'https://api.escuelajs.co/api/v1/categories/' + String(state.id) + '/products'
        axios.get(url)
            .then(function (response) {
                const products = []
                response.data.map((item) => {
                    item.title.includes('LamTran') ? products.push(item) : {};

                })
                products.map((item) => {
                    if (item.title === ('LamTran' + product.title)) {
                        const url = 'https://api.escuelajs.co/api/v1/products/' + item.id
                        const quantityProductInCart = Number(item.description) + 1
                        axios.put(url, {
                            "description": String(quantityProductInCart),
                            "images": item.images
                        })
                            .then(response => {
                                console.log('Update successful:');
                                SetFlat1(!flat1)
                                dispatch({ type: 'SET_QUANTYTI', payload: state.quantityProductInCart + 1 });

                            })
                            .catch(error => {
                                consconsole.log('Error updating:', error);
                            });
                        term = true;
                        return;
                    }

                })
                if (term) return
                axios.post('https://api.escuelajs.co/api/v1/products/', {
                    "title": "LamTran" + product.title,
                    "price": product.price,
                    "description": '1',
                    "categoryId": state.id,
                    "images": [product.thumbnail]
                })
                    .then(response => {
                        console.log('add successful:');
                        SetFlat1(!flat1)
                        dispatch({ type: 'SET_QUANTYTI', payload: state.quantityProductInCart + 1 });

                    })
                    .catch(error => {
                        console.log('Error updating:', error);
                    });
            })
            .catch(function (error) {
                // handle error
                consconsole.log(error);

            })
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingBottom: 80 }}>
            <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} style={styles.container}>
                <NavigationHeader rightIcon={require('../assets/icon/Back.png')} leftIcon={require('../assets/icon/goToCart.png')} />


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
                    <TouchableOpacity onPress={() => { setShowDecription(!showDecription); scrollToEnd() }}>
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
                    <TouchableOpacity onPress={() => {
                        setShowSimilarProduct(!showSimilarProduct);
                        scrollToEnd();
                    }}>
                        {
                            showSimilarProduct ?
                                <Image source={require('../assets/icon/ArrowDown.png')} /> :
                                <Image source={require('../assets/icon/ArrowLeft.png')} />
                        }
                    </TouchableOpacity>
                </View>
                {
                    showSimilarProduct && <FlatList
                        ref={flatListRef}
                        style={styles.SimilarProduct}
                        horizontal={true}
                        data={similarProduct}
                        renderItem={({ item, index }) =>
                            <View style={{ padding: 5 }}>
                                <ProductItem key={index} product={item} action={() => scrollToStart()} />
                            </View>
                        }
                        showsHorizontalScrollIndicator={false}

                    />
                }



            </ScrollView >
            <View style={styles.BtnContainer}>
                <TouchableOpacity style={styles.Buttom} onPress={() => addToCart()}>
                    <Text style={styles.BtnText}>Add To Cart  ({state.quantityProductInCart})</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView >
    )
}

export default ProductInfor

const styles = StyleSheet.create({
    coutCart: {
        color: '#ffffff',
        fontWeight: '900'
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
        height: 70,
        width: 0.8 * Dimensions.get('window').width,
        backgroundColor: '#343434',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        flexDirection: 'row'

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