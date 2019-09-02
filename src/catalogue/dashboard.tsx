import React from 'react'
import { View, Text } from 'react-native'

export default (props: Dashboard) => {
    return (
        <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-evenly', 
            margin: 10,
            paddingHorizontal: 5,
            paddingVertical: 25,
            elevation: 2,
            shadowColor: 'rgba(0,0,0,0.3)',
            shadowOpacity: 0.2,
            shadowRadius: 2.5,
            shadowOffset: { width: 0, height: 1 },
            borderRadius: 6,
            backgroundColor: 'white'
            }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>No. of Cats</Text>
                <Text style={{ fontSize: 24 }}>20</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>Frequency</Text>
                <Text style={{ fontSize: 24 }}>20/mo</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>Last Post</Text>
                <Text style={{ fontSize: 24 }}>20</Text>
            </View>
        </View>
    )
}

export interface Dashboard {

}