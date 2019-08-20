import React from 'react'
import { View, Text, Button } from 'react-native'

export interface OptionalProps {
    navigation:any;
}
const Optional = (props:OptionalProps) => {
    return (
        <View>
            <Text>Main Screen</Text>
            <Button
                title="Go to Second Screen"
                onPress={() => props.navigation.navigate('Secondary', {name: 'Jane'})}
            />
        </View>
    )
}

export default Optional