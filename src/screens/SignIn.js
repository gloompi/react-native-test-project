import React, {Component} from 'react'
import {View, TextInput, Image, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

import {getAuth, postAuth} from '../ducks/auth'
import InputView from '../components/InputView'

class SignIn extends Component{
    state = {
        data: {}
    }

    componentDidMount() {
        const {getAuth, loaded, loading} = this.props
        if(!loaded && !loading) getAuth()
    }

    render(){
        const {entities, loaded, loading, auth} = this.props.auth
        if(!loaded || loading) return <View style={styles.container}>
            <Image style={styles.img} source={{uri: 'https://um.undip.ac.id/wp-content/uploads/2017/08/loading.gif'}} />
        </View>
        return(
            <View style={styles.container}>
                <Text style={{color: 'red'}}>{auth == false ? 'Неверный логин или пароль' : ''}</Text>
                {entities.map(data => <InputView key={data.id} data={data} setValue={this.setValue}/>)}
                <TouchableOpacity style={styles.btn} onPress={this.handleSubmit}>
                    <Text style={styles.btnText}>Войти</Text>
                </TouchableOpacity>
            </View>
        )
    }

    handleSubmit = () => {
        const {postAuth, navigation, auth} = this.props
        postAuth(this.state.data)
        if(auth.auth) navigation.navigate('Main')
    }

    setValue = (item, value) => {
        this.setState(prevState => ({
            data: {...prevState.data, [item]: value}
        }))
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    img: {
        height: 150,
        width: 150
    },
    btn:{
        width: '80%',
        padding: 15,
        backgroundColor: '#000'
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18
    }
})

export default connect(({auth}) => ({auth}), {getAuth, postAuth})(SignIn)