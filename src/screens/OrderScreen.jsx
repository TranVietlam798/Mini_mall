import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavigationHeader from '../components/NavigationHeader'
import OrderItem from '../components/OrderItem'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'

const OrderScreen = () => {

  const [orders, setOrders] = useState([])
  const isFocused = useIsFocused();

  useEffect(() => {
    const url = 'https://api.escuelajs.co/api/v1/categories/'

    axios.get(url)
      .then((response) => {
        let orders = [];
        response.data.map(async (item) => {
          if (item.name.includes('NewCategoryLam')) {
            const url = 'https://api.escuelajs.co/api/v1/categories/' + item.id + '/products'
            await axios.get(url)
              .then(function (response) {

                const details = []

                response.data.map((item) => {
                  if (item.title.includes('LamTran')) {
                    details.push(item)
                  }
                })

                if (details.length > 0) {

                  orders.push({
                    name: item.name.slice('NewCategoryLam'.length, 'NewCategoryLam'.length + 5),
                    date: item.creationAt,
                    details: details,
                    trackingNumber: item.image.split('https://placeimg.com/640/480/any'),
                    quantyti: details.reduce((total, num) => total + Number(num.description), 0).toFixed(),
                    subtotal: (details.reduce((total, num) => total + num.price * Number(num.description), 0) * 0.9).toFixed(),
                    address: item.name.slice('NewCategoryLam'.length + 6)
                  })
                }
                orders.sort((a, b) => b.date.localeCompare(a.date));
                setOrders(orders)
              })
          }
        })
      })
      .catch(() => {
        consconsole.log(error);
      })
  }, [])

  return (
    <SafeAreaView>
      <NavigationHeader title={"My Orders"} />

      <ScrollView>
        <View style={{ marginBottom: 100 }}>
          <View style={styles.OrderContainer}>
            {
              orders.map((order, index) => <OrderItem
                key={index}
                name={order.name}
                date={order.date}
                quantyti={order.quantyti}
                subtotal={order.subtotal}
                trackingNumber={order.trackingNumber}
                details={order.details}
                address={order.address}
              />
              )
            }



          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  OrderContainer: {
    width: '100%',
    padding: 15,
  }
})