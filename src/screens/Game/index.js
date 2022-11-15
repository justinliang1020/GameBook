import { Pressable, Text, View, Image } from 'react-native';

export default function Game({ route, navigation }) {
    const { gameName } = route.params
    return (
        <View>
            <Text>Hello Game: {gameName}</Text>
        </View>
    )
}