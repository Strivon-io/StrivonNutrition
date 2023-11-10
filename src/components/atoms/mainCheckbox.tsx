import React, { Dispatch, ReactNode, useState } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../constants/theme'

interface Props {
  isChecked: boolean
  setIsChecked: () => void
}

export const MainCheckbox = ({ isChecked, setIsChecked }: Props) => {
  return (
    <CheckboxContainer onPress={setIsChecked}>
      {isChecked ? (
        <CheckboxChecked>
          <Checkmark>&#10003;</Checkmark>
        </CheckboxChecked>
      ) : (
        <CheckboxUnchecked />
      )}
    </CheckboxContainer>
  )
}

const CheckboxContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`

const CheckboxUnchecked = styled(View)`
  width: 24px;
  height: 24px;
  border-width: 2px;
  border-color: ${colors.Alizarin};
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`

const CheckboxChecked = styled(View)`
  width: 24px;
  height: 24px;
  background-color: ${colors.Alizarin};
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`

const Checkmark = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: bold;
`

const Label = styled(Text)`
  margin-left: 10px;
  font-size: 16px;
`
