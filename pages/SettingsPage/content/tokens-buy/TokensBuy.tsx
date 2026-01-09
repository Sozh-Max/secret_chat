import { Animated, Pressable, View, StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';
import { styles } from '@/pages/SettingsPage/content/tokens-buy/styles';
import React, { useRef, useState } from 'react';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { CountItems } from '@/pages/SettingsPage/content/tokens-buy/content/count-items/CountItems';
import { SmallSale } from '@/pages/SettingsPage/content/tokens-buy/content/sales/content/small-sale/SmallSale';
import { MediumSale } from '@/pages/SettingsPage/content/tokens-buy/content/sales/content/medium-sale/MediumSale';
import { HighSale } from '@/pages/SettingsPage/content/tokens-buy/content/sales/content/high-sale/HighSale';
import { Price } from '@/pages/SettingsPage/content/tokens-buy/content/price/Price';
import { OldPrice } from '@/pages/SettingsPage/content/tokens-buy/content/old-price/OldPrice';

export interface ITokenValue {
  id: number;
  value: number;
  iconSource: ImageSourcePropType;
  activeColorBg: string;
  borderColor: string;
  buttonStyle: StyleProp<ViewStyle>;
  component: React.ReactNode;
  price: number;
  oldPrice: number | null;
}

const TOKEN_VALUES = [
  {
    id: 1,
    value: 500,
    iconSource: require(`@/assets/images/svg/star_icon.svg`),
    activeColorBg: '#7070704D',
    borderColor: '#707070',
    buttonStyle: styles.primary_button,
    component: <></>,
    price: 1.99,
    oldPrice: null,
  },
  {
    id: 2,
    value: 2500,
    iconSource: require(`@/assets/images/svg/stars_icon_1.svg`),
    activeColorBg: '#7070704D',
    borderColor: '#707070',
    buttonStyle: styles.primary_button,
    component: <SmallSale />,
    price: 6.99,
    oldPrice: 9.95,
  },
  {
    id: 3,
    value: 5000,
    iconSource: require(`@/assets/images/svg/stars_icon_2.svg`),
    activeColorBg: '#D888354D',
    borderColor: '#D88835',
    buttonStyle: styles.secondary_button,
    component: <MediumSale />,
    price: 11.99,
    oldPrice: 19.90,
  },
  {
    id: 4,
    value: 10000,
    iconSource: require(`@/assets/images/svg/stars_icon_3.svg`),
    activeColorBg: '#50AC0033',
    borderColor: '#50AC00',
    buttonStyle: styles.thirty_button,
    component: <HighSale />,
    price: 19.99,
    oldPrice: 39.80,
  },
];

export const TokensBuy = () => {
  const [active, setActive] = useState<ITokenValue>(TOKEN_VALUES[0]);
  const [buttonStyle, setButtonStyle] = useState<StyleProp<ViewStyle>>(styles.primary_button)

  const animatedValues = useRef<Record<number, Animated.Value>>(Object.fromEntries(
    TOKEN_VALUES.map((val) => [val.id, new Animated.Value(val.id === active.id ? 1 : 0)])
  )).current;

  const animate = (value: ITokenValue) => {
    TOKEN_VALUES.forEach((val) => {
      Animated.timing(animatedValues[val.id], {
        toValue: val.id === value.id ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  const handlePress = (value: ITokenValue) => {
    setActive(value);
    animate(value);
    setButtonStyle(value.buttonStyle);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {TOKEN_VALUES.map((token) => {
          const animatedStyle = {
            backgroundColor: animatedValues[token.id].interpolate({
              inputRange: [0, 1],
              outputRange: ['#171717', token.activeColorBg],
            }),
            borderColor: animatedValues[token.id].interpolate({
              inputRange: [0, 1],
              outputRange: ['#171717', token.borderColor],
            }),
            // transform: [{
            //   scale: animatedValues[token.id].interpolate({
            //     inputRange: [0, 1],
            //     outputRange: [1, 1.02],
            //   }),
            // }],
          };

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