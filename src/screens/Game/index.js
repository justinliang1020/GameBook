import { Pressable, Text, View, Image } from 'react-native';

export default function Game({ route, navigation }) {
    const { game } = route.params
    platformParents = {
        
    }
    // const reviews = getReviews();
    const reviews = [
        {id: 1, text: "This is the description of the review", username: "Justin", gameId: 1, platform: "xbox-series-x", gameplay_rating: 8, performance_rating: 9, fun_rating: 7}
    ]
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