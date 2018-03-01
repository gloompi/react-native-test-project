import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

class Main extends Component{
    render(){
        const {auth} = this.props
        return(
            <View>
                <Text>Main</Text>
            </View>
        )
    }
}

export default connect(state => ({
    auth: state.auth.auth
}))(Main)