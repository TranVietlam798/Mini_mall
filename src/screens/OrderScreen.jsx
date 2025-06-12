import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavigationHeader from '../components/NavigationHeader'
import OrderItem from '../components/OrderItem'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'


const OrderScreen = () => {

  const [orders, setOrders] = useState([])
  const isFocused = useIsFocused();

  useEffect(() => {
    const url = 'https://api.escuelajs.co/api/v1/categories/'
    let orders = [];

    axios.get(url)
      .then((response) => {
        response.data.map((item) => {
          if (item.name.includes('NewCategoryLam')) {
            const url = 'https://api.escuelajs.co/api/v1/categories/' + item.id + '/products'
            axios.get(url)
              .then((response) => {

                const details = []

                response.data.map((item) => {
                  if (item.title.includes('LamTran')) {
                    details.push(item)
                  }
                })

                if (details.length > 0) {
                  const date = item.creationAt.slice(0, '2025-05-30T0000000000000'.length).split('T')
                  const day = date[0].split('-').reverse().join('/')
                  const timeArr = date[1].split(':')
                  const time = [(Number(timeArr[0]) + 7), timeArr[1]].join(':')
                  orders.push({
                    name: item.name.slice('NewCategoryLam'.length, 'NewCategoryLam'.length + 5),
                    date: time + '  ' + day,
                    creationAt: item.creationAt,
                    details: details,
                    trackingNumber: item.image.split('https://placeimg.com/640/480/any'),
                    quantyti: details.reduce((total, num) => total + Number(num.description), 0).toFixed(),
                    subtotal: (details.reduce((total, num) => total + num.price * Number(num.description), 0)).toFixed(),
                    address: item.name.slice('NewCategoryLam'.length + 6)
                  })
                }
                orders.sort((a, b) => b.creationAt.localeCompare(a.creationAt));

              })
          }
        })
      })
      .catch(() => {
        consconsole.log(error);
      })
    setTimeout(() => {
      setOrders(orders)
    }, 1500);

  }, [isFocused])

  return (
    <SafeAreaView>
      <NavigationHeader title={"My Orders"} />

      <ScrollView showsVerticalScrollIndicator={false}>
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