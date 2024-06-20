import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Checkbox } from "~components/atoms/checkbox";
import { Text } from "~components/atoms/text";
import { SectionTitle } from "~components/organisms/sectionTitle";
import { spacing, spacingPx } from "~constants/theme";
import { updateShoppingList } from "~services/routes/scheduledRecipe.service";
import { ShoppingList, ShoppingListItem } from "~services/types/recipe.types";

export const GroceryListSection: FC<{ shoppingList: ShoppingList }> = ({
  shoppingList,
}) => {
  const { t } = useTranslation();

  const [groceryList, setGroceryList] = useState<ShoppingListItem[]>(
    shoppingList.items
  );
  const [showMore, setShowMore] = useState(false);

  const { mutate: updateGroceryList } = useMutation({
    mutationKey: ["updateGroceryList"],
    mutationFn: async () => {
      const response = await updateShoppingList(
        shoppingList._id,
        groceryList,
        new Date()
      );
      return response;
    },
  });

  const toggleCheckbox = (itemName: string) => {
    const updatedList = groceryList.map((item) =>
      item.name === itemName ? { ...item, isChecked: !item.isChecked } : item
    );
    setGroceryList(updatedList);
    updateGroceryList();
  };
  const toggleShowMore = () => setShowMore(!showMore);

  return (
    <View>
      <SectionTitle title={t("yourGroceryList")} />
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginRight: spacing.m,
          }}
        >
          {showMore
            ? groceryList.map((item, index) => (
                <TouchableOpacity
                  onPress={() => toggleCheckbox(item.name)}
                  key={item.name}
                  style={{ width: "45%", margin: 8 }}
                >
                  <View style={styles.elementWrapper}>
                    <Checkbox
                      isChecked={item.isChecked}
                      setIsChecked={() => toggleCheckbox(item.name)}
                    />
                    <Text fontSize="m" ml={spacing.xs}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            : groceryList.slice(0, 10).map((item, index) => (
                <TouchableOpacity
                  onPress={() => toggleCheckbox(item.name)}
                  key={item.name}
                  style={{ width: "45%", margin: 8 }}
                >
                  <View style={styles.elementWrapper}>
                    <Checkbox
                      isChecked={item.isChecked}
                      setIsChecked={() => toggleCheckbox(item.name)}
                    />
                    <Text fontSize="m" ml={spacing.xs}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
        </View>
        {groceryList.length > 10 && (
          <TouchableOpacity
            onPress={toggleShowMore}
            style={{ marginTop: 10, alignSelf: "center" }}
          >
            <Text fontSize="m" color="Alizarin">
              {showMore ? t("homeScreen.showLess") : t("homeScreen.readMore")}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  elementWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.s,
    marginRight: spacing.m,
  },
});
