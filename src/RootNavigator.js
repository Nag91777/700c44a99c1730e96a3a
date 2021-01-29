import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import FindMyAstroid from "./FindMyAstroid";
import MyResults from "./MyResults";

const Stack = createStackNavigator();

function RootNavigator(props) {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="FindMyAstroid">
                <Stack.Screen 
                name= "FindMyAstroid"
                component={FindMyAstroid}
                options={{title: 'FindMyAstroid'}}
                navigation={props.navigation}
                />
                <Stack.Screen 
                name= "MyResults"
                component={MyResults}
                options={{title: 'MyResults'}}
                navigation={props.navigation}
                route={props.route}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;