import Purchases from 'react-native-purchases';
import { PurchasesPackage } from '@revenuecat/purchases-typescript-internal';

const API_KEYS = {
  //ios: "public_ios_sdk_key",
  android: "public_android_sdk_key",
};

export class RevenueCatService {

  async initRevenueCat(): Promise<void> {
    await Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);

    Purchases.configure({
      //apiKey: Platform.OS === "ios" ? API_KEYS.ios : API_KEYS.android,
      apiKey: API_KEYS.android,
    });
  }

  async login(userId: string) {
    const { customerInfo, created } = await Purchases.logIn(userId);
  }

  async logout() {
    await Purchases.logOut();
  }

  async getOfferings() {
    const offerings = await Purchases.getOfferings();
    // offerings.current.availablePackages => варианты подписки/покупок
    return offerings;
  }

  async purchase(pkg: PurchasesPackage) {
    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg);

      // customerInfo.entitlements.active => активные entitlements
      return customerInfo;
    } catch (e: any) {
      if (!e.userCancelled) {
        throw e;
      }
    }
  }

  async hasPro() {
    const info = await Purchases.getCustomerInfo();
    return Boolean(info.entitlements.active["pro"]);
  }
}