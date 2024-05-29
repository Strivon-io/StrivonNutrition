import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import Markdown from 'react-native-markdown-display'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { boxShadow, colors, iconSize, spacing } from '~constants/theme'
import { CrossIcon } from '~assets/icons/crossIcon'
import { BottomFixedButton } from '~components/organisms/bottomFixedButton'

import { RecipeTitleAndInformations } from './components/organisms/recipeTitleAndInformations'
import { RecipesNavigatorParamList } from '~navigators/recipes-navigator'
import { Layout } from '~components/layout/layout'
import { useRoute } from '@react-navigation/native'

import { getRecipeById } from '~services/routes/recipe'
import { useQuery } from '@tanstack/react-query'
import { Text } from '~components/atoms/text'

type RecipeScreenProps = NativeStackScreenProps<
  RecipesNavigatorParamList,
  'recipe'
>

export const RecipeScreen: FC<RecipeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const route = useRoute()
  const { recipeId } = route.params

  console.log('recipeId', recipeId)

  const { data, isLoading } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeById(recipeId),
  })

  console.log('data--->>>>', data)

  const handleBackPress = () => {
    navigation.goBack()
  }

  const scrollA = useSharedValue(0)
  const BANNER_H = 150

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollA.value = event.contentOffset.y
  })


  const ImageSection = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollA.value,
            [-BANNER_H, 0, BANNER_H],
            [-BANNER_H / 2, 0, BANNER_H * 0.75],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }
  })

  return (
    <Layout noPadding withoutTopSafeArea withoutBottomSafeArea>
      {!isLoading && (
        <>
          <Animated.ScrollView
            style={{ marginBottom: 50 }}
            onScroll={scrollHandler}
            scrollEventThrottle={10}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={ImageSection}>
              <TouchableOpacity
                style={styles.iconInputWrapper}
                onPress={handleBackPress}
              >
                <CrossIcon size={iconSize.m} color={colors.Alizarin} />
              </TouchableOpacity>
              <Image
                style={styles.dishImage}
                source={{ uri: data.image }}
                resizeMode="cover"
              />
              <View style={styles.overlay} />
            </Animated.View>
            <View style={{ paddingHorizontal: 20 }}>
              <RecipeTitleAndInformations
                title={data.name}
                informations={{
                  protein: data.proteins,
                  carbohydrate: data.carbs,
                  calories: data.calories,
                }}
              />
              <View style={styles.introductionWrapper}>
                <Text fontFamily="Avenir-Bold" fontSize="l">
                  Ingrédients
                </Text>
                <View style={styles.ingredientsWrapper}>
                  {data?.ingredients.map((ingredient) => (
                    <Text
                      style={styles.ingredientText}
                      key={ingredient.name}
                      fontSize="m"
                    >
                      {`- ${ingredient.name} : ${ingredient.quantity} ${ingredient.unity}`}
                    </Text>
                  ))}
                </View>
                <View style={styles.instructionsWrapper}>
                  <Text fontFamily="Avenir-Bold" fontSize="l">
                    Instructions
                  </Text>
                  <View style={styles.instructionsList}>
                    {data?.instructions.map((instruction, i) => (
                      <Text
                        style={styles.ingredientText}
                        key={instruction}
                        fontSize="m"
                      >
                        {`${i + 1} - ${instruction}`}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </Animated.ScrollView>
          <BottomFixedButton
            label={t('programmeThisRecipe')}
            onPress={() => {}}
          />
        </>
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  instructionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  instructionsWrapper: {
    marginTop: spacing.s,
  },
  ingredientText: {
    marginBottom: spacing.xs,
  },
  ingredientsWrapper: {
    marginTop: spacing.xs,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  iconInputWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: spacing.l + 10,
    right: spacing.m,
    borderRadius: spacing.xl,
    borderWidth: 2,
    borderColor: colors.Alizarin,
  },
  dishImage: {
    width: '100%',
    height: 300,
  },
  introductionWrapper: {
    ...boxShadow,
    width: '100%',
    transform: [{ translateY: -80 }],
    marginTop: spacing.m,
    alignSelf: 'center',
    backgroundColor: colors.light.PureWhite,
    borderRadius: spacing.xs,
    padding: spacing.m,
  },
})

const markdownStyles = {
  heading1: {
    marginBottom: spacing.xs,
    marginTop: spacing.m,
  },
  heading2: {
    marginBottom: spacing.xs,
    marginTop: spacing.s,
  },
  text: {
    lineHeight: 20,
  },
}
