import { Text, TextInput, View, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { styles } from '@/pages/login-page/content/login-main/styles';
import { RefObject, useEffect, useRef, useState } from 'react';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { checkIsDigit } from '@/utils/global';
import { api } from '@/api/api';
import { useUser } from '@/contexts/UserContext';
import { useLoginPage } from '@/contexts/LoginPageContext';
import { CURSOR_COLOR, MAIN_ICON_COLOR } from '@/constants/Colors';

type MiniStoreType = Record<number, TextInput | null>;

export const OtpContent = () => {
  const { bootId, setAuthorizedData } = useUser();

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [isError, setIsError] = useState<boolean>(false);
  const otpRef = useRef<string[]>(otp);

  const {
    activeEmail,
    loadingSendEmail,
    setLoadingSendEmail,
  } = useLoginPage();

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

  useEffect(() => {
    otpRef.current = otp;
  }, [otp]);

  const setValues = (value: string, index: number) => {
    setOtp((prev) => {
      const copy = [...prev];
      copy[index] = value;
      otpRef.current = copy;
      return copy;
    });
    setIsError(false);
  };

  const handleBackspace = (index: number) => {
    if (index > 0) {
      setValues('', index - 1);
      miniStore.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    const { key } = e.nativeEvent;
    setIsError(false);
    if (key === 'Backspace') {
      if (!otpRef.current[index]) {
        handleBackspace(index);
      } else {
        setValues('', index);
      }
    }
  };

  const setOtpValue = (value: string, index: number): void => {
    const digits = value.replace(/\D/g, '').split('');

    if (digits.length === 0) {
      setValues('', index);

      if (!otpRef.current[index] && index > 0) {
        miniStore.current[index - 1]?.focus();
      }
      return;
    }

    if (digits.length === 1) {
      const val = digits[0];
      if (!checkIsDigit(val)) return;
      setValues(val, index);

      if (miniStore.current[index + 1]) {
        miniStore.current[index + 1]?.focus();
      } else {
        buttonRef.current?.focus();
      }
      return;
    }

    setOtp((prev) => {
      const copy = [...prev];
      let i = index;
      for (let j = 0; j < digits.length && i < 6; j++, i++) {
        const ch = digits[j];
        if (!checkIsDigit(ch)) continue;
        copy[i] = ch;
      }
      otpRef.current = copy;
      return copy;
    });

    const lastFilledIndex = Math.min(5, index + digits.length - 1);
    setTimeout(() => {
      if (miniStore.current[lastFilledIndex]) {
        miniStore.current[lastFilledIndex]?.focus();
      } else {
        buttonRef.current?.focus();
      }
    }, 0);
  };

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
        setLoadingSendEmail(true);

        const data = await api.checkAuthorizeByEmail(
          activeEmail,
          otp.join(''),
          bootId,
        );

        if (data?.id && data?.email) {
          setAuthorizedData({
            isAuthorized: true,
            userId: data.id,
            email: data.email,
          });
        } else {
          setIsError(true);
        }
        setLoadingSendEmail(false);
      } else {
        setIsError(true);
      }
    } catch (e) {
      console.log(`authorized by OTP error: ${e}`);
      setIsError(true);
      setLoadingSendEmail(false);
    }
  };

  const inputCommonProps = (index: number) => ({
    style: [styles.input_otp, isError && styles.inputError],
    keyboardType: 'numeric' as const,
    onChangeText: (e: string) => setOtpValue(e, index),
    onKeyPress: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) =>
      handleKeyPress(e, index),
    onFocus: () => handleFocus(
      [otp0Ref, otp1Ref, otp2Ref, otp3Ref, otp4Ref, otp5Ref][index] as RefObject<TextInput>
    ),
    value: otp[index],
    cursorColor: CURSOR_COLOR,
    placeholderTextColor: MAIN_ICON_COLOR,
  });

  return (
    <>
      <View>
        <Text style={styles.text_enter}>Enter the code sent to</Text>
        <Text style={styles.text_email_code}>{activeEmail}</Text>
      </View>
      <View style={styles.row_otp}>
        <View style={styles.col_otp}>
          <TextInput {...inputCommonProps(0)} ref={otp0Ref} />
        </View>
        <View style={styles.col_otp}>
          <TextInput {...inputCommonProps(1)} ref={otp1Ref} />
        </View>
        <View style={styles.col_otp}>
          <TextInput {...inputCommonProps(2)} ref={otp2Ref} />
        </View>
        <View style={styles.col_otp}>
          <TextInput {...inputCommonProps(3)} ref={otp3Ref} />
        </View>
        <View style={styles.col_otp}>
          <TextInput {...inputCommonProps(4)} ref={otp4Ref} />
        </View>
        <View style={styles.col_otp}>
          <TextInput {...inputCommonProps(5)} ref={otp5Ref} />
        </View>
      </View>
      <View>
        <CustomButton
          text="Verify"
          customRef={buttonRef}
          disabled={loadingSendEmail}
          handlePress={checkAuthorized}
        />
      </View>
    </>
  );
};
