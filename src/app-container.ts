import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import { fromLeft } from 'react-navigation-transitions'

import Main from './Main'
import Secondary from './Secondary'
import Optional from './Optional'

const StackNavigator = createStackNavigator(
    {
        Main: {screen: Main},
        Optional: {screen: Optional}
    },
    {
        initialRouteName: 'Main',
        transitionConfig: () => fromLeft(),
    },
)

const MainNavigator = createBottomTabNavigator({
    App: StackNavigator,
    Secondary: {screen: Secondary}
});

const appContainer = createAppContainer(MainNavigator);

export default appContainer;