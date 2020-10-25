import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function Birthday(props) {
    const {birthDay, deleteBirthday} = props
    const pasat = birthDay.days > 0 ? true : false;
    console.log(pasat)
    const infoDays = ()=>{
        if(birthDay.days === 0){
            return <Text style={{color: "#fff"}}>Hoy es su cumpleaños</Text>
        }else{
            const days = -birthDay.days;
            return(
                <View style={styles.textcurrent}>
                    <Text>{days}</Text>
                    <Text>{ days === 1? 'Dia': 'Dias'}</Text>
                </View>
            )
        }
        
    }

    return (
        <TouchableOpacity 
        onPress={()=> deleteBirthday(birthDay)}
        style={[styles.card, 
            pasat 
            ? styles.pasat 
            : birthDay.days === 0 
            ? styles.actual 
            : styles.current]}>
            <Text style={styles.username}>
                {birthDay.name} {birthDay.lastname}
            </Text>
            {pasat ? <Text style={{color: "#fff"}}>Pasado</Text> : infoDays() }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        alignItems: "center",
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 15,
    },
    actual:{
        backgroundColor: "#559204"
    },
    pasat:{
        backgroundColor: "#820000",

    },
    current:{
        backgroundColor: "#1ae1f2"
    },
    username:{
        fontSize: 19,
        color: "#fff"
    },
    textcurrent:{
        backgroundColor: "#fff",
        borderRadius: 20,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
    }
});
