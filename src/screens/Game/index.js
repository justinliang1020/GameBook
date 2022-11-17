import { Pressable, Text, View, Image, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from "react";
import styles from "./styles"


export default function Game({ route, navigation }) {
    const { game } = route.params
    const parentPlatformImages = {
        "xbox": {
            active: require('../../../assets/xbox-active.png'),
            inactive: require('../../../assets/xbox-inactive.png')
        },
        "playstation": {
            active: require('../../../assets/playstation-active.png'),
            inactive: require('../../../assets/playstation-inactive.png')
        },
        "nintendo-switch": {
            active: require('../../../assets/nintendo-switch-active.png'),
            inactive: require('../../../assets/nintendo-switch-inactive.png')
        },
        "pc": {
            active: require('../../../assets/steam-active.png'),
            inactive: require('../../../assets/steam-inactive.png')
        }
    }
    // pc, xbox-one, xbox-series-x, playstation4, playstation5, nintendo-switch

    const platformsToParents = {
        "pc": "pc",
        "xbox-one": "xbox",
        "xbox-series-x": "xbox",
        "playstation4": "playstation",
        "playstation5": "playstation",
        "nintendo-switch": "nintendo-switch"
    };
    const parentsToPlatforms = {
        "pc": "pc",
        "xbox": ["xbox-one", "xbox-series-x"],
        "playstation": ["playstation4", "playstation5"],
        "nintendo-switch": "nintendo-swith"
    }
    // const reviews = getReviews();
    const reviews = [
        { id: 1, text: "This is the description of the review", username: "Justin", gameId: 1, platform: "xbox-series-x", gameplay_rating: 8, performance_rating: 9, fun_rating: 7 }
    ];

    const parentPlatforms = [];

    for (const platform of game.platforms) {
        parentPlatforms.push(platformsToParents[platform]) // only add to array if doesn't exist
    }

    const DATA = [
        {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
          title: "First Item",
        },
        {
          id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
          title: "Second Item",
        },
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d72",
          title: "Third Item",
        },
      ];

    const Item = ({ item, onPress, active }) => (
        <TouchableOpacity onPress={onPress}>
            <Image source={parentPlatformImages[item][active]}></Image>
        </TouchableOpacity>
            
    );
    const renderItem = ({ item }) => {
        // const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
        // const color = item.id === selectedId ? 'white' : 'black';
        const active = item === selectedParent ? "active" : "inactive";

        return (
            <Item
                item={item}
                onPress={() => setSelectedParent(item)}
                active={ active }
            />
        );
    };
    const [selectedId, setSelectedId] = useState(null);
    const [selectedParent, setSelectedParent] = useState(null);


    return (
        <View>
            <Text>Title: {game.name}</Text>
            <Text>Description: {game.description}</Text>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={parentPlatforms}
                    renderItem={renderItem}
                    horizontal
                />
            </SafeAreaView>
            <Text>Rating of {selectedParent}</Text>
            <Text>Reviews of {selectedParent}</Text>
        </View>
    )
}