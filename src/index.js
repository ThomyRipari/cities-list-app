import React, { Component } from 'react';
import { AsyncStorage, Text } from 'react-native';
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
	DeleteAllCities: { screen: DeleteAllCities, navigationOptions: {title: 'Delete All Cities'}}

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

export default class App extends Component {
	state = {
		cities: []
	}

	async componentDidMount() {
		try {
			const cities = await AsyncStorage.getItem('cities');

			this.setState({
				cities: JSON.parse(cities) || []
			})
		} catch (e) {
			console.log('error: ', e);
		}
	}

	addCity = (city) => {
		const { cities } = this.state;

		cities.push(city);

		AsyncStorage.setItem('cities', JSON.stringify(cities))

		.then(() => console.log('CITIES STORED'))
		.catch(error => console.log('error: ', error))

		this.setState({cities});
	}

	addLocation = (location, city) => {
		const cityIndex = this.state.cities.findIndex(item => item.id === city.id);

		const cityToAddLocation = this.state.cities[cityIndex];
		cityToAddLocation.locations.push(location);

		const cities = [
			...this.state.cities.slice(0, cityIndex),
			cityToAddLocation,
			...this.state.cities.slice(cityIndex + 1)
		]

		this.setState({cities}, () => {
			AsyncStorage.setItem('cities', JSON.stringify(cities))

			.then(() => console.log('CITIES WITH NEW LOCATIONS STORED'))
			.catch(error => console.log('error: ', error))
		})

	}

	render() {
		return (
			<Tabs screenProps={{cities: this.state.cities, addCity: this.addCity, addLocation: this.addLocation}} />
		)
	}
}