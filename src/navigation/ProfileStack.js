import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/Profile";

const Stack = createStackNavigator();

export default function CreateReviewStack() {
    return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                />
            </Stack.Navigator>
    )
} 