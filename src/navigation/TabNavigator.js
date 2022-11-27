import { createBottomTabNavigator, Text } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import Ionicons from '@expo/vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: { 
                backgroundColor: '#4786e7',
                height: 80,
            },
            tabBarActiveTintColor: "White",
            tabBarInactiveTintColor: "White",
        }}>
            <Tab.Screen
                name="Home Stack"
                component={HomeStack}
                options={{
                    title: 'Home',
                    tabBarIcon: (() => {
                        return <Ionicons name="md-home" size={40} color="white" />
                    }),
                }}
            />
            <Tab.Screen
                name="Profile Stack"
                component={ProfileStack}
                options={{
                    title: 'Profile',
                    tabBarIcon: (() => {
                        return <Ionicons name="person-circle-outline" size={40} color="white" />
                    })
                }}
            />
        </Tab.Navigator>

    )
}