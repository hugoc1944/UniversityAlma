import { View, Text } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart'
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell'
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear'

import HomePage from '../pages/HomePage'
import Favorites from '../pages/Favorites'
import Notifications from '../pages/Notifications'
import Settings from '../pages/Settings'
import CoursePage from '../pages/CoursePage'
import PopUp from './PopUp'
import UploadPage from '../pages/UploadPage'

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
    height: 70
  }
}

export default function Navbar() {
  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen 
          name="Home" 
          component={HomePage}
          options={{
            tabBarIcon: ({focused})=>{
                return(
                  <View style={{alignItems:"center",justifyContent:"center"}}>
                    <FontAwesomeIcon size={28} icon={faHouse} color={focused ? "#C2A5F7" : "#DDCFF7"}/>
                  </View>
                )
            }
          }}/>
          <Tab.Screen 
          name="Favorites" 
          component={Favorites}
          options={{
            tabBarIcon: ({focused})=>{
                return(
                  <View style={{alignItems:"center",justifyContent:"center"}}>
                    <FontAwesomeIcon size={28} icon={faHeart} color={focused ? "#C2A5F7" : "#DDCFF7"}/>
                  </View>
                )
            }
          }}/>
          <Tab.Screen 
          name="Notifications" 
          component={Notifications}
          options={{
            tabBarIcon: ({focused})=>{
                return(
                  <View style={{alignItems:"center",justifyContent:"center"}}>
                    <FontAwesomeIcon size={28} icon={faBell} color={focused ? "#C2A5F7" : "#DDCFF7"}/>
                  </View>
                )
            }
          }}/>
          <Tab.Screen 
          name="Settings" 
          component={Settings}
          options={{
            tabBarIcon: ({focused})=>{
                return(
                  <View style={{alignItems:"center",justifyContent:"center"}}>
                    <FontAwesomeIcon size={28} icon={faGear} color={focused ? "#C2A5F7" : "#DDCFF7"}/>
                  </View>
                )
            }
          }}
          />
          <Tab.Screen 
  name="CoursePage" 
  component={CoursePage} 
  options={{
    tabBarButton: () => null // This hides the tab bar button for CoursePage
  }} 
/>
          <Tab.Screen 
  name="UploadPage" 
  component={UploadPage} 
  options={{
    tabBarButton: () => null // This hides the tab bar button for CoursePage
  }} 
/>
        </Tab.Navigator>
      </NavigationContainer>
  )
}