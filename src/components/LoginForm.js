import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';

export default function LoginForm(props){
    const {changeForm} = props;
    const [formError, setFormError] = useState({});
    const [formData, setFormData] = useState(defaultValue());

    const login = ()=>{
        let errors = {};
        if(!formData.email || !formData.password){
            if(!formData.email) errors.email = true;
            if(!formData.password) errors.password = true; 
            console.log("err 1")
        }else if(!validateEmail(formData.email)){
            errors.email = true
            console.log("err 2")
        }else{
            firebase
            .auth()
            .signInWithEmailAndPassword(formData.email, formData.password)
            .then(()=>{
                console.log("OK")
            })
            .catch(()=>{
                setFormError({
                    email: true,
                    password: true,
                })
            })
        }
        setFormError(errors);
    }
    const onChange = (e, type)=>{
        //console.log(`data: ${e.nativeEvent.text}`);
        //console.log(`type: ${type}`);
        setFormData({...formData, [type]: e.nativeEvent.text})
    };
     
    return(
        <>
            <TextInput
            placeholder="Correo electronico"
            placeholderTextColor="#969696"
            style={[styles.input, formError.email && styles.error]}
            onChange={(e)=> onChange(e, "email")}
            />  
            <TextInput
            placeholder="Contraseña"
            secureTextEntry={true}
            placeholderTextColor="#969696"
            style={[styles.input, formError.password && styles.error]}
            onChange={(e)=> onChange(e, "password")}
            />  
            <TouchableOpacity onPress={login} >
                <Text style={styles.btnText}>Iniciar Sesion</Text>
            </TouchableOpacity>
                <TouchableOpacity style={styles.register} onPress={changeForm}>
                <Text style={styles.btnText}>Registrate</Text>
            </TouchableOpacity>
        </>
    )
 
}

function defaultValue(){
    return{
        email: "",
        password: "",
    }
}

const styles = StyleSheet.create({
    btnText:{
        color: "#fff",
        fontSize: 18,
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
    register:{
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 20,
    },
    error:{
        borderColor: "#940c0c",
    }
})