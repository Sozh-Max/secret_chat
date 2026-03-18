import Purchases, { LOG_LEVEL, PurchasesOffering, PurchasesPackage } from 'react-native-purchases';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const API_KEYS = {
  ios: Constants.expoConfig?.extra?.REVENUE_CAT_API_KEY,
  android: Constants.expoConfig?.extra?.REVENUE_CAT_API_KEY,
};

export class RevenueCatService {
  private configured = false;

  async initRevenueCat(): Promise<void> {
    if (this.configured) return;

    await Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    Purchases.configure({
      apiKey: Platform.OS === 'ios' ? API_KEYS.ios : API_KEYS.android,
    });

    this.configured = true;
  }

  async login(userId: string) {
    const { customerInfo, created } = await Purchases.logIn(userId);
    return { customerInfo, created };
  }

  async logout() {
    return await Purchases.logOut();
  }

  async getOfferings() {
    return await Purchases.getOfferings();
  }

  async getCurrentOffering(): Promise<PurchasesOffering | null> {
    const offerings = await Purchases.getOfferings();
    return offerings.current ?? null;
  }

  async purchaseTokenPackage(pkg: PurchasesPackage) {
    try {
      const { customerInfo, productIdentifier } = await Purchases.purchasePackage(pkg);
      return { customerInfo, productIdentifier };
    } catch (e: any) {
      if (e?.userCancelled) return null;
      throw e;
    }
  }

  async getCustomerInfo() {
    return await Purchases.getCustomerInfo();
  }
}