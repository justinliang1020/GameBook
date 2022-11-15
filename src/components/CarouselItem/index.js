import { Pressable, Text, View, Image } from 'react-native';
import styles from './styles'
import { useNavigation } from '@react-navigation/native';

export default function CarouselItem(props) {
    const post = props.post; // TODO: change name
    const navigation = useNavigation();
    const goToGamePage = () => {
        navigation.navigate("Game", { gameName: post.name });
    }
    return (
        <Pressable onPress={goToGamePage}>
            <View style={styles.container}>
                <Image
                    style={styles.gameCover}
                    source={{ uri: post.imageUrl }}
                />
                <Text>{post.name}</Text>
            </View>
        </Pressable>
    )
}