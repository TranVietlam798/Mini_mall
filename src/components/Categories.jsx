import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const Categories = ({ name, setCategoryImage, image, categoryImage }) => {


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.btnContainer]}
                onPress={() => setCategoryImage(image)}
            >
                <View style={[styles.iconContainer, image === categoryImage && styles.selected]}>
                    {
                        name === 'Clothes' && <Image style={{ height: '20', width: '20', resizeMode: 'contain' }} source={require('../assets/icon/Clothes.png')} />
                    }
                    {
                        name === 'Furniture' && <Image style={{ height: '20', width: '20', resizeMode: 'contain' }} source={require('../assets/icon/Furniture.png')} />
                    }
                    {
                        name === 'Shoes' && <Image style={{ height: '20', width: '20', resizeMode: 'contain' }} source={require('../assets/icon/Shoes.png')} />
                    }
                    {
                        name === 'nuevo' && <Image style={{ height: '20', width: '20', resizeMode: 'contain' }} source={require('../assets/icon/Miscellaneous.png')} />
                    }
                </View>

            </TouchableOpacity>
            <Text>{name}</Text>

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
        borderColor: '#00000051',
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
        borderColor: '#00000051',
        borderWidth: 1,
        backgroundColor: '#0000002d'
    }
})