import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import NavigationHeader from '../components/NavigationHeader'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { projectRoot } from '../../metro.config'

const CheckoutScreen = ({ route }) => {

  const [firstName, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [Address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const navigator = useNavigation()
  const [inputTextColor, setInputTextColor] = useState('#C8C7CC')





  const DeleteProducts = async () => {
    route.params.products.map(async (product) => {
      

      await axios.delete('https://api.escuelajs.co/api/v1/products/' + product.id)
        .then(response => {
          console.log('delete successful:');
        })
        .catch(error => {
          consconsole.log('Error deleting:', error);
        });
    })

  }


  const CreateNewOrder = async () => {
    const url = 'https://api.escuelajs.co/api/v1/categories/';
    const name = String(((Math.random() * (10 - 1) + 1) * 1000).toFixed());
    await axios.post(url, {
      "name": 'NewCategoryLam#' + name + '/' + Address,
      "image": "https://placeimg.com/640/480/any" + String(((Math.random() * (10 - 1) + 1) * 10000000).toFixed())
    })
      .then(response => {
        console.log('Create successful:');
        AddProductInOrder(response.data.id, name)
      })
      .catch(error => {
        consconsole.log('Error creating:', error);
      });
  }
  const AddProductInOrder = async (id, name) => {
    // const product = route.params.products[0]

    route.params.products.map(async (product) => {
      const url = 'https://api.escuelajs.co/api/v1/products/'
      await axios.post(url, {
        "title": name + product.title,
        "price": product.price,
        "description": product.description,
        "categoryId": id,
        "images": product.images
      })
        .then(response => {
          navigator.navigate('OrderCompleted')


        })
        .catch(error => {
          console.log('Error adding:', error);
        });


    })
  }
  const Order = async () => {

    if (firstName === '' || lastname === '' || Address === '' || phoneNumber === '') {
      setInputTextColor('red')
      setTimeout(() => {
        setInputTextColor('#C8C7CC')
      }, 2000);
    } else {



      DeleteProducts()


      CreateNewOrder();

      // setTimeout(() => {

      //   AddProductInOrder(id)
      // }, 3000);




    }
  }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ height: 1000 }}>
          <NavigationHeader title={'Check out'} rightIcon={require('../assets/icon/Back.png')} />
          <View style={styles.ImageContainer}>
            <Image source={require('../assets/image/shipping.png')} />
          </View>
          <Text style={styles.ShippingText}>
            shipping
          </Text>

          <TextInput placeholder='First name...' placeholderTextColor={inputTextColor} plaho style={styles.Input} onChangeText={(value) => setFirstName(value)} />
          <TextInput placeholder='Last name...' placeholderTextColor={inputTextColor} style={styles.Input} onChangeText={(value) => setLastName(value)} />
          <TextInput placeholder='Address...' placeholderTextColor={inputTextColor} style={styles.Input} onChangeText={(value) => setAddress(value)} />
          <TextInput inputMode='numeric' placeholder='Phone number...' placeholderTextColor={inputTextColor} style={styles.Input} onChangeText={(value) => setPhoneNumber(value)} />
        </View>
      </ScrollView>

      <View style={styles.BtnContainer}>
        <TouchableOpacity style={styles.Buttom} onPress={() => Order()}>
          <Text style={styles.BtnText}>Place my order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
  BtnContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    width: Dimensions.get('window').width,

  },
  BtnText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  Buttom: {
    height: 60,
    width: '80%',
    backgroundColor: '#343434',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row'

  },
  Input: {
    borderBottomColor: '#c8c7cc4d',
    borderBottomWidth: 1,
    height: 60,
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: 20,
  },
  ImageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },
  ShippingText: {
    fontSize: 30,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20
  }
})