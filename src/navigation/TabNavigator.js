import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import Ionicons from '@expo/vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        // <Tab.Navigator screenOptions={{
        //     headerStyle: { backgroundColor: '#4786e7' },
        //     headerTitleStyle: { fontWeight: 'bold' }
        // }}>
            <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen
                name="Home Stack"
                component={HomeStack}
                options={{
                    title: 'Home',
                    tabBarIcon: (() => {
                        return <Ionicons name="md-home" size={26} />
                    })
                }}
            />
            <Tab.Screen
                name="Profile Stack"
                component={ProfileStack}
                options={{
                    title: 'Profile',
                    tabBarIcon: (() => {
                        return <Ionicons name="person-circle-outline" size={26} />
                    })
                }}
            />
        </Tab.Navigator>

    )
}