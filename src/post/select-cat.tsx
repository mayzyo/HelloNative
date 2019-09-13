import React, { useState } from 'react'
import { NavigationScreenProp, NavigationRoute, NavigationParams, ScrollView } from 'react-navigation'
import Touchable from 'react-native-platform-touchable'
import { Text, View, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default (props: SelectCat) => {

    const handleDrilldown = async () => {
        try {
            const value = await AsyncStorage.getItem('cats')

            props.navigation.push('Drilldown', { 
                title: 'Select A Cat',
                content: 
                <SelectDrilldown 
                navigation={props.navigation} cats={value ? JSON.parse(value) : []} 
                handleSelect={props.handleSelect}
                />
            })

        } catch (e) {
            throw new Error(e) 
        }
    }

    return (
        <Touchable onPress={handleDrilldown}>
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

export const SelectDrilldown = (props: SelectDrilldownProps) => {
    
    const [cats, setCats] = useState(props.cats)
    const [newCat, setNewCat] = useState<string>()

    const handleComplete = async () => {
        if(newCat == undefined) return

        try {
            await AsyncStorage.setItem('cats', JSON.stringify([...cats, newCat]))
        } catch (e) {
            throw new Error(e) 
        }

        setCats(p => [...p, newCat])
        const added = newCat
        setNewCat('')
        console.log('added new cat')
        setTimeout(() => {
            props.handleSelect(added)
            props.navigation.navigate('Post')
        }, 1000)
    }

    return (
        <ScrollView>
            { cats && cats.map((el, i) =>
                <Touchable key={i} onPress={() => {
                    props.handleSelect(el)
                    props.navigation.navigate('Post')
                }}>
                    <Text
                    style={{ 
                        marginHorizontal: 20,
                        height: 75, 
                        textAlignVertical: 'center',
                        borderBottomWidth: 1, 
                        borderBottomColor: 'rgba(0,0,0,0.1)' 
                    }}>
                        {el}
                    </Text>
                </Touchable>

            )}
            <TextInput
            style={{ marginHorizontal: 20, height: 75, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' }}
            value={newCat}
            onChangeText={text => setNewCat(text)}
            onSubmitEditing={() => handleComplete()}
            placeholder="add new cat..."
            returnKeyType="done"
            returnKeyLabel="add"
            />
        </ScrollView>
    )
}

export interface SelectCat {
    navigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>
    selected: string
    handleSelect: (cat: string) => void
}

export interface SelectDrilldownProps {
    navigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>
    cats: string[]
    handleSelect: (cat: string) => void
}