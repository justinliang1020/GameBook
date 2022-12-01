import { Pressable, Modal, Text, View, Image, SafeAreaView, FlatList, TouchableOpacity, Button, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useState } from "react";
import { SelectList } from 'react-native-dropdown-select-list'


export default function Game({ route, navigation }) {
    // sample data -----
    const review1 = {
        id: 1,
        text: "Portal is great on the xbox. I like it because it runs really well. I like shooting portals. Also Valve is a cool company, and I like that they put cool robots in this game also.",
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
    function submitReview(description, platform, rating) {
        // - text : string (max 255 characters, tweet-like)
        // - username: string (user)
        // - gameId: int
        // - platform: string
        // - rating: number
        const payload = {
            text: description,
            platform: platform,
            rating: Number(rating),
            gameId: game.gameId,
            username: global.username
        }
        console.log("sending payload: ", payload)
    }
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

    const platformsOptions = [
        { key: '1', value: 'pc' },
        { key: '2', value: 'xbox-series-x' },
        { key: '3', value: 'xbox-one' },
        { key: '4', value: 'playstation4' },
        { key: '5', value: 'playstation5' },
        { key: '6', value: 'nintendo-switch' },
    ]

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
    const [reviewPlatform, setReviewPlatform] = useState(null);
    const [reviewRating, setReviewRating] = useState(null);
    const [reviewDescription, setReviewDescription] = useState("");

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
                <Text style={styles.ratingsTitle}>Gamebook Scores</Text>
                <FlatList
                    data={parentsToPlatforms[selectedParent]}
                    renderItem={({ item }) => (
                        <View style={styles.ratingsItem}>
                            <Text style={styles.ratingsNumber}>{game.ratings[item]}</Text>
                            <Text style={styles.ratingsPlatform}>{item}</Text>
                        </View>
                    )}
                    horizontal
                    contentContainerStyle={styles.platformContentContainer}
                    scrollEnabled={false}
                />
            </View>

            <FlatList
                data={reviewsByParent[selectedParent]}
                renderItem={({ item, index }) => (
                    <View style={[styles.reviewContainer, index % 2 == 0 ? { marginRight: 10 } : { marginLeft: 10 }]}>
                        <View style={{ flexDirection: "row" }}>
                            <Image style={styles.profileImage} source={require("../../../assets/profile.png")} />
                            <Text style={styles.reviewUsername}>{item.username}: </Text>
                            <Text style={styles.reviewRating}>{item.rating}</Text>
                        </View>
                        <Text style={styles.reviewDescription}>{item.text}</Text>
                        {/* <Text>Rating: {item.rating}</Text> */}
                    </View>
                )}
                horizontal
                style={styles.reviewList}
            />
        </View>
    );

    const GameScreenshot = ({ }) => (
        <View style={{ flex: 1, marginTop: 50 }}>
            <Text style={styles.instructionText}>Featured Screenshot</Text>
            <Image source={{ uri: game.screenshotUrl }} style={styles.screenshot} resizeMode="contain" />
        </View>
    )

    return (
        <SafeAreaView style={styles.backgroundContainer}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{game.title}</Text>
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
                {selectedParent ? <PlatformRatings /> : <GameScreenshot />}
            </View>
            <View style={styles.reviewButtonContainer}>
                <Button
                    onPress={() => setModalVisible(true)}
                    title="Create Review"

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
                        <Text>Write a Review for {game.title}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text>Select a Platform: </Text>
                            <SelectList
                                setSelected={(val) => setReviewPlatform(val)}
                                data={platformsOptions}
                                save="value"
                            />
                        </View>
                        <TextInput
                            style={styles.input}
                            onSubmitEditing={input => { setReviewRating(input.nativeEvent.text) }}
                            placeholder={"Rating (1-5)"}
                            defaultValue={reviewRating}
                        />
                        <TextInput
                            style={styles.input}
                            onSubmitEditing={input => { setReviewDescription(input.nativeEvent.text) }}
                            placeholder={"Description"}
                            defaultValue={reviewDescription}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                if (global.username === undefined) {
                                    Alert.alert("Error: not logged in")
                                } else if (reviewPlatform === null) {
                                    Alert.alert("Error: no platform given")
                                } else if (reviewRating === null) {
                                    Alert.alert("Error: no rating given")
                                } else if (reviewDescription === null) {
                                    Alert.alert("Error: no description given")
                                } else {
                                    console.log("submit review")
                                    submitReview(reviewDescription, reviewPlatform, reviewRating)
                                }
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <Text style={styles.textStyle}>Submit Review</Text>
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
        fontSize: 23,
        textAlign: "center",
        color: "#ffffff",
        marginTop: 30,
    },
    platformSelector: {
        backgroundColor: "#ffffff",
        marginHorizontal: 30,
        marginVertical: 15,
        borderRadius: 10,
        paddingVertical: 6,
    },
    platformContentContainer: {
        justifyContent: "center",
        flexGrow: 1,
    },
    platformItem: {
        marginHorizontal: 20,
    },
    screenshot: {
        marginHorizontal: 25,
        height: 200,
    },
    ratingsItem: {
        marginHorizontal: 15,
        alignItems: "center",
    },
    ratingsNumber: {
        color: "#255C97",
        fontSize: 30,
        fontWeight: "bold",
    },
    ratingsPlatform: {
        color: "#4474D2",
        fontSize: 20,
        fontWeight: "bold"
    },
    ratingsList: {
        backgroundColor: "white",
        marginHorizontal: 30,
        marginVertical: 30,
        // borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        borderRadius: 3,
    },
    ratingsTitle: {
        textAlign: "center",
        color: "#4474D2",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
    },
    reviewList: {
        marginHorizontal: 30,
    },
    reviewContainer: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 30,
        borderRadius: 3,
        width: 300,
        height: 200,
    },
    reviewUsername: {
        fontWeight: "bold",
        fontSize: 20,
    },
    reviewRating: {
        fontWeight: "bold",
        color: "#255C97",
        fontSize: 20,

    },
    reviewDescription: {
        marginTop: 5,
    },
    profileImage: {
        width: 22,
        height: 22,
        marginRight: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        // margin: 20,
        backgroundColor: "white",
        margin: 0,
        // padding: 100,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 10,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    reviewButtonContainer: {
        backgroundColor: "white",
        marginHorizontal: 150,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textInput: {
            color: "black",
        },
    },
})