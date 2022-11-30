import { Text, View, SafeAreaView, TextInput, StyleSheet, Button, Image, Alert } from 'react-native';
import React from "react";

export default function ProfileScreen() {
    const [usernameInput, setUsernameInput] = React.useState("");
    const [passwordInput, setPasswordInput] = React.useState("");
    const [loggedIn, setLoggedIn] = React.useState(false);

    function login() {
        console.log(`Logging in: ${usernameInput}, ${passwordInput}`)
        if (usernameInput === "" || passwordInput === "") {
            Alert.alert("Error: input username and password to login")
            return
        }
        (async () => {
            var url = new URL("https://fyfwi64te1.execute-api.us-east-1.amazonaws.com/dev/users"),
                params = {
                    username: usernameInput,
                    password: passwordInput,
                }
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            const response = await fetch(url).then(/* … */)
            const res = await response.json(); //extract JSON from the http response
            // do something with myJson
            console.log("Response:", res)
            if (typeof (res) === 'object') {
                if ("sessionKey" in res) {
                    console.log("success")
                    global.username = usernameInput;
                    global.sessionKey = res["sessionKey"]
                    setLoggedIn(true);
                } else {
                    console.log("Login response JSON doesn't contain sessionkey")
                }
            }
        })();

    }

    function register() {
        console.log(`Registering: ${usernameInput}, ${passwordInput}`)
        if (usernameInput === "" || passwordInput === "") {
            Alert.alert("Error: input username and password to login")
            return
        }
        (async () => {
            var url = new URL("https://fyfwi64te1.execute-api.us-east-1.amazonaws.com/dev/users"),
                params = {
                    username: usernameInput,
                    password: passwordInput,
                }
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await response.json(); //extract JSON from the http response
            console.log(res);
            if (typeof (res) === 'object') {
                if ("message" in res) {
                    Alert.alert(res["message"]);
                } else {
                    Alert.alert(JSON.stringify(res));
                }
                
            } else {
                Alert.alert(res);
            }
        })();
    }

    const LoginScreen = () => (
        <SafeAreaView>
            <Text style={styles.title}>Login Screen</Text>
            {/* Weird glitch here where "onChangeText" causes keyboard to close */}
            <TextInput
                style={styles.input}
                onSubmitEditing={input => { setUsernameInput(input.nativeEvent.text) }}
                placeholder={"Username"}
                defaultValue={usernameInput}
            />
            <TextInput
                style={styles.input}
                onSubmitEditing={input => { setPasswordInput(input.nativeEvent.text) }}
                placeholder={"Password"}
                defaultValue={passwordInput}
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
            <Text style={styles.title}>Hello {global.username}</Text>
            <Image style={styles.profileImage} source={require("../../../assets/profile.png")} />
            <Text style={styles.title}>Welcome to your Gamebook!</Text>
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