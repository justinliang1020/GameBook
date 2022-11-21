import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";

const Stack = createStackNavigator();

function CustomHeader() {
    // #4786e7
    return (
        <View style={{
            flexDirection: "row"
        }}>
            <Text>
                meow
            </Text>
            <Text>
                meow
            </Text>
        </View>
    )
}

export default function HomeStack() {
    return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerTitle: (props) => <CustomHeader {...props} /> }}
                />
            </Stack.Navigator>
    )
}