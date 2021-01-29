import React from "react";
import { Text, StyleSheet, Linking } from "react-native";
import { Container, Content, ListItem, Body } from "native-base";
import { TextInput } from "react-native-gesture-handler";

const MyResults = ({route}) => {
    const {name} = route.params;
    const {nasa_jpl_url} = route.params;
    const {is_potentially_hazardous_asteroid} = route.params;

    return (
        <Container>
            <ListItem itemDivider />
            <Content>
                <ListItem>
                    <Body>
                        <Text style={styles.text}>
                            Name:{'  '}<Text>{name}</Text>
                        </Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text style={styles.text}>
                        Nasa_jpl_url:{'  '}<Text style={styles.textLink}
                        onPress={() => Linking.openURL(nasa_jpl_url)}>{nasa_jpl_url}</Text>
                        </Text>
                    </Body>
                </ListItem>
                <ListItem>
                    <Body>
                        <Text style={styles.text}>
                        Is_potentially_hazardous_asteroid:{'  '}<Text>{is_potentially_hazardous_asteroid}</Text>
                        </Text>
                    </Body>
                </ListItem>
                <ListItem itemDivider/>
            </Content>
        </Container>
    )
}

export default MyResults;

const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        marginTop: 10,
    },
    textLink: {
        fontSize: 17,
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});