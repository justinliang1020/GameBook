import { Pressable, Modal, Text, View, Image, SafeAreaView, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import React, { useState } from "react";

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
        text: "Portal is also fun on the xbox",
        username: "Bob",
        gameId: 1,
        platform: "xbox-series-x",
        rating: 4.5
    }
    const review3 = {
        id: 3,
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
        return [review1, review2, review3]
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
        "pc": ["pc"],
        "xbox": ["xbox-one", "xbox-series-x"],
        "playstation": ["playstation4", "playstation5"],
        "nintendo-switch": ["nintendo-switch"]
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
    const [modalVisible, setModalVisible] = useState(false);

    // render items
    const ParentItem = ({ item, onPress, active }) => (
        <TouchableOpacity onPress={onPress}>
            <Image style={styles.platformItem} source={parentPlatformImages[item][active]}></Image>
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

    const PlatformRatings = ({ }) => (
        <View>
            <View style={styles.ratingsList}>
                <Text>Gamebook Scores</Text>
                <FlatList
                    data={parentsToPlatforms[selectedParent]}
                    renderItem={({ item }) => (
                        <View style={styles.ratingsItem}>
                            <Text>{item}</Text>
                            <Text>{game.ratings[item]}</Text>
                        </View>
                    )}
                    horizontal
                    contentContainerStyle={styles.platformContentContainer}
                    scrollEnabled={false}
                />
            </View>

            <FlatList
                data={reviewsByParent[selectedParent]}
                renderItem={({ item }) => (
                    <View style={styles.reviewContainer}>
                        <Text>{item.username}</Text>
                        <Text>{item.text}</Text>
                        <Text>Rating: {item.rating}</Text>
                    </View>
                )}
                horizontal
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.backgroundContainer}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{game.name}</Text>
                {!selectedParent && <Text style={styles.description}>{game.description}</Text>}
                {!selectedParent && <Text style={styles.instructionText}>Select a platform to see reviews:</Text>}
                <View style={styles.container}>
                    <FlatList style={styles.platformSelector}
                        data={parentPlatforms}
                        renderItem={renderParentItem}
                        horizontal
                        contentContainerStyle={styles.platformContentContainer}
                        scrollEnabled={false}
                    />
                </View>
                {selectedParent ? <PlatformRatings /> : <Image source={{ uri: game.screenshotUrl }} style={styles.screenshot} resizeMode="contain" />}
            </View>
            <View style={styles.reviewButtonContainer}>
                <Button
                    onPress={() => setModalVisible(true)}
                    title="hello"

                />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: "#4786e7",
        width: "100%",
        height: "100%",
    },
    title: {
        fontSize: 36,
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "bold",
        marginVertical: 30,
    },
    description: {
        fontSize: 18,
        textAlign: "center",
        color: "#ffffff",
        marginHorizontal: 10,
    },
    instructionText: {
        fontsize: 25,
        textAlign: "center",
        color: "#ffffff",
        marginTop: 20,
    },
    platformSelector: {
        backgroundColor: "#ffffff",
        marginHorizontal: 80,
        marginVertical: 15,
    },
    platformContentContainer: {
        justifyContent: "center",
        flexGrow: 1,
    },
    platformItem: {
        marginHorizontal: 10,
    },
    screenshot: {
        flex: 1,
        marginHorizontal: 25,
    },
    ratingsItem: {
        marginHorizontal: 15,

    },
    ratingsList: {
        backgroundColor: "white",
        marginHorizontal: 70,
    },
    reviewContainer: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginVertical: 30,
        marginHorizontal: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    reviewButtonContainer: {
        backgroundColor: "white",
        marginHorizontal: 150,
    }
})