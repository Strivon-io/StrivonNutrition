import React, { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Markdown from "react-native-markdown-display";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { boxShadow, colors, iconSize, spacing } from "~constants/theme";
import { CrossIcon } from "~assets/icons/crossIcon";
import { BottomFixedButton } from "~components/organisms/bottomFixedButton";

import { RecipeTitleAndInformations } from "./components/organisms/recipeTitleAndInformations";
import { RecipesNavigatorParamList } from "~navigators/recipes-navigator";
import { Layout } from "~components/layout/layout";
import { useRoute } from "@react-navigation/native";

import { getRecipeById } from "~services/routes/recipe";
import { useQuery } from "@tanstack/react-query";
import { Text } from "~components/atoms/text";
import { RightChevron } from "~assets/icons/rightChevron";
import BottomSheet from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { MainButton } from "~components/molecules/mainButton";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";

type RecipeScreenProps = NativeStackScreenProps<
  RecipesNavigatorParamList,
  "recipe"
>;

export const RecipeScreen: FC<RecipeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const route = useRoute();
  const { recipeId } = route.params;

  const { data, isLoading } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => getRecipeById(recipeId),
  });

  const handleBackPress = () => {
    navigation.navigate("recipes");
  };

  const scrollA = useSharedValue(0);
  const BANNER_H = 150;

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollA.value = event.contentOffset.y;
  });

  const ImageSection = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollA.value,
            [-BANNER_H, 0, BANNER_H],
            [-BANNER_H / 2, 0, BANNER_H * 0.75],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const dateSelectorRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();

  const handleDateSelector = () => {
    dateSelectorRef.current?.expand();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: new Date(),
      mealType: "breakfast",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

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
                  {t("recipeScreen.ingredients")}
                </Text>
                <View style={styles.ingredientsWrapper}>
                  {data?.ingredients.map((ingredient) => (
                    <View style={styles.ingredientText} key={ingredient.name}>
                      <Text fontSize="m">
                        {`${ingredient.name} : ${ingredient.quantity} ${ingredient.unity}`}
                      </Text>
                      <RightChevron color="black" size={12} />
                      <Text
                        fontFamily="Avenir-Bold"
                        color="Alizarin"
                      >{`${ingredient.calories}Kcal`}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.instructionsWrapper}>
                  <Text fontFamily="Avenir-Bold" fontSize="l">
                    {t("recipeScreen.instructions")}
                  </Text>
                  <View style={styles.instructionsList}>
                    {data?.instructions.map((instruction) => (
                      <View key={instruction.step.toString()}>
                        <Text
                          fontFamily="Avenir-Bold"
                          fontSize="m"
                        >{`${instruction.step.toString()} - ${
                          instruction.title
                        }`}</Text>
                        <Markdown>{instruction.description}</Markdown>
                      </View>
                    ))}
                  </View>
                  <View style={styles.signatureWrapper}>
                    <Text fontFamily="Avenir-Medium" color="medium.StormyCloud">
                      {t("recipeScreen.recipeBy")}
                    </Text>
                    <Image
                      style={styles.logo}
                      source={require("~assets/brand/Strivon.png")}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </View>
            </View>
          </Animated.ScrollView>
          <BottomFixedButton
            label={t("programmeThisRecipe")}
            onPress={handleDateSelector}
          />

          <BottomSheet
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 10,
                height: 0,
              },
              shadowOpacity: 0.5,
              shadowRadius: 10,
              elevation: 0,
            }}
            ref={dateSelectorRef}
            snapPoints={["95%"]}
            index={-1}
            enablePanDownToClose={true}
            bottomInset={-insets.bottom}
            backgroundStyle={{
              backgroundColor: colors.White,
            }}
          >
            <View style={styles.bottomSheetContent}>
              <Text
                fontFamily="Avenir-Bold-Italic"
                color="Alizarin"
                fontSize="l"
              >
                {t("recipeScreen.scheduleThisRecipe")}
              </Text>
              <View>
                <Text fontFamily="Avenir-Medium" fontSize="l">
                  {t("recipeScreen.selectDate")}
                </Text>
                <Controller
                  control={control}
                  name="date"
                  render={({ field: { onChange, value } }) => (
                    <RNDateTimePicker
                      textColor="red"
                      value={value}
                      onChange={(_, selectedDate) => {
                        onChange(selectedDate);
                      }}
                      display="inline"
                      style={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                      mode="date"
                      minimumDate={new Date()}
                    />
                  )}
                />
              </View>
              <View>
                <Text fontFamily="Avenir-Medium" fontSize="l">
                  {t("recipeScreen.selectTypeOfMeal")}
                </Text>
                <Controller
                  control={control}
                  name="mealType"
                  render={({ field: { onChange, value } }) => (
                    <Picker
                      selectedValue={value}
                      onValueChange={(itemValue) => onChange(itemValue)}
                      mode="dropdown"
                    >
                      <Picker.Item
                        label={t("recipeScreen.breakfast")}
                        value="breakfast"
                      />
                      <Picker.Item
                        label={t("recipeScreen.lunch")}
                        value="lunch"
                      />
                      <Picker.Item
                        label={t("recipeScreen.dinner")}
                        value="dinner"
                      />
                      <Picker.Item
                        label={t("recipeScreen.snack")}
                        value="snack"
                      />
                    </Picker>
                  )}
                />
              </View>
              <MainButton
                label={t("recipeScreen.schedule")}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </BottomSheet>
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    gap: spacing.m,
  },
  logo: {
    width: 100,
    height: 20,
  },
  signatureWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.m,
  },
  loaderContainer: {
    width: "100%",
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
  },
  loaderBar: {
    height: "100%",
  },
  gradient: {
    height: "100%",
    borderRadius: 10,
  },
  instructionsList: {
    display: "flex",
    flexDirection: "column",
    marginTop: spacing.xs,
  },
  instructionsWrapper: {
    marginTop: spacing.s,
  },
  ingredientText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  ingredientsWrapper: {
    marginTop: spacing.xs,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  iconInputWrapper: {
    position: "absolute",
    zIndex: 1,
    top: spacing.l + 10,
    right: spacing.m,
    borderRadius: spacing.xl,
    borderWidth: 2,
    borderColor: colors.Alizarin,
  },
  dishImage: {
    width: "100%",
    height: 300,
  },
  introductionWrapper: {
    ...boxShadow,
    width: "100%",
    transform: [{ translateY: -80 }],
    marginTop: spacing.m,
    alignSelf: "center",
    backgroundColor: colors.light.PureWhite,
    borderRadius: spacing.xs,
    padding: spacing.m,
  },
});

export default RecipeScreen;
