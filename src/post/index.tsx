import React, { useState } from 'react'
import { View, Text, Button, TouchableWithoutFeedback, Image, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationScreenProps } from 'react-navigation'
import ImagePicker from 'react-native-image-crop-picker'
import Entry from '../models/entry'

import SelectCat from './select-cat'

import dPortrait from '../assets/default-portrait.png'

const WIDTH = Dimensions.get('window').width

export default (props: Post) => {
    // const [portrait, setPortrait] = useState<any>(dPortrait)
    const [entry, setEntry] = useState<Entry>(props.navigation.getParam('entry') || {})
    const [disabled, setDisabled] = useState<boolean>()

    const handleCamera = async () => {
        const image = await ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        })

        console.log(image)
        setEntry(p => {
            return {
                ...p,
                image: (image as any).data,
                mimeType: (image as any).mime
            }
        })
    }

    const handleSubmit = async (entry: Entry) => {
        setDisabled(true)
        if (!entry.created) entry.created = new Date()
        entry.modified = new Date()
        let entries: { [key:string]: Entry }
    
        try {
            const value = await AsyncStorage.getItem('entries')
            entries = value ? JSON.parse(value) : {}
        } catch (e) {
            setDisabled(false)
            throw new Error(e) 
        }
    
        entries[entry.created.toISOString()] = entry
    
        try {
            await AsyncStorage.setItem('entries', JSON.stringify(entries))
        } catch (e) {
            throw new Error(e)
        } finally {
            setDisabled(false)
            props.navigation.goBack()
        }
    }

    return (
        <>
            <View style={{ margin: 20 }}>
                <TextInput
                    style={{ textAlignVertical: 'top' }}
                    multiline={true}
                    numberOfLines={6}
                    maxLength={140}
                    placeholder="Say something..."
                    value={entry.brief}
                    onChangeText={text => setEntry(p => { return { ...p, brief: text } })}
                />
                <TouchableWithoutFeedback onPress={handleCamera}>
                    <Image source={entry.image ? { uri: `data:${entry.mime};base64,${entry.image}` } : dPortrait} style={{ height: 120, width: 120 }} />
                </TouchableWithoutFeedback>


            </View>
            <KeyboardAvoidingView behavior="height">

            </KeyboardAvoidingView>
            <View style={{ position: 'absolute', bottom: 150, width: WIDTH - 40, margin: 20 }}>
                <SelectCat navigation={props.navigation} selected="Abbott" />
                <Button title="Post" onPress={() => handleSubmit(entry)} />
            </View>
        </>
    )
}

export const PostNavOptions = ({ navigation: { state: { params } } }: NavigationScreenProps) => ({
    title: params && params.entry ? params.entry.created.toDateString() : 'New Post',
})

export interface Post extends NavigationScreenProps {

}