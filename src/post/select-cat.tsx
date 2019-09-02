import React, { useState, useEffect } from 'react'
import { NavigationScreenProp, NavigationRoute, NavigationParams, ScrollView, NavigationScreenProps } from 'react-navigation'
import Touchable from 'react-native-platform-touchable'
import { Text, View, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default (props: SelectCat) => {

    return (
        <Touchable onPress={() => {
            props.navigation.navigate('Drilldown', { 
                title: 'Select A Cat',
                content: <View>
                    <Text>drilldown works</Text>
                </View>
            })
        }}>
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                padding: 10, 
                marginBottom: 5, 
                borderTopColor: 'rgba(0,0,0,0.1)', 
                borderTopWidth: 1 
            }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ fontSize: 16, width: 90 }}>Cat Name:</Text>
                    <Text style={{ fontSize: 16, color: 'rgba(0,0,0,0.3)' }}>{props.selected}</Text>
                </View>
            </View>
        </Touchable>
    )
}

export const selectDrilldown = (props: SelectDrilldownProps) => {

    const [cats, setCats] = useState<string[]>()
    const [newCat, setNewCat] = useState<string>()

    useEffect(() => {
        const sub = props.navigation.addListener('didFocus', navProps => fetchList())
        return () => sub.remove()
    }, [])

    const fetchList = async () => {
        try {
            const value = await AsyncStorage.getItem('cats')
            setCats(value ? JSON.parse(value) : [])
        } catch (e) {
            throw new Error(e) 
        }
    }

    return (
        <ScrollView>
            { cats && cats.map((el, i) =>
                <Text key={i}>{el}</Text>
            )}
            <TextInput
            value={newCat}
            onChangeText={text => setNewCat(text)}
            />
        </ScrollView>
    )
}

export interface SelectCat {
    navigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>
    selected: string
}

export interface SelectDrilldownProps extends NavigationScreenProps {

}