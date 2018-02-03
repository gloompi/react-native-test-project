import {StackNavigator} from 'react-navigation'
import SignIn from './screens/SignIn'
import Main from './screens/Main'

const RootNavigator = StackNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            title: 'Вход'
        }
    },
    Main: {
        screen: Main,
        navigationOptions: {
            title: 'Профиль пользователя'
        }
    }
})

export default RootNavigator