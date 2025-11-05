import { Text, TextInput, View, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { styles } from '@/pages/login-page/content/login-main/styles';
import { RefObject, useEffect, useRef, useState } from 'react';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { checkIsDigit } from '@/utils/global';
import { maskEmail } from '@/pages/login-page/content/login-main/utils';
import { api } from '@/api/api';
import { useUser } from '@/contexts/UserContext';
import { useLoginPage } from '@/contexts/LoginPageContext';

type MiniStoreType = Record<number, TextInput | null>;

export const OtpContent = () => {
  const { setAuthorizedData } = useUser();
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const otpRef = useRef<string[]>(otp); // реф для актуального otp
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

  // синхронизируем реф с состоянием
  useEffect(() => {
    otpRef.current = otp;
  }, [otp]);

  const setValues = (value: string, index: number) => {
    setOtp((prev) => {
      const copy = [...prev];
      copy[index] = value;
      otpRef.current = copy; // также держим реф в актуале
      return copy;
    });
  };

  const handleBackspace = (index: number) => {
    // если текущий инпут пустой — переходим на предыдущий и очищаем его
    if (index > 0) {
      // очистим предыдущий символ
      setValues('', index - 1);
      miniStore.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    const { key } = e.nativeEvent;
    if (key === 'Backspace') {
      // Если в текущем индексе уже пусто — переместим фокус назад и очистим предыдущий.
      // Если есть символ (удаляется), onChangeText обычно сработает и очистит его.
      if (!otpRef.current[index]) {
        handleBackspace(index);
      } else {
        // если в текущем поле есть символ, просто очистим его (без смещения)
        setValues('', index);
      }
    }
  };

  const setOtpValue = (value: string, index: number): void => {
    // берем только первый символ (если пользователь вставил)
    const val = value[0] ?? '';
    // если ввели пустую строку (удаление) — уже покрывается onKeyPress на большинстве клавиатур,
    // но оставим резервную логику: если значение пустое и предыдущий уже пустой — переместим фокус назад
    if (value === '') {
      setValues('', index);
      // если текущее было пусто раньше, перемещаемся назад (резервный путь)
      if (!otpRef.current[index] && index > 0) {
        miniStore.current[index - 1]?.focus();
      }
      return;
    }

    const isDigit = checkIsDigit(val);
    if (!isDigit) return;

    setValues(val, index);

    // фокус на следующий, если есть
    if (miniStore.current[index + 1]) {
      miniStore.current[index + 1]?.focus();
    } else {
      buttonRef.current?.focus();
    }
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
        const data = await api.checkAuthorizeByEmail(activeEmail, otp.join(''));
        if (data?.data) {
          setAuthorizedData({
            isAuthorized: true,
            userId: data?.data.id,
            email: data?.data.email,
          });
        }
        setLoadingSendEmail(false);
      }
    } catch (_) {
      setLoadingSendEmail(false);
    }
  };

  const inputCommonProps = (index: number) => ({
    style: styles.input_otp,
    keyboardType: 'numeric' as const,
    onChangeText: (e: string) => setOtpValue(e, index),
    onKeyPress: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) =>
      handleKeyPress(e, index),
    onFocus: () => handleFocus(
      [otp0Ref, otp1Ref, otp2Ref, otp3Ref, otp4Ref, otp5Ref][index] as RefObject<TextInput>
    ),
    value: otp[index],
  });

  return (
    <>
      <View style={styles.row}>
        <Text style={styles.text_enter}>Enter the code sent to</Text>
        <Text style={styles.text_email_code}>{maskEmail(activeEmail)}</Text>
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
      <View style={styles.row}>
        <CustomButton
          text="Sign In"
          customRef={buttonRef}
          disabled={loadingSendEmail}
          handlePress={checkAuthorized}
        />
      </View>
    </>
  );
};
