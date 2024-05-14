import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Text } from '~components/atoms/text'
import { Layout } from '~components/layout/layout'
import { spacing } from '~constants/theme'

export const NeedsResultExplanationScreen: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Layout pageTitle={t('howItWorks')} isBackArrow isHeader scrollView>
      <View>
        <Text
          style={{ marginBottom: spacing.s }}
          fontFamily="Avenir-Bold-Italic"
          fontSize="l"
        >
          {`${t('howCaloriesCalculationWorks')} ?`}
        </Text>
        <Text fontSize="m">{t('howCaloriesCalculationWorksExplanation')}</Text>
      </View>
    </Layout>
  )
}
