import { Pressable, Text, View, Image, SafeAreaView, FlatList, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from "react";
import styles from "./styles"


export default function Game({ route, navigation }) {
    const { game } = route.params
    const review1 = {
        id: 1,
        text: "Portal is great on the xbox",
        username: "Justin",
        gameId: 1,
        platform: "xbox-series-x",
        rating: 4.5
    }
    function getReviews(gameId) {
        return [review1]
    }
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
        const parent = platformsToParents[platform];
        if (parentPlatforms.indexOf(parent) === -1) {
            parentPlatforms.push(parent);
        }
    }

    const ParentItem = ({ item, onPress, active }) => (
        <TouchableOpacity onPress={onPress}>
            <Image source={parentPlatformImages[item][active]}></Image>
        </TouchableOpacity>
            
    );
    const renderParentItem = ({ item }) => {
        const active = item === selectedParent ? "active" : "inactive";

        return (
            <ParentItem
                item={item}
                onPress={() => setSelectedParent(item)}
                active={ active }
            />
        );
    };
    const [selectedParent, setSelectedParent] = useState(null);


    return (
        <View>
            <Text>Title: {game.name}</Text>
            <Text>Description: {game.description}</Text>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={parentPlatforms}
                    renderItem={renderParentItem}
                    horizontal
                />
            </SafeAreaView>
            {(() => {
                switch(selectedParent) {
                    case "xbox":
                        return <Text>Xbox series x rating: {game.ratings['xbox-series-x']}, xbox one rating: {game.ratings['xbox-one']}</Text>
                    case "playstation":
                        return
                }
            })()}
            <Text>Reviews of {selectedParent}</Text>
        </View>
    )
}