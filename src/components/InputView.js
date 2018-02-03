import React, {Component} from 'react'
import {View, TextInput, StyleSheet, Platform} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'

class InputView extends Component{
    state = {
        value: ''
    }

    render(){
        const {id, label, input_type, required} = this.props.data
        const {value} = this.state
        return(
            <View style={styles.inputWrap}>
                <FontAwesome name={this.getIcon()} size={25} color="#1D222C" />
                <TextInput 
                    style={styles.input} 
                    value={value}
                    keyboardType="default"
                    secureTextEntry={input_type == 'password' ? true : false}
                    placeholder={label}
                    onChangeText={this.handleChange}
                    required={required} />
            </View>
        )
    }

    handleChange = (value) => {
        const {setValue, data} = this.props
        setValue(data.short_name, value)
        return this.setState({value})
    }

    getIcon = () => {
        const {short_name} = this.props.data
        switch (short_name) {
            case 'login':
                return 'user'

            case 'password':
                return 'lock'

            default:
                return 'star-o'
        }
    }
}

const styles = StyleSheet.create({
    inputWrap: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '80%',
		marginBottom: 20,
	},
	input: {
		height: 35,
		width: '90%',
		paddingLeft: 5,
		paddingBottom: 10,
		...Platform.select({
			ios: {
				borderBottomColor: '#1D222C',
        		borderBottomWidth: 1
			}
		})
	}
})

export default InputView