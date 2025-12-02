import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import TabBar from './src/components/TabBar';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';

const App = () => {
  const Stack = createStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Trang chủ' }}
        />
        <Stack.Screen 
          name="TabMain" 
          component={TabBar}
          options={{ headerShown: false }} // Ẩn header cho TabBar
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})