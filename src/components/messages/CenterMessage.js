import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default ({message}) => (
	<View style={styles.container}>
		<Text style={styles.text}>{message}</Text>
	</View>
)


const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderBottomWidth: 2,
		borderBottomColor: '#e8075d'
	}
})