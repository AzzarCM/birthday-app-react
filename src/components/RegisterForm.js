import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import {validateEmail} from '../utils/validations'
import firebase from '../utils/firebase'
export default function RegisterForm(props){
    const {changeForm} = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});
    const register = ()=>{
        let errors = {};
        if(!formData.email || !formData.password || !formData.repeatPassword){
            if(!formData.email) errors.email = true;
            if(!formData.password) errors.password = true;
            if(!formData.repeatPassword) errors.repeatPassword = true;
        }else if(!validateEmail(formData.email)){
            errors.email = true;
        }else if(formData.password !== formData.repeatPassword){
            errors.password = true;
            errors.repeatPassword=true;
        }else if(formData.password.length < 6){
            errors.password = true;
            errors.repeatPassword=true;
        }else{
            firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then(()=>{
                console.log("Cuenta crada en firebase!")
            }).catch(()=>{
                setFormError({
                    email: true,
                    password: true,
                    repeatPassword: true,
                })
            })
        }
        setFormError(errors);
        console.log(errors)
    }
    return(
        <>
            <TextInput 
            onChange={(e)=> setFormData({...formData, email: e.nativeEvent.text})}
            placeholder="Correo electronico"
            style={[styles.input, formError.email && styles.errorInput]}
            placeholderTextColor="#969696"
            />
            <TextInput
            onChange={(e)=> setFormData({...formData, password: e.nativeEvent.text})}
            secureTextEntry={true}
            style={[styles.input, formError.password && styles.errorInput]}
            placeholder="Contraseña"
            placeholderTextColor="#969696"/>
            <TextInput
            onChange={(e)=> setFormData({...formData, repeatPassword: e.nativeEvent.text})}
            secureTextEntry={true}
            style={[styles.input, formError.repeatPassword && styles.errorInput]}
            placeholder="Repetir contraseña"
            placeholderTextColor="#969696"/>
            <TouchableOpacity onPress={register}>
                <Text style={styles.btnText}>Registrate</Text>
            </TouchableOpacity>
            <View style={styles.login}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Iniciar Sesion</Text>
                </TouchableOpacity>
            </View>
            
            
        </>
    )
 
}

function defaultValue(){
    return{
        email: "",
        password: "",
        repeatPassword: "",
    }
}


const styles = StyleSheet.create({
    btnText:{
        color: "#fff",
        fontSize: 18,
    },
    errorInput:{
        borderColor: "#940c0c",
    },
    input:{
        height: 50,
        color: "#fff",
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#1e3040",
    },
    login:{
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 20,
    }
})