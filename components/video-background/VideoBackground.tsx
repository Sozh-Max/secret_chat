import React, { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

export const VideoBackground = () => {
  // создаём плеер через хук
  const player = useVideoPlayer(
    require('../../assets/videos/login_video.mp4'),
    (p) => {
      // настройка при создании
      try {
        p.loop = true;
        p.muted = true;
        // в setup сразу попытаемся запустить
        p.play?.();
      } catch (e) {
        // безопасно игнорируем ошибки при инициализации
        console.warn('video setup error', e);
      }
    }
  );

  // храним последнюю AppState для сравнения (опционально)
  const appStateRef = useRef<AppStateStatus | null>(null);

  useEffect(() => {
    // обработчик изменений состояния приложения
    const handler = (nextAppState: AppStateStatus) => {
      const prev = appStateRef.current;
      appStateRef.current = nextAppState;

      if (nextAppState === 'active') {
        // приложение вернулось в foreground — пробуем запустить
        try {
          // у useVideoPlayer объект может предоставлять play / playAsync / resume методы
          // пробуем несколько вариантов безопасно
          if (typeof (player as any)?.playAsync === 'function') {
            (player as any).playAsync().catch(() => (player as any).play?.());
          } else if (typeof (player as any)?.play === 'function') {
            (player as any).play();
          }
        } catch (err) {
          console.warn('Failed to resume video player', err);
        }
      } else {
        // при уходе в фон можно ставить на паузу (опционально)
        try {
          if (typeof (player as any)?.pauseAsync === 'function') {
            (player as any).pauseAsync().catch(() => {});
          } else if (typeof (player as any)?.pause === 'function') {
            (player as any).pause();
          }
        } catch (err) {
          // ignore
        }
      }
    };

    // initial value
    AppState.currentState && (appStateRef.current = AppState.currentState);

    const sub = AppState.addEventListener('change', handler);
    return () => sub.remove();
  }, [player]);

  return (
    <VideoView
      player={player}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
      }}
      nativeControls={false}
    />
  );
};
