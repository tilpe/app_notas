import React from "react";
import Styles from "./styles";
import { StyleSheet, View } from "react-native";
import { Header } from "../../componets/header";

export default function() {
    const [anotacao, setAnotacao] = useState("orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, .");

    return(
        <View>
            <Header/>
        </View>
    );
}