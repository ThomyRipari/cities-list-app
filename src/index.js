import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

/* Import Components */
import Cities from './components/Cities/Cities';
import City from './components/Cities/City';
import AddCity from './components/AddCity/AddCity';
import Settings from './components/Settings/Settings';
import DeleteCity from './components/Settings/delete/DeleteCity';
import DeleteAllCities from './components/Settings/delete/DeleteAllCities';

const CitiesStackBottomStyles = {
	fontSize: 16,
	marginLeft: 30,
	marginBottom: 2
}

const citiesNavigator = createStackNavigator({
	Cities: { screen: Cities, navigationOptions: {title: 'Cities'} },
	City: { screen: City, navigationOptions: ({navigation}) => {
		return {title: navigation.state.params.city.city}
	} }
}, {
	headerLayoutPreset: 'center',
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: '#e8075d'
		},

		headerTitleStyle: {
			color: 'white',
			fontSize: 20
		},

		headerTintColor: '#fff'
	}
})

const settingsNavigator = createStackNavigator({
	Settings: { screen: Settings, navigationOptions: {title: 'Settings'}},
	DeleteCity: { screen: DeleteCity, navigationOptions: {title: 'Delete City'}},
	DeleteAllCities: { screen: DeleteAllCities, navigationOptions: {title: 'Delete All Cities', header: null}}

}, {
	headerLayoutPreset: 'center',

	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: '#b2b1b5'
		},

		headerTitleStyle: {
			color: 'white'
		},

		headerTintColor: '#fff'
	}
})

const Tabs = createAppContainer(
	createBottomTabNavigator({
		CitiesStack: { 
			screen: citiesNavigator,

			navigationOptions: ({navigation}) => {
				return {tabBarLabel: () => {
					if (navigation.state.routes[navigation.state.index].routeName === "City") {
						return <Text style={CitiesStackBottomStyles}>{navigation.state.routes[navigation.state.index].params.city.city}</Text>
					} else {
						return <Text style={CitiesStackBottomStyles}>List of Cities</Text>
					}
				}}
			}
		},
		AddCity: { 
			screen: AddCity,

			navigationOptions: {
				tabBarLabel: "Add new Cities"
			}
		},

		SettingsStack: {
			screen: settingsNavigator,

			navigationOptions: {
				tabBarLabel: "Settings"
			}

		}
	}, {
		tabBarOptions: {
			inactiveTintColor: '#000000',
			activeTintColor: '#e8075d',

			labelStyle: {
				fontSize: 16
			}
		}
	})
)

const App = () => {
	const [ state, setState ] = useState({
		cities: []
	});

	useEffect(() => {
		(async function () {
			try {
				const cities = await AsyncStorage.getItem('cities');
			
				setState({cities: JSON.parse(cities) || []})

			} catch (e) {
				console.log('error: ', e);
			}				
		})()
	}, [])


	useEffect(() => {
		AsyncStorage.setItem('cities', JSON.stringify(state.cities))

		.then(() => console.log('Update the Storage'))
		.catch((error) => console.log('Error: ', error))

	})

	const addCity = (city) => {
		const { cities } = state;

		cities.push(city);

		setState(prev => ({...prev, cities: cities}));
	}

	const addLocation = (location, city) => {
		const cityIndex = state.cities.findIndex(item => item.id === city.id);

		const cityToAddLocation = state.cities[cityIndex];
		cityToAddLocation.locations.push(location);

		const cities = [
			...state.cities.slice(0, cityIndex),
			cityToAddLocation,
			...state.cities.slice(cityIndex + 1)
		]

		setState(prev => ({...prev, cities: cities}))
	}

	const deleteCity = (id) => {
		const cityIndex = state.cities.findIndex(item => item.id === id);

		const cities = [
			...state.cities.slice(0, cityIndex),
			...state.cities.slice(cityIndex + 1)
		]

		setState(prev => ({...prev, cities: cities}))
	}

	const deleteAllCities = () => {
		setState(prev => ({...prev, cities: []}));
	}

	return (
		<Tabs screenProps={{cities: state.cities, addCity: addCity, addLocation: addLocation, deleteCity: deleteCity, deleteAllCities: deleteAllCities}} />
	)
}

export default App;