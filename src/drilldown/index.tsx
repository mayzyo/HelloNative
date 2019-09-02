import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

export default (props: Drilldown) => {

    return props.navigation.getParam('content')
}

export const DrilldownNavOptions = ({ navigation }: NavigationScreenProps) => ({
    title: navigation.getParam('title'),
})

export interface Drilldown extends NavigationScreenProps {

}