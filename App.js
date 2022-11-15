import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/Home'
import TabNavigator from './src/navigation/TabNavigator';
import Router from './src/navigation/Router'

export default function App() {
  return (
    <>
      <Router />
    </>
  );
}

