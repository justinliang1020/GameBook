import { Pressable, Text, View, Image } from 'react-native';
import styles from './styles'
import { useNavigation } from '@react-navigation/native';

export default function CarouselItem(props) {
    const game = props.game; // TODO: change name
    const navigation = useNavigation();
    const goToGamePage = () => {
        navigation.navigate("Game", { game: game });
    }
    return (
        <Pressable onPress={goToGamePage}>
            <View style={styles.container}>
                <Image
                    style={styles.gameCover}
                    source={{ uri: game.imageUrl }}
                />
                <Text>{game.name}</Text>
            </View>
        </Pressable>
    )
}