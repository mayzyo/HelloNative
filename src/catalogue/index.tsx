import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import CatList from './cat-list'
import Dashboard from './dashboard'

export default (props: Catalogue) => {

    return (
        <View>
            <Dashboard />
            <CatList navigation={props.navigation} />
        </View>
    )
}

export const CatalogueNavOptions = ({ navigation }: NavigationScreenProps) => ({
    title: 'Cat-alogue',
    headerRight: 
    <View style={{ margin: 10 }}>
        <Button title='New Post' onPress={() => navigation.navigate('Post')} />
    </View>,
})

export interface Catalogue extends NavigationScreenProps {

}