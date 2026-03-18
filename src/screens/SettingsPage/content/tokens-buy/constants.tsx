import React from 'react';
import { SmallSale } from '@/src/screens/SettingsPage/content/tokens-buy/content/sales/content/small-sale/SmallSale';
import { MediumSale } from '@/src/screens/SettingsPage/content/tokens-buy/content/sales/content/medium-sale/MediumSale';
import { HighSale } from '@/src/screens/SettingsPage/content/tokens-buy/content/sales/content/high-sale/HighSale';

import StarIcon from '@/assets/images/svg/star_icon.svg';
import StarsIcon1 from '@/assets/images/svg/stars_icon_1.svg';
import StarsIcon2 from '@/assets/images/svg/stars_icon_2.svg';
import StarsIcon3 from '@/assets/images/svg/stars_icon_3.svg';

import { styles } from '@/src/screens/SettingsPage/content/tokens-buy/styles';
import { ITokenValue } from '@/src/screens/SettingsPage/content/tokens-buy/TokensBuy';

export const TOKEN_VALUES: ITokenValue[] = [
  {
    id: 1,
    identifier: 'token_500',
    value: 500,
    icon: <StarIcon height={20} width={20} />,
    activeColorBg: '#7070704D',
    borderColor: '#70707080',
    buttonStyle: styles.primary_button,
    buttonTextStyle: { color: '#ffffff' },
    component: <></>,
    price: 1.99,
    oldPrice: null,
  },
  {
    id: 2,
    identifier: 'token_2500',
    value: 2500,
    icon: <StarsIcon1 height={20} width={28} />,
    activeColorBg: '#7070704D',
    borderColor: '#70707080',
    buttonStyle: styles.primary_button,
    buttonTextStyle: { color: '#ffffff' },
    component: <SmallSale />,
    price: 6.99,
    oldPrice: 9.95,
  },
  {
    id: 3,
    identifier: 'token_5000',
    value: 5000,
    icon: <StarsIcon2 height={20} width={36} />,
    activeColorBg: '#D888354D',
    borderColor: '#D8883580',
    buttonStyle: styles.secondary_button,
    buttonTextStyle: { color: '#000000' },
    component: <MediumSale />,
    price: 11.99,
    oldPrice: 19.90,
  },
  {
    id: 4,
    identifier: 'token_10000',
    value: 10000,
    icon: <StarsIcon3 height={20} width={44} />,
    activeColorBg: '#50AC0033',
    borderColor: '#50AC0080',
    buttonStyle: styles.thirty_button,
    buttonTextStyle: { color: '#000000' },
    component: <HighSale />,
    price: 19.99,
    oldPrice: 39.80,
  },
];