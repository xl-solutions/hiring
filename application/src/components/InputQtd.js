import React from 'react'
import { TextInput } from 'react-native'

export default function InputQtd({ colors, value, change, placeholder, onSubmit }) {
    return <TextInput
        value={value}
        keyboardType={'numeric'}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        maxLength={8}
        onChangeText={(text) => change(text.replace(/[^0-9]/g, ''))}
        style={{
            paddingHorizontal: 20,
            fontSize: 15,
            paddingVertical: 2,
            marginBottom: 10,
            marginTop: 5,
            borderBottomWidth: 1.5,
            textAlign: 'center',
            borderColor: colors.text
        }} />
}
