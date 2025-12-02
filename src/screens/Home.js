import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Màn hình Home ban đầu</Text>
      <Text style={styles.subtitle}>Nhấn nút để vào phần có Tab</Text>
      <Button 
        title='Vào TabBar' 
        onPress={() => navigation.navigate('TabMain')} 
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
})