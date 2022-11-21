import { Pressable, Text, View, Image, SafeAreaView, FlatList, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from "react";
import styles from "./styles"


export default function Game({ route, navigation }) {
    // sample data -----
    const review1 = {
        id: 1,
        text: "Portal is great on the xbox",
        username: "Justin",
        gameId: 1,
        platform: "xbox-series-x",
        rating: 4.5
    }
    const review2 = {
        id: 2,
        text: "Portal is great on the switch",
        username: "Justin",
        gameId: 1,
        platform: "nintendo-switch",
        rating: 3
    }
    // -------------

    const { game } = route.params
    function getReviews(gameId) {
        // change for API
        return [review1, review2]
    }
    const reviews = getReviews(1);
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
    
    // data
    const parentPlatforms = [];
    for (const platform of game.platforms) {
        const parent = platformsToParents[platform];
        if (parentPlatforms.indexOf(parent) === -1) {
            parentPlatforms.push(parent);
        }
    }

    const reviewsByParent = {}
    for (const review of reviews) {
        const platform = review["platform"];
        const parent = platformsToParents[platform]

        if (!(parent in reviewsByParent)) {
            reviewsByParent[parent] = []
        }
        reviewsByParent[parent].push(review)
    }

    const [selectedParent, setSelectedParent] = useState(null);

    // render items
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
                active={active}
            />
        );
    };

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
                switch (selectedParent) {
                    case "xbox":
                        return <Text>Xbox series x rating: {game.ratings['xbox-series-x']}, xbox one rating: {game.ratings['xbox-one']}</Text>
                    case "playstation":
                        return <Text>Playstation 5 rating: {game.ratings['playstation5']}, Playstation 4 rating: {game.ratings['playstation4']}</Text>
                    case "nintendo-switch":
                        return <Text>Nintendo Switch rating: {game.ratings['nintendo-switch']}</Text>
                    case "pc":
                        return <Text>PC rating: {game.ratings['pc']}</Text>
                    default:
                        return <Text>Select a platform</Text>
                }
            })()}
            {selectedParent &&
            <FlatList
                data={reviewsByParent[selectedParent]}
                renderItem={({ item }) => <View><Text>{item.text}</Text></View>}
                horizontal
            />}
            
        </View>
    )
}