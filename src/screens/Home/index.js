import { Text, View, FlatList, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import CarouselItem from '../../components/CarouselItem';

export default function HomeScreen({ navigation }) {
  const sampleData1 = [
    {
      name: "Portal 2",
      gameId: 1,
      imageUrl: 'https://www.mobygames.com/images/covers/l/217599-portal-2-macintosh-front-cover.jpg',
      screenshotUrl: 'https://i.ytimg.com/vi/Nz2us2JOhiU/maxresdefault.jpg',
      description: "Portal 2 is a fun puzzle game developed by Valve Corporation. It is a puzzle game where you can shoot portals at walls and stuff. The cake is a lie.",
      platforms: ['playstation5', 'playstation4', 'xbox-series-x', 'xbox-one', 'nintendo-switch', 'pc'],
      ratings: {
        'playstation5': 5,
        'playstation4': 3.4,
        'xbox-series-x': 4,
        'xbox-one': 4.5,
        'nintendo-switch': 3,
        'pc': 5
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
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.subTitle}>Top Rated Cross Platform Games</Text>
          <FlatList
            data={getGameList("rated")}
            renderItem={({ item }) => <CarouselItem game={item} big/>}
            horizontal
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.subTitle}>Trending Games on Your Platforms</Text>
          <FlatList
            data={getGameList("trending")}
            renderItem={({ item }) => <CarouselItem game={item} />}
            horizontal
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.subTitle}>Trending Games on Your Platforms</Text>
          <FlatList
            data={getGameList("trending")}
            renderItem={({ item }) => <CarouselItem game={item} />}
            horizontal
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.subTitle}>Trending Games on Your Platforms</Text>
          <FlatList
            data={getGameList("trending")}
            renderItem={({ item }) => <CarouselItem game={item} />}
            horizontal
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});