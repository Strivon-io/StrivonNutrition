import React from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { colors, iconSize, spacing, spacingPx } from '@constants/theme'
import Icon from 'react-native-vector-icons/FontAwesome' // Remplacez par la bibliothèque d'icônes que vous utilisez
import { HomeIcon } from './icons/homeIcon'
import { RecipeIcon } from './icons/recipeIcon'
import { ScheduleIcon } from './icons/scheduleIcon'
import { ProfileIcon } from './icons/profileIcon'
import { MainText } from '@components/atoms/mainText'
import { styled } from 'styled-components'

export const TabBar = ({ state, descriptors, navigation }) => {
  const icons = {
    Home: <HomeIcon size={iconSize.m} />,
    Recipe: <RecipeIcon size={iconSize.m} />,
    Schedule: <ScheduleIcon size={iconSize.m} />,
    Profile: <ProfileIcon size={iconSize.m} />,
  }

  const tabBarHeight = Platform.select({
    ios: 100,
    android: 100,
  })

  return (
    <View
      style={{
        flexDirection: 'row',
        height: tabBarHeight,
        backgroundColor: colors.light.PureWhite,
        ...boxShadow,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        const iconColor = isFocused
          ? colors.medium.StormyCloud
          : colors.medium.LinkWater
        const icon = React.cloneElement(icons[route.name], { color: iconColor })

        return (
          <TabbarWrapper
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
          >
            {icon}
            <MainText
              style={{ marginTop: spacing.xs }}
              fontSize="xs"
              fontType="medium"
              color={isFocused ? colors.Alizarin : colors.medium.LinkWater}
            >
              {label}
            </MainText>
          </TabbarWrapper>
        )
      })}
    </View>
  )
}

const TabbarWrapper = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  padding-top: ${spacingPx.s};
`

const boxShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
}
