import React from 'react'
import { View, Text, Button } from 'react-native'

export interface MainProps {
    navigation:any;
}
const Main = (props:MainProps) => {
    return (
        <View>
            <Text>Main Screen2</Text>
            <Button
                title="Options"
                onPress={() => props.navigation.navigate('Optional', {name: 'Jane'})}
            />
        </View>
    )
}

export default Main