import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import ActionBar from "./ActionBar";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from 'react'
import moment from 'moment';
import firebase from '../utils/firebase'
import 'firebase/firestore'

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function AddBirthday(props) {
    const {user, setshowList, setreloadData} = props;
    const [formData, setformData] = useState({})
    const [isDatePickerVisible, setisDatePickerVisible] = useState(false)
    const [formError, setError] = useState({})
    
    
    const hideDatePicker = ()=>{
        setisDatePickerVisible(false)
    }

    const handlerConfirm = (date)=>{
        const dateBirth = date;
        dateBirth.setHours(0);
        dateBirth.setMinutes(0);
        dateBirth.setSeconds(0);
        setformData({...formData, dateBirth: dateBirth})
        
        //console.log(moment(date).format('LL'));
    }
    const showDatePicker = ()=>{
        setisDatePickerVisible(true);
    }

    const onChange = (e,type) =>{
        setformData({...formData, [type]: e.nativeEvent.text })
    }

    const onSubmit = () =>{
        let errors = {};
        if(!formData.name || !formData.lastname || !formData.dateBirth){
            if(!formData.name) errors.name = true;
            if(!formData.lastname) errors.lastname = true;
            if(!formData.dateBirth) errors.dateBirth = true;
        }else{
            const data = formData;
            data.dateBirth.setYear(0);
            db.collection(user.uid)
                .add(data)
                .then(()=>{
                    setreloadData(true);
                    setshowList(true);
                })
                .catch(()=>{
                    setError({name: true, lastname: true, dateBirth: true})
                })
            
        }
        setError(errors);
    }
    return (
        <>
            <View style={styles.container}>
                <TextInput
                    onChange={(e)=>{onChange(e, "name")}}
                    style={[styles.input, formError.name && {borderColor: '#940c0c'}]}
                    placeholder="Nombre"
                    placeholderTextColor="#969696"
                />
                 <TextInput
                    onChange={(e)=>{onChange(e, "lastname")}}
                    style={[styles.input, formError.lastname && {borderColor: '#940c0c'}]}
                    placeholder="Apellidos"
                    placeholderTextColor="#969696"
                />
                <View style={[styles.input, styles.datePicker,formError.dateBirth && {borderColor: '#940c0c'}]}>
                    <Text 
                        
                        style={{
                        color: formData.dateBirth ? "#fff" : "#969696",
                        fontSize: 18,}} 
                        onPress={showDatePicker}>
                    
                    {formData.dateBirth 
                    ? moment(formData.dateBirth).format("LL")
                    : "Fecha de nacimiento"}
                    
                    </Text>
                </View>
                <TouchableOpacity onPress={onSubmit}>
                    <Text style={styles.addButton}>
                        Crear Cumpleaños
                    </Text>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handlerConfirm}
                onCancel={hideDatePicker}
              
            />
    
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        height: "100%",
        width:'100%',
        justifyContent: 'center',
        alignItems: "center",
    },
    input:{
        height: 50,
        width: '80%',
        color: '#fff',
        marginBottom: 25,
        backgroundColor:'#1e3040',
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#1e3040",
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    datePicker:{
        justifyContent: "center",
    },
    textDate:{
        color: "#969696",
        fontSize: 18,
    },
    addButton:{
        fontSize: 18,
        color: "#fff"
    }
    
})
