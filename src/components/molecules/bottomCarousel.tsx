import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { LeftArrow } from '@components/atoms/icons/leftArrow'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MainText } from '@components/atoms/mainText'
import { useTranslation } from 'react-i18next'
import { LeftChevron } from '@components/atoms/icons/leftChevron'
import { colors, iconSize, spacing, spacingPx } from '@constants/theme'
import { RightChevron } from '@components/atoms/icons/rightChevron'

export const BottomCarousel = ({
  getPagination,
  onPressRightArrow = () => null,
  onPressLeftArrow = () => null,
  hasLeftArrow = false,
  hasRightArrow = false,
}) => {
  const { t } = useTranslation()
  return (
    <MainContainer>
      <TouchableOpacity onPress={onPressLeftArrow}>
        <LeftArrowContainer hasLeftArrow={hasLeftArrow}>
          <LeftChevron size={iconSize.s} color={colors.Alizarin} />
          <MainText
            style={{ marginLeft: spacing.s }}
            fontType="medium"
            color={colors.Alizarin}
          >
            {t('previous')}
          </MainText>
        </LeftArrowContainer>
      </TouchableOpacity>
      <PaginationWrapper>{getPagination}</PaginationWrapper>
      <TouchableOpacity onPress={onPressRightArrow}>
        <RightArrowContainer hasRightArrow={hasRightArrow}>
          <MainText
            style={{ marginRight: spacing.s }}
            fontType="medium"
            color={colors.Alizarin}
          >
            {t('next')}
          </MainText>
          <RightChevron size={iconSize.s} color={colors.Alizarin} />
        </RightArrowContainer>
      </TouchableOpacity>
    </MainContainer>
  )
}

const PaginationWrapper = styled(View)`
  align-items: center;
  margin: 0 ${spacingPx.m};
`

const MainContainer = styled(View)`
  align-self: center;
  display: flex;
  flex-direction: row;
`

const LeftArrowContainer = styled(View)<{ hasLeftArrow: boolean }>`
  flex-direction: row;
  align-items: center;
  opacity: ${(props) => (props.hasLeftArrow ? 1 : 0.2)};
`

const RightArrowContainer = styled(View)<{
  hasRightArrow: boolean
}>`
  flex-direction: row;
  align-items: center;
  opacity: ${(props) => (props.hasRightArrow ? 1 : 0.2)};
`
