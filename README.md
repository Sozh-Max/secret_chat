# secret_chat — Android README

## Overview

**secret_chat** — это мобильное приложение на базе **Expo (SDK 53)** с использованием **expo-router**, Google Sign-In и других нативных модулей.  
Этот README предназначен для разработки и сборки проекта **под Android**.

---

## Requirements

Перед началом убедитесь, что установлены:

- **Node.js** (рекомендуется LTS)
- **npm** или **yarn**
- **Java JDK** (подходит для Gradle, напр. Temurin 17)
- **Android Studio** (включая Android SDK и AVD)
- Переменные окружения:
   - `ANDROID_HOME` или `ANDROID_SDK_ROOT`

Для разработки с Dev Client:

```bash
npm install expo-dev-client
```

Установка зависимостей
```bash
npm install
```

Для разработки под андроид
```bash
npm run android
```

Команда	Описание
npm run start	  Запуск Metro и Dev Client
npm run android	  Сборка и запуск Android-приложения
npm run ios	      Сборка и запуск iOS-приложения
npm run web	      Запуск web-версии
npm run lint	  Проверка ESLint


