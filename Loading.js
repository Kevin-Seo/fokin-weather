import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = "5aeb6b7c28c087b895de73b09a19f139";

export default function Loading() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied!');
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('location : ' + location);
      // setLocation(location);

      let { coords } = location;
      let { latitude } = coords;
      let { longitude } = coords;
      console.log('coords : ' + coords);
      console.log('latitude : ' + latitude);
      console.log('longitude : ' + longitude);
      getWeather(latitude, longitude);
    })();
  }, []);

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    console.log(data);
    setLocation(data);
  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingVertical: 100,
    backgroundColor: '#FDF6AA',
  },
  text: {
    color: '#2c2c2c',
    fontSize: 20,
  },
})
 