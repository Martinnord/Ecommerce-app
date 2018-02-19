import React from 'react'
import { View, TextInput, Text, StyleSheet, Button } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const styles = StyleSheet.create({
  field: {
    borderBottomWidth: 1,
    fontSize: 20,
    marginBottom: 20
  }
})

class Signup extends React.Component {
  state = {
    values: {
      name: '',
      email: '',
      password: ''
    },
    errors: {},
    isSubmitting: false
  }

  submit = async () => {
    this.setState({ isSubmitting: true })
    let response
    try {
      response = await this.props.mutate({
        variables: this.state.values
      })
    } catch (err) {
      console.log(err)
    }

    console.log(response)
    this.setState({ isSubmitting: false })
  }

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value
      }
    }))
  }

  render() {
    const { values: { name, email, password } } = this.state

    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View style={{ width: 200 }}>
          <TextInput
            onChangeText={text => this.onChangeText('name', text)}
            value={name}
            style={styles.field}
            placeholder="name"
          />
          <TextInput
            onChangeText={text => this.onChangeText('email', text)}
            style={styles.field}
            value={email}
            placeholder="email"
          />
          <TextInput
            onChangeText={text => this.onChangeText('password', text)}
            style={styles.field}
            value={password}
            placeholder="password"
            secureTextEntry
          />
          <Button title="Signup" onPress={this.submit} />
        </View>
      </View>
    )
  }
}

const signupMutation = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`

export default graphql(signupMutation)(Signup)
