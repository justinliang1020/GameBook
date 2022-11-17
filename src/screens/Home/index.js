import { Text, View, FlatList } from 'react-native';
import styles from './styles'
import CarouselItem from '../../components/CarouselItem';

export default function HomeScreen({ navigation }) {
  const sampleData1 = [
    {
      name: "Portal 2",
      gameId: 1,
      imageUrl: 'https://www.mobygames.com/images/covers/l/217599-portal-2-macintosh-front-cover.jpg',
      description: "Portal 2 is a fun puzzle game developed by Valve.",
      platforms: ['playstation5', 'playstation4', 'xbox-series-x', 'xbox-one', 'nintendo-switch', 'pc'],
      ratings: {
        'playstation5': 5,
        'playstation4': 3.4,
        'xbox-series-x': 4,
        'xbox-one': 4.5,
        'nintendo-switch': 3,
      }
    },
    { name: "Apex Legends", imageUrl: 'https://www.mobygames.com/images/covers/l/538006-apex-legends-xbox-one-front-cover.jpg' },
    { name: "Elden Ring", imageUrl: 'https://www.mobygames.com/images/covers/l/775869-elden-ring-xbox-one-front-cover.jpg' },
    { name: "Half-Life 2", imageUrl: "https://www.mobygames.com/images/covers/l/38738-half-life-2-windows-front-cover.jpg" }
  ]
  const sampleData2 = [
    { name: "Animal Crossing", imageUrl: 'https://www.mobygames.com/images/covers/l/630842-animal-crossing-new-horizons-nintendo-switch-front-cover.png' },
    { name: "Mario Kart 8", imageUrl: 'https://www.mobygames.com/images/covers/l/399425-mario-kart-8-deluxe-nintendo-switch-front-cover.jpg' },
    { name: "Splatoon 2", imageUrl: 'https://www.mobygames.com/images/covers/l/416101-splatoon-2-nintendo-switch-front-cover.jpg' },
    { name: "Overcooked 2", imageUrl: "https://www.mobygames.com/images/covers/l/487451-overcooked-2-windows-apps-front-cover.jpg" }
  ]
  function getGameList(category) {
    switch (category) {
      case "rated":
        return sampleData1;
      case "trending":
        return sampleData2;
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Top Rated Cross Platform Games</Text>
      <FlatList
        data={getGameList("rated")}
        renderItem={({ item }) => <CarouselItem game={item} />}
        horizontal
      />
      <Text style={styles.subTitle}>Trending Games on Your Platforms</Text>
      <FlatList
        data={getGameList("trending")}
        renderItem={({ item }) => <CarouselItem game={item} />}
        horizontal
      />
      <Text style={styles.subTitle}>Popular Games in October</Text>

    </View>
  );
}
