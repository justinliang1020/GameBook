import { Pressable, Text, View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CarouselItem(props) {
    const game = props.game; // TODO: change name
    const big = props.big;
    const navigation = useNavigation();
    const goToGamePage = () => {
        navigation.navigate("Game", { game: game });
    }
    return (
        <Pressable onPress={goToGamePage}>
            <View style={styles.container}>
                <Image
                    style={big ? styles.bigGameImage : styles.gameImage}
                    source={{ uri: game.imageUrl }}
                />

            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    gameImage: {
        width: 150,
        height: 200,
    },
    bigGameImage: {
        width: 180,
        height: 240,
    },
    container: {
        padding: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    }
})