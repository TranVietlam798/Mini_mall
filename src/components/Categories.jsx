import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const Categories = ({ name, setCategoryImage, image, categoryImage, id }) => {


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.btnContainer]}
                onPress={() => setCategoryImage(image)}
            >
                <View style={[styles.iconContainer, image === categoryImage && styles.selected]}>
                    {
                        id == 1 && <Image style={{ height: '20', width: '20', resizeMode: 'contain' }} source={require('../assets/icon/Clothes.png')} />
                    }
                    {
                        id === 3 && <Image style={{ height: '20', width: '20', resizeMode: 'contain' }} source={require('../assets/icon/Furniture.png')} />
                    }
                    {
                        id === 4 && <Image style={{ height: '20', width: '20', resizeMode: 'contain' }} source={require('../assets/icon/Shoes.png')} />
                    }
                    {
                        id === 2 && <Image style={{ height: '20', width: '20', resizeMode: 'contain' }} source={require('../assets/icon/Miscellaneous.png')} />
                    }
                </View>

            </TouchableOpacity>

            {
                id == 1 && <Text>Clothes</Text>
            }
            {
                id === 3 && <Text>Furniture</Text>
            }
            {
                id === 4 && <Text>Shoes</Text>
            }
            {
                id === 2 && <Text>Electronics</Text>
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