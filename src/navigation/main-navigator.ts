import { createStackNavigator, NavigationScreenProps, NavigationTransitionProps } from 'react-navigation'
import { fromRight, fromBottom } from 'react-navigation-transitions'

import Catalogue, { CatalogueNavOptions } from '../catalogue'
import Post, { PostNavOptions } from '../post'
import tester from '../tester'
import Drilldown, { DrilldownNavOptions } from '../drilldown'

const defaultOptions = ({ navigation }: NavigationScreenProps) => ({
    title: navigation.state.routeName,
})

const stackTransition = ({ scene, scenes }: NavigationTransitionProps) => 
scene.route.routeName == 'Post' || scenes[scenes.length - 1].route.routeName == 'Post'
? fromBottom()
: fromRight()
// transitionConfig: () => ({
//     transitionSpec: {
//         duration: 300,
//         easing: Easing.out(Easing.poly(4)),
//         timing: Animated.timing,
//     },
//     screenInterpolator: sceneProps => {
//         const { layout, position, scene } = sceneProps;
//         const { index } = scene;

//         const height = layout.initHeight;
//         const translateY = position.interpolate({
//             inputRange: [index - 1, index, index + 1],
//             outputRange: [height, 0, 0],
//         });

//         const opacity = position.interpolate({
//             inputRange: [index - 1, index - 0.99, index],
//             outputRange: [0, 1, 1],
//         });

//         // Basically you need to create a condition for individual scenes
//         if (sceneProps.scene.route.routeName === 'Post') {

//             return { opacity, transform: [{ translateY }] };
//         }

//         return { opacity, transform: [{ translateX: translateY }] };
//     },
// }),

const StackNavigator = createStackNavigator(
    {
        Catalogue: {
            screen: Catalogue,
            navigationOptions: CatalogueNavOptions,
        },
        Post: {
            screen: Post,
            navigationOptions: PostNavOptions,

        },
        Drilldown: {
            screen: Drilldown,
            navigationOptions: DrilldownNavOptions,
        },
        Tester: {
            screen: tester,
            navigationOptions: defaultOptions
        }
    },
    {
        initialRouteName: 'Catalogue',
        transitionConfig: stackTransition
    },
)

export default StackNavigator