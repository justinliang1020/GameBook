import React from "react"
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import Game from "../screens/Game";

const Stack = createStackNavigator();

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={"Home"}
                    component={TabNavigator}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={"Game"}
                    component={Game}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}