import { RightChevron } from '@components/atoms/icons/rightChevron'
import { MainCheckbox } from '@components/atoms/mainCheckbox'
import { MainText } from '@components/atoms/mainText'
import { MainButton } from '@components/molecules/mainButton'
import { colors, iconSize, spacing, spacingPx } from '@constants/theme'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { styled } from 'styled-components'

interface Props {
  handleValidate: () => void
}

export const ValidateFormBlock = ({ handleValidate }: Props) => {
  const { t } = useTranslation()
  const [isChecked, setIsChecked] = useState(false)
  const handleIsChecked = () => setIsChecked(!isChecked)
  return (
    <ValidateFormBlockWrapper>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{ marginRight: spacing.xs }}>
          <MainCheckbox isChecked={isChecked} setIsChecked={handleIsChecked} />
        </View>
        <TouchableOpacity onPress={handleIsChecked}>
          <MainText>{t('i-accept-the')}</MainText>
        </TouchableOpacity>
        <MainText color={colors.Alizarin} underline>
          {' '}
          {t('terms-of-use')}
        </MainText>
      </View>
      <View style={{ marginTop: spacing.m }}>
        <MainButton
          label={t('next')}
          onPress={handleValidate}
          icon={<RightChevron size={iconSize.s} />}
        />
      </View>
    </ValidateFormBlockWrapper>
  )
}

const ValidateFormBlockWrapper = styled(View)`
  position: absolute;
  width: 100%;
  bottom: ${spacingPx.m};
`
