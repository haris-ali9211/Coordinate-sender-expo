import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ref, set, get, child } from "firebase/database"
import firebaseStack from '../firebase/Firebase';



const Login = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [data, setData] = useState([])
    console.log("🚀   email", data)
    
    const db = firebaseStack();
    const dbRef = ref(firebaseStack());


    const handlePress = async () => {
        get(child(dbRef, `UserData/${email}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.val())
                // console.log(snapshot.val().length, email);
                // console.log("🚀 ~ file: Login.js ~ line 13 ~ Login ~ data", data.CNIC)
                if (data != null) {
                    if (data.CNIC === email && data.Password === password) {
                        alert('Success')
                        if (data.Driver == false) {
                            navigation.navigate('LocationUI')
                        }
                        else{
                            navigation.navigate('Van-Tracker')
                        }
                    }
                    else {
                        alert('This could happen due to slow internet connection')
                    }

                }

            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }


    return (
        <View style={Style.main}>
            <View style={Style.dot1}></View>
            <View style={Style.dot2}></View>
            <View style={Style.e_container}>
                <View style={Style.e_container2}>
                    <Text style={Style.e_container2_text1}>Van-Tracker</Text>
                    <Text style={Style.e_container2_text2}>App🚐</Text>
                </View>
            </View>
            <View style={Style.dot3}></View>
            <View style={Style.log_container}>
                <View style={Style.log_container2}>
                    <Text style={Style.log_container2_text}>Sign in</Text>
                    <View style={Style.email_view}>
                        <Text style={Style.email_view_text}>
                            {/* <MaterialCommunityIcons name='email-outline' /> */}
                            Email</Text>
                        <TextInput selectionColor="black" style={Style.email_view_textinput} onChangeText={setEmail} />
                    </View>
                    <View>
                        <Text style={Style.email_view_text}>
                            {/* <MaterialCommunityIcons name='lock-outline' /> */}
                            Password</Text>
                        <TextInput selectionColor="black" style={Style.email_view_textinput} secureTextEntry={true} onChangeText={setPassword} />
                    </View>
                    <TouchableOpacity style={Style.forgot_btn}>
                        <Text style={Style.forgot_btn_text}>Forgot password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.login_btn} onPress={handlePress}>
                        <Text style={Style.login_btn_text}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.create_account_btn} onPress={() => navigation.navigate('SignIn')}>
                        <Text style={Style.create_account_btn_text}>Create account instead</Text>
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
export default Login;


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
        color: "white", 
        fontWeight: "bold", 
        fontSize: 35, 
        letterSpacing: 1
    },
    e_container2_text2: {
        color: "white", 
        fontWeight: "bold", 
        fontSize: 35, 
        lineHeight: 35, 
        letterSpacing: 2
    },
    dot3: {
        borderWidth: 4, 
        borderColor: 'rgba(158, 150, 150, .3)', 
        width: 25, 
        height: 25, 
        borderRadius: 1000, 
        position: "absolute", 
        top: "18%", 
        
        right: "15%"
    },
    log_container: {
        width: '100%', 
        height: '75%', 
        backgroundColor: "white", 
        borderTopRightRadius: 15, 
        borderTopLeftRadius: 15, 
        justifyContent: "center"
    },
    log_container2: {
        // backgroundColor:'red',

        // marginBottom: 90,
        width: "80%", 
        height: "75%", 
        alignSelf: "center", 
        justifyContent: "center"
    },
    log_container2_text: {
        color: "black", 
        fontWeight: "bold", 
        fontSize: 35, 
        marginTop: -10
    },
    email_view: {
        marginVertical: 25
    },
    email_view_text: {
        color: "gray", 
        fontSize: 20
    },
    email_view_textinput: {
        height: 30, 
        padding: 5, 
        borderBottomWidth: 1, 
        color: "black"
    },
    forgot_btn: {
        width: "40%", 
        marginVertical: 10
    },
    forgot_btn_text: {
        color: "#FF5F00", 
        fontWeight: "bold"
    },
    login_btn: {
        width: "80%", 
        height: 50, 
        backgroundColor: "#FF5F00", 
        borderRadius: 10, 
        justifyContent: "center", 
        alignItems: "center", 
        alignSelf: "center", 
        marginVertical: 5
    },
    login_btn_text: {
        color: "white", 
        fontWeight: "bold"
    },
    create_account_btn: {
        width: "55%", 
        justifyContent: "center", 
        alignItems: "center", 
        alignSelf: "center", 
        marginVertical: 3
    },
    create_account_btn_text: {
        color: "#FF5F00", 
        fontWeight: "bold"
    },
    auth_view: {
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 
        marginVertical: 5, 
        width: "25%", 
        alignSelf: "center"
    },
    auth_icon: {
        fontSize: 30, 
        color: "#FF5F00"
    }
});