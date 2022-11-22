import { Text, View, SafeAreaView, TextInput, StyleSheet, Button, Image } from 'react-native';
import React from "react";

export default function ProfileScreen() {
    const [usernameInput, onChangeUsernameInput] = React.useState("");
    const [passwordInput, onChangePasswordInput] = React.useState("");
    const [loggedIn, onChangeLoggedIn] = React.useState(false);

    function login() {
        console.log(`Logging in: ${usernameInput}, ${passwordInput}`)
        var loginSuccess = true;
        if (loginSuccess) {
            global.username = usernameInput;
            onChangeLoggedIn(true);
        }
    }

    function register() {
        console.log(`Registering: ${usernameInput}, ${passwordInput}`)
    }

    function numberReviews() {
        return 8
    }

    function averageRating() {
        return 4.5
    }

    const LoginScreen = () => (
        <SafeAreaView>
            <Text style={styles.title}>Login Screen</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsernameInput}
                placeholder={"Username"}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePasswordInput}
                placeholder={"Password"}
            />
            <View
                style={{ flexDirection: "row", justifyContent: "center" }}
            >
                <Button
                    title="Login"
                    onPress={login}
                />
                <Button
                    title="Register"
                    onPress={register}
                />
            </View>

        </SafeAreaView>
    )
    const ProfileScreen = () => (
        <SafeAreaView>
            <Text style={styles.title}>Welcome {global.username}</Text>
            <Image style={styles.profileImage}
                source={require("../../../assets/profile.png")} />
            <Text style={styles.description}>Number of Reviews: {numberReviews()}</Text>
            <Text style={styles.description}>Average Rating: {averageRating()}</Text>
        </SafeAreaView>
    )
    return (
        // <LoginScreen />
        <View>
            {loggedIn ? <ProfileScreen /> : <LoginScreen />}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textInput: {
            color: "black",
        },
    },
    title: {
        textAlign: "center",
        fontSize: 30,
        marginVertical: 10,
    },
    description: {
        fontSize: 20,
        textAlign: "center",
    },
    profileImage: {
        width: 100,
        height: 100,
        marginVertical: 30,
        alignSelf: "center",
    },
})