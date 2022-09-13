import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ref, set, get, child } from "firebase/database"
import firebaseStack from '../firebase/Firebase';
import * as Device from 'expo-device';



const SignIn = () => {

    const db = firebaseStack();
    const dbRef = ref(firebaseStack());

    var today = new Date();
    var date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const handlePress = () => {

        const UserInfo = {
            'first-name': first_name,
            'last-name': last_name,
            'email': email,
            'CNIC': username,
            'Car-No': password,
            'Password': confirmPassword,
            'Date-Time':`${date}-${time}`
        }

        set(ref(db, `UserData/` + username), {
            'first-name': first_name,
            'last-name': last_name,
            'email': email,
            'CNIC': username,
            'Car-No': password,
            'Password': confirmPassword,
            'Date-Time':`${date}-${time}`
        });

        setFirstName('');
        setLastName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }


    return (
        <View style={Style.main}>
            <View style={Style.dot1}></View>
            <View style={Style.dot2}></View>
            <View style={Style.e_container}>
                <View style={Style.e_container2}>
                    <Text style={Style.e_container2_text1}>Van-Tracker</Text>
                    <Text style={Style.e_container2_text2}>App 🚐</Text>
                </View>
            </View>
            <View style={Style.dot3}></View>
            <View style={Style.log_container}>
                <View style={Style.log_container2}>
                    <Text style={Style.log_container2_text}>Sign up</Text>
                    <View style={Style.fl_name_view}>
                        <View>
                            <Text style={Style.fl_name_view_text}>
                                {/* <FontAwesome name='user-circle-o' /> */}
                                First Name
                            </Text>
                            <TextInput value={first_name} selectionColor="black" style={Style.fl_name_view_input} onChangeText={setFirstName} />
                        </View>
                        <View>
                            <Text style={Style.fl_name_view_text}>
                                {/* <FontAwesome name='user-circle-o' />  */}
                                Last name
                            </Text>
                            <TextInput value={last_name} selectionColor="black" style={Style.fl_name_view_input} onChangeText={setLastName} />
                        </View>
                    </View>
                    <View style={Style.email_view}>
                        <Text style={Style.email_view_text}>
                            {/* <MaterialCommunityIcons name='email-outline' />   */}
                            Email</Text>
                        <TextInput value={email} selectionColor="black" style={Style.email_view_texting} onChangeText={setEmail} />
                    </View>
                    <View style={Style.email_view}>
                        <Text style={Style.email_view_text}>
                            {/* <AntDesign name='user' /> */}
                            Cnic
                        </Text>
                        <TextInput value={username} selectionColor="black" keyboardType={Device.isAndroid ? "numeric" : "number-pad"} style={Style.email_view_texting} onChangeText={setUsername} />
                    </View>
                    <View>
                        <Text style={Style.email_view_text}>
                            {/* <MaterialCommunityIcons name='lock-outline' />   */}
                            Car No
                        </Text>
                        <TextInput value={password} selectionColor="black" style={Style.email_view_texting} onChangeText={setPassword} />
                    </View>
                    <View>
                        <Text style={Style.email_view_text}>
                            {/* <MaterialCommunityIcons name='lock-outline' />   */}
                            Password
                        </Text>
                        <TextInput value={confirmPassword} selectionColor="black" style={Style.email_view_texting} secureTextEntry={true} onChangeText={setConfirmPassword} />
                    </View>
                    <TouchableOpacity style={Style.forgot_btn}>
                        <Text style={Style.forgot_btn_text}>Forgot password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.signup_btn} onPress={handlePress}>
                        <Text style={Style.signup_btn_text}>Sign up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.log_in_btn} onPress={() => navigation.navigate('Login')}>
                        <Text style={Style.log_in_btn_text}>Log in instead</Text>
                    </TouchableOpacity>
                    <View style={Style.auth_view}>
                        {/* <AntDesign style={Style.auth_icon} name='google' onPress={Gmail_auth} />
                        <FontAwesome5Pro style={Style.auth_icon} name='facebook' onPress={Facebook_auth} /> */}
                    </View>
                </View>
            </View>
        </View>
    )
}


export default SignIn;


const Style = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FF5F00'
    },
    dot1: {
        backgroundColor: '#f5ae62',
        opacity: 0.7,
        width: 80,
        height: 80,
        borderRadius: 40,
        position: "absolute",
        top: "-5%",
        right: "8%"
    },
    dot2: {
        borderWidth: 4,
        borderColor: 'rgba(158, 150, 150, .3)',
        width: 18,
        height: 18,
        borderRadius: 1000,
        position: "absolute",
        top: "2%",
        left: "25%"
    },
    e_container: {
        width: '100%',
        height: '25%',
        justifyContent: "center"
    },
    e_container2: {
        width: "70%",
        alignSelf: "center"
    },
    e_container2_text1: {
        color: "white", fontWeight: "bold", fontSize: 45, letterSpacing: 1
    },
    e_container2_text2: {
        color: "white", fontWeight: "bold", fontSize: 35, lineHeight: 35, letterSpacing: 2
    },
    dot3: {
        borderWidth: 4, borderColor: 'rgba(158, 150, 150, .3)', width: 25, height: 25, borderRadius: 1000, position: "absolute", top: "18%", right: "15%"
    },
    log_container: {
        width: '100%', height: '75%', backgroundColor: "white", borderTopRightRadius: 15, borderTopLeftRadius: 15, justifyContent: "center"
    },
    log_container2: {
        // backgroundColor:'red',
        width: "80%", height: "100%", alignSelf: "center", marginTop: 140
    }, fl_name_view: {
        flexDirection: "row", justifyContent: "space-between"
    },
    fl_name_view_text: {
        color: "gray", fontSize: 18, marginTop: "3%"
    }, fl_name_view_input: {
        height: 25, width: 130, padding: 5, borderBottomWidth: 1, color: "black"
    },
    log_container2_text: {
        color: "black", fontWeight: "bold", fontSize: 35, marginTop: "4%"
    },
    email_view: {

    },
    email_view_text: {
        color: "gray", fontSize: 18, marginTop: "3%"
    },
    email_view_texting: {
        height: 25, padding: 5, borderBottomWidth: 1, color: "black"
    },
    forgot_btn: {
        width: "40%",
        marginTop: "3%"
    },
    forgot_btn_text: {
        color: "#FF5F00", fontWeight: "bold"
    },
    signup_btn: {
        width: "80%", height: 50, backgroundColor: "#FF5F00", borderRadius: 10, justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: "3%"
    },
    signup_btn_text: {
        color: "white", fontWeight: "bold"
    },
    log_in_btn: {
        width: "55%", justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: "3%"
    },
    log_in_btn_text: {
        color: "#FF5F00", fontWeight: "bold"
    },
    auth_view: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "25%", alignSelf: "center", marginTop: "3%"
    },
    auth_icon: {
        fontSize: 30, color: "#FF5F00"
    }
});