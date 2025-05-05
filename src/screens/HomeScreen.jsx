import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Categories from '../components/Categories'
import axios from 'axios'

const HomeScreen = () => {
    const [categories, setcategories] = useState([])
    const [categoryImage, setCategoryImage] = useState("https://i.imgur.com/QkIa5tT.jpeg")
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('https://api.escuelajs.co/api/v1/categories')
            .then(function (response) {
                console.log(response.data);
                setcategories(response.data)
                console.log(response.data[0].image);

                setCategoryImage(response.data[0].image)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }, [])

    useEffect(() => {
        const data = []
        axios.get('https://api.escuelajs.co/api/v1/products')
            .then(function (response) {
                const data = []

                response.data.map((product) => {
                    product.category.image === categoryImage && data.push(product)
                })
                console.log(data);
                setProducts(data)


            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }, [categoryImage])

    return (
        <ScrollView>
            <SafeAreaView style={styles.Container}>
                {/* header */}
                <Text style={styles.Header} >MINI MALL</Text>

                {/* category */}
                <View style={styles.Categories}>
                    {
                        categories.map((category, index) => [1, 2, 3, 4].includes(category.id) &&
                            <Categories key={index} name={category.name} setCategoryImage={setCategoryImage} image={category.image} categoryImage={categoryImage} id={category.id} />

                        )
                    }
                </View>


                {/* image category */}
                <Image style={styles.ImageCategory} source={{ uri: categoryImage }} />


                {/* product */}

                <View style={styles.ProductContainer}>
                    <Text style={styles.ProductsHeader}>Product</Text>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'flex-end'
                    }}>
                        {
                            products.map((item, index) => <Item key={index} title={item.title} image={item.images[1]} />)
                        }
                    </View>

                </View>

            </SafeAreaView>
        </ScrollView>
    )
}

export default HomeScreen

const Item = ({ title, image }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Image style={{ height: '200', width: '200', resizeMode: 'contain' }} source={{ uri: image }} />
    </View>
);

const styles = StyleSheet.create({
    item: {
        width: '50%' // is 50% of container width
    },
    ProductsHeader: {

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
        fontSize: '20',
        fontWeight: 'bold',
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
        resizeMode: 'stretch',
        marginTop: '8%',
        borderRadius: "5%"
    }
})