import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { useLinkBuilder } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Ex from '../screens/Ex';

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Detail" component={Detail} />
      <Tab.Screen name="Ex" component={Ex} />
    </Tab.Navigator>
  );
};

export default TabBar;

export function MyTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
    const [dimensions, setDimensions] = useState({height: 20, width: 100});

    const buttonWidth = dimensions.width / state.routes.length;

    const onTabbarLayout = (event) => {
        setDimensions({
            height: event.nativeEvent.layout.height,
            width: event.nativeEvent.layout.width,
        });
    }
    const tabPositionX = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(()=>{
        return{
            transform:[{translateX:tabPositionX.value}]
        }
    })
  return (
    <View style={styles.tabbar} onLayout={onTabbarLayout}>
        <Animated.View style={[{
            position:'absolute',
            backgroundColor:colors.primary,
            borderRadius:30,
            marginHorizontal:12,
            height: dimensions.height - 15,
            width: buttonWidth - 25
        }, animatedStyle]}/>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
            tabPositionX.value = withSpring(buttonWidth * index,{duration:500});
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        const scale = useSharedValue(0);
        useEffect(() => {
          scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0): isFocused,{duration:350,});
        }, [scale, isFocused]);

        const animatedTeStyle = useAnimatedStyle(()=>{
            const opacity = interpolate(scale.value,[0,1],[1,0]);
            return{
                opacity
            }
        })
        const animatedIconStyle = useAnimatedStyle(()=>{
            const scaleValue = interpolate(scale.value,[0,1],[1,1.2]);
            const top = interpolate(scale.value,[0,1],[0,9]);
            return{
                transform:[{scale:scaleValue}],
                top
            }
        })

  const getIconSource = () => {
          switch (route.name) {
            case 'HomeScreen':
              return require('../assets/images/house.png');
            case 'QrScan':
              return require('../assets/images/qrcode.png');
            case 'DetailScreen':
              return require('../assets/images/detail.png');
            default:
              return require('../assets/images/house.png');
          }
        }

        return (
          <TouchableOpacity
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            <Animated.Image
              source={require('../assets/images/house.png')}
              style={[{
                tintColor: isFocused ? '#fff' : colors.text,
                width: 24,
                height: 24,
              }, animatedIconStyle]}
            />
            <Animated.Text style={[{ color: isFocused ? colors.primary : colors.text,fontSize:12 }, animatedTeStyle]}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 80,
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
