import styled from 'styled-components'
import { Image, View } from 'react-native'

export const HeaderLogo = () => {
  return (
    <LogoHeaderStyled>
      <StrivonLogo
        source={require('@assets/brand/Strivon.png')}
        resizeMode="contain"
      />
    </LogoHeaderStyled>
  )
}

const LogoHeaderStyled = styled(View)`
  justify-content: center;
  align-items: center;
`

const StrivonLogo = styled(Image)`
  width: 100px;
`
