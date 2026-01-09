import React from 'react';
import { Animated, Pressable, View, StyleProp, ViewStyle } from 'react-native';

import { CustomButton } from '@/components/CustomButton/CustomButton';
import { CountItems } from '@/pages/SettingsPage/content/tokens-buy/content/count-items/CountItems';
import { Price } from '@/pages/SettingsPage/content/tokens-buy/content/price/Price';
import { OldPrice } from '@/pages/SettingsPage/content/tokens-buy/content/old-price/OldPrice';
import { useTokensBuy } from '@/pages/SettingsPage/content/tokens-buy/logic/useTokensBuy';
import { getAnimatedStyles } from '@/pages/SettingsPage/content/tokens-buy/logic/getAnimatedStyles';
import { TOKEN_VALUES } from '@/pages/SettingsPage/content/tokens-buy/constants';

import { styles } from '@/pages/SettingsPage/content/tokens-buy/styles';

export interface ITokenValue {
  id: number;
  value: number;
  icon: React.JSX.Element;
  activeColorBg: string;
  borderColor: string;
  buttonStyle: StyleProp<ViewStyle>;
  component: React.ReactNode;
  price: number;
  oldPrice: number | null;
}

export const TokensBuy = () => {
  const {
    animatedValues,
    handlePress,
    buttonStyle,
  } = useTokensBuy();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {TOKEN_VALUES.map((token: ITokenValue) => {
          const animatedStyle = getAnimatedStyles({
            token,
            animatedValues,
          });

          return (
            <Pressable
              key={token.id}
              onPress={() => handlePress(token)}
            >
              <Animated.View style={[styles.item, animatedStyle]}>
                <View style={styles.item_col}>
                  <CountItems item={token} />
                  {token.component}
                </View>
                <View style={styles.item_col}>
                  {token.oldPrice && <OldPrice value={token.oldPrice} />}
                  <Price value={token.price} />
                </View>
              </Animated.View>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.btn_container}>
        <CustomButton
          text="Buy Now"
          customStyle={buttonStyle}
        />
      </View>
    </View>
  );
};