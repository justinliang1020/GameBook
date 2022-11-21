import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import CreateReviewStack from "./CreateReviewStack";
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
                name="Create Review Stack"
                component={CreateReviewStack}
                options={{
                    title: 'Create Review',
                    tabBarIcon: (() => {
                        return <Ionicons name="md-add-circle" size={26} />
                    })
                }}
            />
        </Tab.Navigator>

    )
}