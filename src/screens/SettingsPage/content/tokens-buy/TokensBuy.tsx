import React from 'react';
import { Pressable, View, StyleProp, ViewStyle, TextStyle } from 'react-native';

import { CustomButton } from '@/src/components/CustomButton/CustomButton';
import { CountItems } from '@/src/screens/SettingsPage/content/tokens-buy/content/count-items/CountItems';
import { Price } from '@/src/screens/SettingsPage/content/tokens-buy/content/price/Price';
import { OldPrice } from '@/src/screens/SettingsPage/content/tokens-buy/content/old-price/OldPrice';
import { useTokensBuy } from '@/src/screens/SettingsPage/content/tokens-buy/logic/useTokensBuy';
import { TOKEN_VALUES } from '@/src/screens/SettingsPage/content/tokens-buy/constants';

import { styles } from '@/src/screens/SettingsPage/content/tokens-buy/styles';
import { PurchasesPackage } from 'react-native-purchases';
import { MuiButton } from '@/src/screens/SettingsPage/content/tokens-buy/MuiButton';

export interface ITokenValue {
  id: number;
  identifier: string;
  value: number;
  icon: React.JSX.Element;
  activeColorBg: string;
  borderColor: string;
  buttonStyle: StyleProp<ViewStyle>;
  buttonTextStyle: StyleProp<TextStyle>;
  component: React.ReactNode;
  price: number;
  oldPrice: number | null;
}

export const TokensBuy = () => {
  const {
    active,
    handlePress,
    buttonStyle,
    buttonTextStyle,
    offering,
    handleBuy,
  } = useTokensBuy();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/*{offering.map((offer: PurchasesPackage) => {*/}
        {/*  const token: ITokenValue | undefined = TOKEN_VALUES.find((t: ITokenValue) => t.identifier === offer.identifier);*/}

        {/*  if (!token) return null;*/}

        {/*  return (*/}
        {/*    <Pressable*/}
        {/*      key={token.id}*/}
        {/*      onPress={() => handlePress(token)}*/}
        {/*    >*/}
        {/*      <View*/}
        {/*        style={[*/}
        {/*          styles.item,*/}
        {/*          active.id === token.id && {*/}
        {/*            backgroundColor: token.activeColorBg,*/}
        {/*            borderColor: token.borderColor,*/}
        {/*          },*/}
        {/*        ]}*/}
        {/*      >*/}
        {/*        <View style={styles.item_col}>*/}
        {/*          <CountItems item={token} />*/}
        {/*          {token.component}*/}
        {/*        </View>*/}
        {/*        <View style={styles.item_col}>*/}
        {/*          {token.oldPrice && <OldPrice value={token.oldPrice} />}*/}
        {/*          <Price value={offer.product.price} />*/}
        {/*        </View>*/}
        {/*      </View>*/}
        {/*    </Pressable>*/}
        {/*  );*/}
        {/*})}*/}

        {TOKEN_VALUES.map((token: ITokenValue) => {
          const isActive = active.id === token.id;

          return (
            <MuiButton
              key={token.id}
              onPress={() => handlePress(token)}
              styles={styles.button}
            >
              <View
                style={[
                  styles.item,
                  isActive && {
                    backgroundColor: token.activeColorBg,
                  },
                ]}
              >
                <View style={styles.item_col}>
                  <CountItems item={token} />
                  {token.component}
                </View>
                <View style={styles.item_col}>
                  {token.oldPrice && <OldPrice value={token.oldPrice} />}
                  <Price value={token.price} />
                </View>
              </View>
            </MuiButton>
          );
        })}
      </View>
      <View style={styles.btn_container}>
        {/*{offering.length > 0 && (*/}
        {/*  <CustomButton*/}
        {/*    text="Buy now"*/}
        {/*    handlePress={handleBuy}*/}
        {/*    customStyle={buttonStyle}*/}
        {/*    customTextStyle={buttonTextStyle}*/}
        {/*  />*/}
        {/*)}*/}
        <CustomButton
          text="Buy now"
          handlePress={handleBuy}
          customStyle={buttonStyle}
          customTextStyle={buttonTextStyle}
        />
      </View>
    </View>
  );
};