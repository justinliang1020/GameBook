import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateReviewScreen from "../screens/CreateReview";

const Stack = createStackNavigator();

export default function CreateReviewStack() {
    return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="Create Review"
                    component={CreateReviewScreen}
                />
            </Stack.Navigator>
    )
} 