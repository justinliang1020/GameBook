import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";

const Stack = createStackNavigator();

function CustomHeader() {
    return (
        <View style={{
            flexDirection: "row",

        }}>
            <View>
                <Text style={styles.title}>
                    Welcome to your Gamebook!
                </Text>
            </View>

            <Image style={{ width: 30, height: 30, marginHorizontal: 40 }}
                source={require("../../assets/profile.png")} />
        </View>
    )
}

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: (props) => <CustomHeader {...props} />,
                    headerStyle: {
                        backgroundColor: "#4786e7",
                        height: 125
                    },
                }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 25,
    }
})