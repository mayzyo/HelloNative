import React, { useState, useEffect } from 'react'
import { SectionList, View, Text, Platform, Image } from 'react-native'
import Touchable from 'react-native-platform-touchable'
import { NavigationScreenProp, NavigationRoute, NavigationParams } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'
import Entry from '../models/entry'

const mock: Entry[] = [
    {
        cat: 'Abbott',
        brief: 'a brief summary',
        created: new Date(),
        modified: new Date()
    },
    {
        cat: 'Abbott',
        brief: 'a brief summary2',
        created: new Date('08/25/2019'),
        modified: new Date('08/25/2019')
    }
]

const group = (entries: Entry[]) => {

    const t = entries.reduce((acc, cur) => {        
        if(cur.created.getMonth == acc[acc.length - 1].title.getMonth) {
            acc[acc.length - 1].data.push(cur)
        } else {
            acc.push({ title: cur.created, data: [cur] })
        }

        return acc
    }, new Array<{ title: Date, data: Entry[] }>({ title: entries[0].created, data: [] }))
    console.log('tester', t)
    return t
}

export default (props: CatList) => {

    const [entries, setEntries] = useState(mock)

    useEffect(() => {
        const sub = props.navigation.addListener('didFocus', navProps => fetchList())
        return () => sub.remove()
    }, [])

    const fetchList = async () => {
        let dict: { [key:string]:Entry } = {}
        try {
            const value = await AsyncStorage.getItem('entries')
            dict = value ? JSON.parse(value) : {}
        } catch (e) {
            throw new Error(e) 
        } finally {
            Object.keys(dict).forEach(key => {
                dict[key].created = new Date(dict[key].created)
                dict[key].modified = new Date(dict[key].modified)
            })
            setEntries(Object.keys(dict).map(key => dict[key]).concat(mock))
        }
    }

    return (
        <EntrySectionList
        ItemSeparatorComponent={() => 
            <View style={{ 
                height: 1, 
                flex: 1, 
                marginLeft: Platform.OS == 'ios' ? 70 : 14, 
                marginRight: 14, 
                backgroundColor: 'rgba(0,0,0,0.1)' 
            }} />
        }
        sections={group(entries.sort((a, b) => 
            a.created > b.created ? -1 : a.created < b.created ? 1 : 0
        ))}
        keyExtractor={item => item.created.toISOString()}
        renderSectionHeader={({section: { title }}) => 
            <Text style={{ padding: 4, paddingLeft: '10%', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                {title.getMonth()} - {title.getFullYear()}
            </Text>
        }
        renderItem={({ item }) => 
            <Touchable onPress={() => props.navigation.navigate('Post', { entry: item })}>
                <View style={{ flex: 1, flexDirection: 'row', margin: 14 }}>
                    { item.image &&
                        <Image source={{ uri: `data:${item.mime};base64,${item.image}` }} style={{ height: 53, width: 53 }} />
                    }
                    
                    <View style={{ flex: 1, marginLeft: 16 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.cat}</Text>  
                        <Text>{item.brief}</Text>
                        <Text style={{ textAlign: 'right', fontSize: 10 }}>{item.modified.toDateString()}</Text>
                    </View>
                </View>
            </Touchable>
        }
        />
    )
}

const EntrySectionList = SectionList as SectionList<Entry>

export interface CatList {
    navigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>
}