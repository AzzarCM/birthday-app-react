import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import ActionBar from "./ActionBar";
import AddBirthday from "./AddBirthday";
import firebase from '../utils/firebase'
import 'firebase/firestore'
import moment from 'moment'
import Birthday from './Birthday'
firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function ListBirthday(props) {
    const {user} = props;
    const [showList, setshowList] = useState(true);
    const [birthDay, setbirthDay] = useState([]);
    const [pasatBirthday, setpasatBirthday] = useState([]);
    const [reloadData, setreloadData] = useState(false);

    useEffect(() => {
        setbirthDay([]);
        setpasatBirthday([]);
        db.collection(user.uid)
        .orderBy("dateBirth", "asc")
        .get()
        .then((response)=>{
            const itemsArray = [];
            response.forEach((doc)=>{
                const data = doc.data();
                data.id = doc.id;
                itemsArray.push(data);
                setbirthDay(itemsArray);
            });
            formatData(itemsArray);
        })
        setreloadData(false);
    }, [reloadData])

    const formatData = (items)=>{
        const currentDate = moment().set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
        });
        const birthdayTempArray = [];
        const pasatBirthdayTempArray = [];

        items.forEach((item)=>{
            const dateBirth = new Date(item.dateBirth.seconds * 1000);
            const dateBirthday = moment(dateBirth);
            const currentYear = moment().get("year");
            dateBirthday.set({year: currentYear});

            const diffDate = currentDate.diff(dateBirthday, "days");
            const itemTemp = item;
            itemTemp.dateBirth = dateBirthday;
            itemTemp.days = diffDate;

            if(diffDate <= 0){
                birthdayTempArray.push(itemTemp);
            }else{
                pasatBirthdayTempArray.push(itemTemp);
            }
            //console.log(birthdayTempArray);
            //console.log(pasatBirthdayTempArray);
            
        })
        setbirthDay(birthdayTempArray);
        setpasatBirthday(pasatBirthdayTempArray);
    }
    const deleteBirthday = (birthday) =>{
        Alert.alert(
            'Eliminar cumpleaños',
            `Estas seguro de eliminar el cumpleaños de ${birthday.name} ${birthday.lastname}`,
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: ()=>{
                        db.collection(user.uid)
                        .doc(birthday.id)
                        .delete()
                        .then(()=>{
                            setreloadData();
                        })
                    },
                },
            ],
            {cancelable: false},
        )
    }
    return (
        <View style={styles.container}>
            {showList ? (
                <ScrollView style={styles.scrollview}>
                    {birthDay.map((item, index)=>{
                        return(
                            <Birthday deleteBirthday={deleteBirthday} key={index} birthDay={item}/>
                        )
                    })}
                    
                    {pasatBirthday.map((item, index)=>{
                        return(
                            <Birthday deleteBirthday={deleteBirthday} key={index} birthDay={item}/>
                        )
                    })}
                </ScrollView>
            ) : (
                <AddBirthday setshowList={setshowList} user={user} setreloadData={setreloadData}/>
            )}
           
            <ActionBar setshowList={setshowList} showList={showList}/>
           
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        height: "100%"
    },
    scrollview:{
        width: "100%",
        marginBottom: 50,
    }
})
