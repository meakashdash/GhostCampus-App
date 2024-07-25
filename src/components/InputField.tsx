import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

interface InputFieldProps {
  placeholder: string;
  width: number;
  keyboardType?:string
  autoCapitalize?:string
}

export const InputField = ({
  placeholder,
  width,
  keyboardType,
  autoCapitalize,
  ...props
}: InputFieldProps & TextInputProps): React.JSX.Element => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={[styles.input,{width:width}]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 25,
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-Medium',
    color:"#ffffff"
  },
});
