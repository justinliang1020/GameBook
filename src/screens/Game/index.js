import { Pressable, Text, View, Image } from 'react-native';

export default function Game({ route, navigation }) {
    const { game } = route.params
    platformParents = {
        
    }
    return (
        <View>
            <Text>Title: {game.name}</Text>
            <Text>Description: {game.description}</Text>
            <Text>{game.platforms}</Text>
            {/* flatlist of platforms */}
            {/* ratings */}
            {/* flatlist of reviews */}
        </View>
    )
}