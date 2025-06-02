import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const Categories = ({ name, SetSelectedCategory, slug, selectedCategory }) => {

    useEffect(() => {
        selectedCategory === '' && SetSelectedCategory(slug)
    }, [])


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.btnContainer]}
                onPress={() => SetSelectedCategory(slug)}
            >
                <View style={[styles.iconContainer, slug === selectedCategory && styles.selected]}>
                    {
                        name === 'Womens Dresses' && <Image style={{ height: '20', width: '20', resizeMode: 'contain' }} source={require('../assets/icon/Clothes.png')} />
                    }
                    {
                        name === 'Furniture' && <Image style={{ height: '20', width: '20', resizeMode: 'contain' }} source={require('../assets/icon/Furniture.png')} />
                    }
                    {
                        name === 'Womens Shoes' && <Image style={{ height: '20', width: '20', resizeMode: 'contain' }} source={require('../assets/icon/Shoes.png')} />
                    }
                    {
                        name === 'Laptops' && <Image style={{ height: '20', width: '20', resizeMode: 'contain' }} source={require('../assets/icon/Miscellaneous.png')} />
                    }
                </View>

            </TouchableOpacity>

            {
                name === 'Womens Dresses' && <Text>Clothes</Text>
            }
            {
                name === 'Furniture' && <Text>Furniture</Text>
            }
            {
                name === 'Womens Shoes' && <Text>Shoes</Text>
            }
            {
                name === 'Laptops' && <Text>Electronics</Text>
            }

        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,
        borderColor: '#CF6212',
        borderWidth: 1,
        marginBottom: '10%'
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 34,
        width: 34,
        borderRadius: 17,


    },
    selected: {
        backgroundColor: '#CF6212'
    }
})