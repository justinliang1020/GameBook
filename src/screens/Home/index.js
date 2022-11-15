import { Text, View, FlatList } from 'react-native';
import styles from './styles'
import CarouselItem from '../../components/CarouselItem';

export default function HomeScreen({ navigation }) {
  const sampleData1 = [
    { name: "Portal 2", imageUrl: 'https://www.mobygames.com/images/covers/l/217599-portal-2-macintosh-front-cover.jpg'},
    { name: "Apex Legends", imageUrl: 'https://www.mobygames.com/images/covers/l/538006-apex-legends-xbox-one-front-cover.jpg'},
    { name: "Elden Ring", imageUrl: 'https://www.mobygames.com/images/covers/l/775869-elden-ring-xbox-one-front-cover.jpg'},
    { name: "Half-Life 2", imageUrl: "https://www.mobygames.com/images/covers/l/38738-half-life-2-windows-front-cover.jpg"}
  ]
  const sampleData2 = [
    { name: "Animal Crossing", imageUrl: 'https://www.mobygames.com/images/covers/l/630842-animal-crossing-new-horizons-nintendo-switch-front-cover.png'},
    { name: "Mario Kart 8", imageUrl: 'https://www.mobygames.com/images/covers/l/399425-mario-kart-8-deluxe-nintendo-switch-front-cover.jpg'},
    { name: "Splatoon 2", imageUrl: 'https://www.mobygames.com/images/covers/l/416101-splatoon-2-nintendo-switch-front-cover.jpg'},
    { name: "Overcooked 2", imageUrl: "https://www.mobygames.com/images/covers/l/487451-overcooked-2-windows-apps-front-cover.jpg"}
  ]
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Top Rated Cross Platform Games</Text>
      <FlatList
        data={sampleData1}
        renderItem={({item}) => <CarouselItem post={item}/>}
        horizontal
      />
      <Text style={styles.subTitle}>Trending Games on Your Platforms</Text>
      <FlatList
        data={sampleData2}
        renderItem={({item}) => <CarouselItem post={item}/>}
        horizontal
      />
      <Text style={styles.subTitle}>Popular Games in October</Text>

    </View>
  );
}
