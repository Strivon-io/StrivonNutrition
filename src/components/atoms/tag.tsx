import { View } from 'react-native'
import styled from 'styled-components/native'
import { colors, spacingPx } from '@constants/theme'
import { MainText } from './mainText'

interface Props {
  label: string
}

const TagStyle = styled(View)<{ label: string }>`
  justify-content: center;
  align-items: center;
  width: 70px;
  border-radius: ${spacingPx.xs};
  background-color: ${(props) =>
    props.label === 'snack'
      ? colors.tags.orange
      : props.label === 'meal'
      ? colors.tags.green
      : colors.tags.blue};
  padding: 4px 0;
`

const Tag = ({ label }: Props) => {
  return (
    <TagStyle label={label}>
      <MainText fontType="medium" fontSize="xs">
        {label}
      </MainText>
    </TagStyle>
  )
}

export default Tag
