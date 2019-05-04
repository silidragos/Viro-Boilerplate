/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { ViroARSceneNavigator } from 'react-viro';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

var sharedProps = {
    apiKey: 'A831263F-E367-4AE0-84CB-26088B97E6DB'
};

var InitialARScene = require('./ARBatScene');

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            sharedProps: sharedProps
        };
    }
    render() {
        return (
            <ViroARSceneNavigator {...this.state.sharedProps} initialScene={{ scene: InitialARScene }} />
            // <View style={styles.container}>
            //     <Text style={styles.welcome}>Welcome to React Native!</Text>
            //     <Text style={styles.instructions}>To get started, edit App.js</Text>
            //     <Text style={styles.instructions}>{instructions}</Text>

            //
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
