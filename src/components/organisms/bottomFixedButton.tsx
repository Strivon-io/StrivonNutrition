import { LayoutSideColumns } from '@components/layout/layoutSideColumns'
import { MainButton } from '@components/molecules/mainButton'
import { boxShadow, spacing } from '@constants/theme'
import { isSmallScreen } from '@utils/deviceDetector'
import { View } from 'react-native'
import styled from 'styled-components'

interface Props {
  label: string
  onPress: () => void
}

export const BottomFixedButton = ({ label, onPress }: Props) => {
  return (
    <ValidateBlockWrapper>
      <LayoutSideColumns>
        <View
          style={{
            marginBottom: isSmallScreen ? spacing.s : spacing.l,
          }}
        >
          <View style={{ marginTop: spacing.m }}>
            <MainButton style={boxShadow} label={label} onPress={onPress} />
          </View>
        </View>
      </LayoutSideColumns>
    </ValidateBlockWrapper>
  )
}

const ValidateBlockWrapper = styled(View)`
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: transparent;
`
