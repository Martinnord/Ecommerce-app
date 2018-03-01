import React from "react";
import { TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  authField: {
    fontSize: 20,
    marginBottom: 10,
    borderStyle: "solid",
    height: 50,
    borderWidth: 2,
    borderColor: "#F0F3F7",
    borderRadius: 5,
    backgroundColor: "#FFF",
    paddingHorizontal: 10
  }
});

export default class TextField extends React.PureComponent {
  onChangeText = text => {
    const { onChangeText, name } = this.props;
    onChangeText(name, text);
  };

  render() {
    const { value, secureTextEntry, name } = this.props;

    return (
      <TextInput
        onChangeText={this.onChangeText}
        value={value}
        style={styles.authField}
        placeholder={name}
        autoCapitalize="none"
        secureTextEntry={!!secureTextEntry}
      />
    );
  }
}
