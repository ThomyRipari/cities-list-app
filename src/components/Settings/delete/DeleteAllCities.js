import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Button } from 'react-native';

const DeleteAllCities = (props) => {
	const [ state, setState ] = useState({
		showModal: true
	})

	const closeModal = () => {
		setState(prev => ({...prev, showModal: false}));

		props.navigation.navigate('Settings');
	}

	const deleteAllCities = () => {
		setState(prev => ({...prev, showModal: false}));

		props.screenProps.deleteAllCities();

		props.navigation.navigate('Settings');
		props.navigation.navigate('Cities');
	}

	const goToAddCity = () => {
		setState(prev => ({...prev, showModal: false}));

		props.navigation.navigate('Settings');
		props.navigation.navigate('AddCity');
	}

	return (
		<Modal transparent={false} visible={state.showModal} animationType="slide">
			{!props.screenProps.cities.length ?  
				<View>
					<Text style={styles.heading}>You haven't added cities yet</Text>
					<Button title="GO TO ADD CITY" onPress={() => goToAddCity()} />
				</View>

				:

				<View style={{flex: 1}}>
					<Text style={styles.heading}>Are you sure you want to remove all cities from the list?</Text>

					<View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', position: 'absolute', bottom: 60}}>
						<View>
							<TouchableOpacity style={{backgroundColor: '#e8075d'}} onPress={() => closeModal()}>
								<Text style={styles.modalsButtons}>CANCEL</Text>
							</TouchableOpacity>
						</View>

						<View>
							<TouchableOpacity style={{backgroundColor: '#e8075d'}} onPress={() => deleteAllCities()}>
								<Text style={styles.modalsButtons}>DELETE</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>						
			}
		</Modal>
	)
}

export default DeleteAllCities;

const styles = StyleSheet.create({
	heading: {
		fontSize: 24,
		margin: 14,
		textAlign: 'left',
		color: '#000000'
	},

	modalsButtons: {
		alignSelf: 'center',
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '600',
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 10,
		paddingBottom: 10			
	}

})