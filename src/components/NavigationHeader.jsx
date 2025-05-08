import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const NavigationHeader = ({ title, rightIcon, leftIcon }) => {
    const navigator = useNavigation()
    return (
        <View style={styles.container}>
            {
                rightIcon ?
                    <TouchableOpacity onPress={() => navigator.goBack()}>
                        <Image style={styles.Icon} source={rightIcon} />
                    </TouchableOpacity> :
                    <View style={styles.Icon}></View>
            }
            <Text>{title}</Text>
            {
                leftIcon ? <Image style={styles.Icon} source={leftIcon} /> : <View style={styles.Icon}></View>
            }
        </View>
    )
}

export default NavigationHeader

const styles = StyleSheet.create({
    Icon: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        width: 36,
        resizeMode: 'stretch',
        marginHorizontal: '5%'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})