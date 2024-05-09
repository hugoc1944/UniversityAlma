import { View, Text } from 'react-native'
import React from 'react'

import TopHeader from './TopHeader'

export default function Session() {
  const data = {user: "Carlos", heading: "Welcome Back"}
  return (
    <View>
      <TopHeader data={data}/>
    </View>
  )
}