import { useEffect, useState } from 'react';
import { TOKEN_VALUES } from '@/src/screens/SettingsPage/content/tokens-buy/constants';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ITokenValue } from '@/src/screens/SettingsPage/content/tokens-buy/TokensBuy';
import { PurchasesPackage } from 'react-native-purchases';
import { usePayments } from '@/src/contexts/PaymentsContext';

const START_VALUE = 2;
const START_TOKEN_VALUE = TOKEN_VALUES[START_VALUE];

export const useTokensBuy = () => {
  const [active, setActive] = useState<ITokenValue>(START_TOKEN_VALUE);
  const [buttonStyle, setButtonStyle] = useState<StyleProp<ViewStyle>>(START_TOKEN_VALUE.buttonStyle);
  const [buttonTextStyle, setButtonTextStyle] = useState<StyleProp<TextStyle>>(START_TOKEN_VALUE.buttonTextStyle);
  const [offering, setOffering] = useState<PurchasesPackage[]>([]);

  const { revenueCatService } = usePayments();

  useEffect(() => {
    const getOffering = async () => {
      const o = await revenueCatService.getCurrentOffering();
      if (o?.availablePackages?.length) {
        setOffering([...o?.availablePackages].reverse())
      }
    }
    getOffering();

  }, []);

  const handlePress = (value: ITokenValue) => {
    setActive(value);
    setButtonStyle(value.buttonStyle);
    setButtonTextStyle(value.buttonTextStyle);
  };

  const handleBuy = async (): Promise<void> => {
    // const pkg = offering.find(o => o.identifier === active.identifier);
    // if (pkg) {
    //   try {
    //     const a = await revenueCatService.purchaseTokenPackage(pkg);
    //     console.log(a);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
  }

  return {
    active,
    handlePress,
    buttonStyle,
    buttonTextStyle,
    offering,
    handleBuy,
  }
}