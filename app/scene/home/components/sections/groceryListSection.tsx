import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity } from "react-native";
import styled from "styled-components";

import { MainCheckbox } from "~components/atoms/mainCheckbox";
import { MainText } from "~components/atoms/mainText";
import { LayoutSideColumns } from "~components/layout/layoutSideColumns";
import { SectionTitle } from "~components/organisms/sectionTitle";
import { spacing, spacingPx } from "~constants/theme";

export const GroceryListSection: FC = () => {
  const { t } = useTranslation();

  const initialGroceryList = [
    { id: 1, item: "Pain", isChecked: false },
    { id: 2, item: "Lait", isChecked: true },
    { id: 3, item: "Œufs", isChecked: false },
  ];

  const [groceryList, setGroceryList] = useState(initialGroceryList);

  const toggleCheckbox = (itemId: number) => {
    const updatedList = groceryList.map((item) =>
      item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
    );
    setGroceryList(updatedList);
  };

  return (
    <View>
      <LayoutSideColumns>
        <SectionTitle title={t("yourGroceryList")} />
        {groceryList.map((item) => (
          <TouchableOpacity
            onPress={() => toggleCheckbox(item.id)}
            key={item.id}
          >
            <ElementWrapper key={item.id}>
              <MainCheckbox
                isChecked={item.isChecked}
                setIsChecked={() => toggleCheckbox(item.id)}
              />
              <MainText fontSize="m" style={{ marginLeft: spacing.xs }}>
                {item.item}
              </MainText>
            </ElementWrapper>
          </TouchableOpacity>
        ))}
      </LayoutSideColumns>
    </View>
  );
};

const ElementWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${spacingPx.s};
`;
