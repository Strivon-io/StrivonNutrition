import { Dispatch, SetStateAction, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { styled } from 'styled-components'

import { Text } from '~components/atoms/text'
import { MainButton } from '~components/molecules/mainButton'
import { MainInput } from '~components/molecules/mainInput'
import { spacing, spacingPx } from '~constants/theme'

interface Props {
  gender: string | null
  setGender: Dispatch<SetStateAction<string>>
  goal: string | null
  setGoal: Dispatch<SetStateAction<string>>
}

export const StepTwo: FC<Props> = ({ gender, setGender, goal, setGoal }) => {
  const { t } = useTranslation()

  return (
    <View style={{ marginTop: spacing.m, marginBottom: spacing.s }}>
      <MainInput
        label={t('my-size-(in-cm)')}
        placeholder="180"
        keyboardType="default"
      />
      <View style={{ marginTop: spacing.s, marginBottom: spacing.s }}>
        <MainInput
          label={t('my-weight-(in-kg)')}
          placeholder="73.2"
          keyboardType="default"
        />
      </View>
      <MainInput
        label={t('my-birth-date')}
        placeholder="01/04/2000"
        keyboardType="default"
      />
      <View style={{ marginTop: spacing.s }}>
        <Text fontFamily="Avenir-Medium" color="Alizarin">
          {`${t('i-was-born-as-a')} :`}
        </Text>
        <ButtonWrapper>
          <View style={{ width: '49%' }}>
            <MainButton
              label={t('woman')}
              isHighlighted={gender !== 'female'}
              onPress={() => setGender('female')}
            />
          </View>
          <View style={{ width: '49%' }}>
            <MainButton
              label={t('man')}
              isHighlighted={gender !== 'male'}
              onPress={() => setGender('male')}
            />
          </View>
        </ButtonWrapper>
      </View>
      <View style={{ marginTop: spacing.s }}>
        <Text fontFamily="Avenir-Medium" color="Alizarin">
          {`${t('my-goal')} :`}
        </Text>
        <ButtonWrapper>
          <View style={{ width: '49%' }}>
            <MainButton
              label={t('lose-weight')}
              onPress={() => setGoal('lose')}
              isHighlighted={goal !== 'lose'}
            />
          </View>
          <View style={{ width: '49%' }}>
            <MainButton
              label={t('gain-weight')}
              onPress={() => setGoal('gain')}
              isHighlighted={goal !== 'gain'}
            />
          </View>
        </ButtonWrapper>
      </View>
      <View style={{ marginBottom: 150 }} />
    </View>
  )
}

const ButtonWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${spacingPx.xs};
`
