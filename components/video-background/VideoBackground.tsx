import React, { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

export const VideoBackground = () => {
  const player = useVideoPlayer(
    require('../../assets/videos/login_video.mp4'),
    (p) => {
      try {
        p.loop = true;
        p.muted = true;
        p.play?.();
      } catch (e) {
        console.warn('video setup error', e);
      }
    }
  );

  const appStateRef = useRef<AppStateStatus | null>(null);

  useEffect(() => {
    const handler = (nextAppState: AppStateStatus) => {
      const prev = appStateRef.current;
      appStateRef.current = nextAppState;

      if (nextAppState === 'active') {
        try {
          if (typeof (player as any)?.playAsync === 'function') {
            (player as any).playAsync().catch(() => (player as any).play?.());
          } else if (typeof (player as any)?.play === 'function') {
            (player as any).play();
          }
        } catch (err) {
          console.warn('Failed to resume video player', err);
        }
      } else {
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
      contentFit="cover"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
      nativeControls={false}
    />
  );
};
