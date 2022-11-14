import { useEffect, useState } from "react";
import {StyleSheet, View, Text, Button, TouchableOpacity, StatusBar, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function () {

    const [estado, setEstado] = useState('leitura');
	const [anotacao, setAnotacao] = useState();

	const atualizarTexto = async () => {
		try {
			await AsyncStorage.setItem('@anotacao',anotacao);
			setEstado("leitura");
		} catch (e) {

		}
	}

	const recuperarAnotacao = async () => {
		try {
		   setAnotacao(await AsyncStorage.getItem('@anotacao'));
		} catch (e) {
			  
		}
	} 

	useEffect(()=>{
		recuperarAnotacao() 
	},[]);

    if (estado == "leitura") {
      return (
        <View style={{flex:1}}>
		   <StatusBar hidden/>
           <View>
               <Text style={styles.header}>Aplicado de Anotação</Text>
           </View>

           <View style={styles.anotacao}>
            {(anotacao != null) ? <Text>{anotacao}</Text> : <Text style={{opacity:0.3}}>Nenhuma anotação encontrada :( </Text>}
           </View>

            <TouchableOpacity
				onPress={()=>setEstado('atualizado')} 
				style={styles.btnAnotacao}
			>
              <Text style={styles.textBtnAnotacao}>+</Text>
            </TouchableOpacity>
        </View>
      )
    } else if (estado == "atualizado") {
      return (
		<View style={{flex:1}}>
		<StatusBar hidden/>
		<View>
			<Text style={styles.header}>Editando</Text>
		</View>

		<View style={styles.anotacao2}>
		 <TextInput
		    value={anotacao}
			onChangeText={e=>setAnotacao(e)}
		    multiline={true}
			textAlignVertical='top'
			autoFocus={true}
			style={styles.inputAnotacao}
			numberOfLines={5}
		 />
		</View>

		 <TouchableOpacity
			 onPress={()=>atualizarTexto()} 
			 style={styles.btnAnotacaoSalvar}
		 >
		   <Text style={styles.textBtnAnotacaoSalvar}>Salvar</Text>
		 </TouchableOpacity>
	 </View>
      )
    }   
}

const styles = StyleSheet.create({
    header:{
		width: '100%',
		padding: 30,
		backgroundColor: '#069',
		textAlign: 'center',
		color: '#fff'
	}, 
	anotacao: {
		padding: 20,
		fontSize: 15,
	},
	anotacao2: {
		flex: 1,
		padding: 20,
		fontSize: 15,
		backgroundColor: '#fff'
	},
	btnAnotacao: {
		width: 50,
		height: 50,
		borderRadius: 25,
	    position: 'absolute',
		right: 20,
		bottom: 20,
		backgroundColor: '#069',
	}, 
	btnAnotacaoSalvar: {
		width: 100,
	    position: 'absolute',
		right: 20,
		bottom: 20,
		backgroundColor: '#069',
		padding: 15
	},
	textBtnAnotacao: {
		fontSize: 30,
		color: '#fff',
		textAlign: "center",
		top: -5
	}, 
	textBtnAnotacaoSalvar: {
		fontSize: 15,
		color: '#fff',
		textAlign: "center",
		top: -5
	},
	inputAnotacao: {
		flex: 1,
		color: '#000'
	}
});