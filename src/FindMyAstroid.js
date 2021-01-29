import React, { Component } from "react";
import { View, StyleSheet, TextInput, ActivityIndicator, Alert, ScrollView, Keyboard } from "react-native";
import { Button, Text } from "native-base";

const API_KEY = 'eRoqftedBa92v91f4YRKEXi5eR5cxlFwcLgSqEYP';

export default class FindMyAstroid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isLoading: false,
        };
    }

    handleTextInput = (textInput) =>{
        this.setState({
            value: textInput,
        });
    };

    fetchAsteroid = (random) => {
        Keyboard.dismiss();
        this.setState({
            isLoading: true,
        });
        fetch(`https://api.nasa.gov/neo/rest/v1/neo/${random}?api_key=${API_KEY}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('===result===', result);
                this.setState({
                    isLoading: false,
                    value: '',
                });
                let resultObj = {
                    name: result.name,
                    nasa_jpl_url: result.nasa_jpl_url,
                    is_potentially_hazardous_asteroid: result.is_potentially_hazardous_asteroid
                    ? 'Yes' : 'No',
                };
                this.props.navigation.navigate('MyResults', resultObj);
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    value: ','
                })
                Alert.alert('Please enter Correct id');
            });
    };

    fetchRandomAsteroid = () => {
        Keyboard.dismiss();
        this.setState({
            isLoading: true,
        });
        fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((result) => {
            this.fetchAsteroid(
                result.near_earth_objects[
                    Math.floor(Math.random() * result.near_earth_objects.length)
                ].id,
            );
        })
        .catch((error) => {
            this.setState({
                isLoading: false,
            });
        });
    };

    render() {
        return (
            <ScrollView 
            style={{flex: 1}}
            contentContainerStyle= {{flex: 1}}
            keyboardShouldPersistTaps="always">
                <View style = {styles.container}>
                    <TextInput
                    style={styles.textInput}
                    value={this.state.value}
                    placeholder= 'Enter Asteroid ID'
                    onChangeText = {this.handleTextInput}
                    keyboardType={'number-pad'}
                    maxLength={7}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Button
                        disabled={!this.state.value || this.state.isLoading}
                        style={styles.button}
                        onPress={() => {
                            this.fetchAsteroid(this.state.value);
                        }}>
                            <Text style={styles.text}>Random Asteroid</Text>
                        </Button>
                        <Button
                        disabled={ this.state.isLoading}
                        style={styles.button}
                        onPress={this.fetchRandomAsteroid}
                        dark>
                            <Text style={styles.text}>Random Asteroid</Text>
                        </Button>
                    </View>
                    {this.state.isLoading && (
                        <View style={styles.loader}>
                            <ActivityIndicator size='large'/>
                        </View>
                    )}
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '10%',
        margin: 25,
        alignContent: 'center',
    },
    textInput: {
        borderWidth: 0.5,
        paddingLeft: 10,
        padding: 5,
        borderColor: '#767676',
        borderRadius: 8,
        backgroundColor: '#fff',
        opacity: 0.9,
        height: 50,
    },
    button: {
        width: '45%',
        marginTop: 25,
        justifyContent: 'center',
    },
    text:{
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    loader: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

});