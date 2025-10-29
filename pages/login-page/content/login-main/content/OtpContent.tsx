import { Text, TextInput, View } from 'react-native';
import { styles } from '@/pages/login-page/content/login-main/styles';
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { checkIsDigit } from '@/utils/global';
import { maskEmail } from '@/pages/login-page/content/login-main/utils';
import { api } from '@/api/api';
import { IconBackBtn } from '@/components/icons/IconBackBtn';
import { AnimatedPressBtn } from '@/components/AnimatedPressBtn/AnimatedPressBtn';
import { STEPS } from '@/pages/login-page/content/login-main/constants';
import { useUser } from '@/contexts/UserContext';

type OtpContentPayload = {
  activeEmail: string;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setCurrentStep: Dispatch<SetStateAction<STEPS>>;
  setEmail: Dispatch<SetStateAction<string>>;
};

type MiniStoreType = Record<number, TextInput | null>;

export const OtpContent = ({
  activeEmail,
  loading,
  setLoading,
  setCurrentStep,
  setEmail,
}: OtpContentPayload) => {
  const { setAuthorizedData } = useUser();
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);

  const miniStore = useRef<MiniStoreType>({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  });
  const otp0Ref = useRef<TextInput>(null);
  const otp1Ref = useRef<TextInput>(null);
  const otp2Ref = useRef<TextInput>(null);
  const otp3Ref = useRef<TextInput>(null);
  const otp4Ref = useRef<TextInput>(null);
  const otp5Ref = useRef<TextInput>(null);
  const buttonRef = useRef<TextInput>(null);

  useEffect(() => {
    miniStore.current[0] = otp0Ref.current;
    miniStore.current[1] = otp1Ref.current;
    miniStore.current[2] = otp2Ref.current;
    miniStore.current[3] = otp3Ref.current;
    miniStore.current[4] = otp4Ref.current;
    miniStore.current[5] = otp5Ref.current;
  }, []);

  const setOtpValue = (value: string, index: number): void => {
    const val = value[0];
    const isDigit = checkIsDigit(val);
    if (!isDigit) return;

    const copyOtp = [...otp];
    copyOtp[index] = val;

    setOtp([...copyOtp]);

    if (miniStore.current[index + 1]) {
      miniStore.current[index + 1]?.focus();
    } else {
      buttonRef.current?.focus();
    }
  }

  const handleFocus = (ref: RefObject<TextInput | any>) => {
    const cur = ref.current as any;
    if (!cur) return;

    setTimeout(() => {
      try {
        if (typeof cur.setNativeProps === 'function') {
          cur.setNativeProps({ selection: { start: 0, end: 0 } });
          return;
        }

        if (typeof cur.setSelectionRange === 'function') {
          cur.setSelectionRange(0, 0);
          cur.focus?.();
          return;
        }

        const possibleDom =
          cur._internalFiberInstanceHandleDEV?.stateNode ||
          cur._nativeRef ||
          (cur.getNativeElement && cur.getNativeElement()) ||
          cur;

        if (possibleDom && typeof possibleDom.setSelectionRange === 'function') {
          possibleDom.setSelectionRange(0, 0);
          possibleDom.focus?.();
        }
      } catch (err) {
        console.log(err);
      }
    }, 0);
  };

  const checkAuthorized = async () => {
    try {
      if (otp.every((s) => Boolean(s) && Number.isInteger(+s)) && activeEmail) {
        setLoading(true);
        const data = await api.checkAuthorizeByEmail(activeEmail, otp.join(''));
        if (data?.data) {
          setAuthorizedData({
            isAuthorized: true,
            userId: data?.data.id,
            email: data?.data.email,
          })
        }
        setLoading(false);
      }
    } catch (_) {
      setLoading(false);
    }
  }

  const handlePressBackBtn = () => {
    setCurrentStep(STEPS.START);
    setEmail('');
  }

  return (
    <>
      <AnimatedPressBtn
        style={styles.buttonBack}
        wrapperStyle={styles.buttonBackWrapper}
        onPress={handlePressBackBtn}
      >
        <IconBackBtn
          color={"#ffffff"}
        />
      </AnimatedPressBtn>
      <View style={styles.row}>
        <Text style={styles.text_enter}>Enter the code sent to</Text>
        <Text style={styles.text_email_code}>{maskEmail(activeEmail)}</Text>
      </View>
      <View style={styles.row_otp}>
        <View style={styles.col_otp}>
          <TextInput
            style={styles.input_otp}
            keyboardType="numeric"
            onChangeText={(e) => setOtpValue(e, 0)}
            ref={otp0Ref}
            onFocus={() => handleFocus(otp0Ref as RefObject<TextInput>)}
            value={otp[0]}
          />
        </View>
        <View style={styles.col_otp}>
          <TextInput
            style={styles.input_otp}
            keyboardType="numeric"
            onChangeText={(e) => setOtpValue(e, 1)}
            ref={otp1Ref}
            onFocus={() => handleFocus(otp1Ref as RefObject<TextInput>)}
            value={otp[1]}
          />
        </View>
        <View style={styles.col_otp}>
          <TextInput
            style={styles.input_otp}
            keyboardType="numeric"
            onChangeText={(e) => setOtpValue(e, 2)}
            ref={otp2Ref}
            onFocus={() => handleFocus(otp2Ref as RefObject<TextInput>)}
            value={otp[2]}
          />
        </View>
        <Text style={styles.text_otp}>-</Text>
        <View style={styles.col_otp}>
          <TextInput
            style={styles.input_otp}
            keyboardType="numeric"
            onChangeText={(e) => setOtpValue(e, 3)}
            ref={otp3Ref}
            onFocus={() => handleFocus(otp3Ref as RefObject<TextInput>)}
            value={otp[3]}
          />
        </View>
        <View style={styles.col_otp}>
          <TextInput
            style={styles.input_otp}
            keyboardType="numeric"
            onChangeText={(e) => setOtpValue(e, 4)}
            ref={otp4Ref}
            onFocus={() => handleFocus(otp4Ref as RefObject<TextInput>)}
            value={otp[4]}
          />
        </View>
        <View style={styles.col_otp}>
          <TextInput
            style={styles.input_otp}
            keyboardType="numeric"
            onChangeText={(e) => setOtpValue(e, 5)}
            ref={otp5Ref}
            onFocus={() => handleFocus(otp5Ref as RefObject<TextInput>)}
            value={otp[5]}
          />
        </View>
      </View>
      <View style={styles.row}>
        <CustomButton
          text="Sign In"
          customRef={buttonRef}
          disabled={loading}
          handlePress={checkAuthorized}
        />
      </View>
    </>
  )
}