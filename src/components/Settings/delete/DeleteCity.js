import React, { useState } from 'react';
import { View, Text, ScrollView, Button, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const DeleteCity = (props) => {
	const [ state, setState ] = useState({
		showModal: false,
		city: {}
	})

	const goToAddCity = () => {
		props.navigation.navigate('AddCity');
	}

	const openModal = (city) => {
		setState(prev => ({...prev, showModal: true, city: city}));
	}

	const deleteCity = () => {
		setState(prev => ({...prev, showModal: false, city: {}}));

		props.screenProps.deleteCity(state.city.id);

		props.navigation.navigate('Settings');
	}

	return (
		<ScrollView>
			<View>
				{!props.screenProps.cities.length ?

					<View>
						<Text style={styles.heading}>You haven't added cities yet</Text>
						<Button title="GO TO ADD CITY" onPress={() => goToAddCity()} />
					</View>
				:
					<View>
						<Text style={styles.heading}>Select the city you want to delete</Text>
						{props.screenProps.cities.map((city, index) => (
							<View key={index}>
								<TouchableOpacity onPress={() => openModal(city)}>
									<View style={styles.buttonCity}>
										<Text style={styles.textCity}>{city.city}</Text>
										<Text style={styles.textCountry}>{city.country}</Text>
									</View>
								</TouchableOpacity>
							</View>

						))}
					</View>
				}

				<Modal transparent={false} visible={state.showModal} animationType="slide">
					<View style={{flex: 1}}>
						<Text style={styles.heading}>Are you sure you want to eliminate {state.city.city} and all its locations?</Text>

						<View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', position: 'absolute', bottom: 60}}>
							<View>
							    <TouchableOpacity style={{backgroundColor: '#e8075d'}} onPress={() => setState(prev => ({...prev, showModal: false, city: {}}))}>
							        <Text style={styles.modalsButtons}>CANCEL</Text>
							    </TouchableOpacity>
							</View>

							<View>
							   	<TouchableOpacity style={{backgroundColor: '#e8075d'}} onPress={() => deleteCity()}>
							        <Text style={styles.modalsButtons}>DELETE</Text>
							    </TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		</ScrollView>
	)
}

export default DeleteCity;

const styles = StyleSheet.create({
	heading: {
		fontSize: 24,
		margin: 14,
		textAlign: 'left',
		color: '#000000'		
	},

	buttonCity: {
		height: 80,
		backgroundColor: '#dbd5d5',
		justifyContent: 'center',
		alignItems: 'flex-start',
		width: '100%',
		borderBottomColor: '#9c9797',
		borderBottomWidth: 1,
		borderTopColor: '#9c9797',
		borderTopWidth: 1,
		marginBottom: 10		
	},

	textCity: {
		fontSize: 19,
		marginLeft: 10,
		color: '#e8075d'
	},

	textCountry: {
		fontSize: 17,
		marginLeft: 10
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