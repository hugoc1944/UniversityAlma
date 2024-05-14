import { View, Text } from 'react-native'
import  {React, useState} from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart'
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell'
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus'

import HomePage from '../pages/HomePage'
import Favorites from '../pages/Favorites'
import Notifications from '../pages/Notifications'
import Settings from '../pages/Settings'
import CoursePage from '../pages/CoursePage'
import Publish from '../pages/Publish'
import { useAdditionalButton } from '../../contexts/AdditionalButtonProvider'

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
    height: 70
  }
}

export default function Navbar() {
  const {showButton} = useAdditionalButton();

  console.log(showButton);

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
          { showButton &&
            <Tab.Screen 
            name="Publish" 
            component={Publish}
            options={{
            tabBarIcon: ({focused})=>{
                  return(
                    <View style={{alignItems:"center",justifyContent:"center",bottom: 21}}>
                      <FontAwesomeIcon size={60} icon={faCirclePlus} color={"#C2A5F7"}/>
                    </View>
                  )
              }
          }}/>
          }
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
        </Tab.Navigator>
      </NavigationContainer>
  )
}