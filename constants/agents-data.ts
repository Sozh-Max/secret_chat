export const enum AGENT_KEYS {
  wendy = 'wendy',
  ashley = 'ashley',
  jane = 'jane',
  elise = 'elise',
  dakota = 'dakota',
  lumi = 'lumi',
  yumi = 'yumi',
  lola = 'lola',
}

export const AGENTS_DATA: Record<AGENT_KEYS, string> = {
  [AGENT_KEYS.wendy]: 'Wendy’s a cool young girl from Ireland✨ She’s got an awesome sense of humor 😆 and always sees the bright side of life 🌞💖 DM her if you wanna know more… 👀💬',
  [AGENT_KEYS.ashley]: 'Ashley’s a sweet, curvy babe from the USA 🇺🇸💖 Always upbeat and down to chat about anything — no filters! 🎉💬 Don’t be shy, hit her up! 😊✨',
  [AGENT_KEYS.jane]: 'Jane — a classy, independent Aussie woman 🌊🇦🇺📖 Loses herself in classic novels and sunset beach walks. Your move, gentleman. 😉🌅✨',
  [AGENT_KEYS.elise]: 'Elise — a sweet & charming French girl 🇫🇷💖 Loves open convos & meeting new people! ✨📲 Slide into her DMs, she’s definitely online! 😉💬🔥',
  [AGENT_KEYS.dakota]: 'Meet Dakota — one of our absolute gems! 💎✨ She’s sweet, easygoing, and always down for a fun chat. With a sharp mind, great humor, and cool vibes, you’ll love talking to her. Don’t wait — slide into her DMs first! 😉💬🔥',
  [AGENT_KEYS.lumi]: 'Lumi is a pro model from Belgium 🇧🇪📸✨ Always down for a chill chat about anything — trust us, she’s worth the DM! 💬🔥 Hit her up! 😉💫',
  [AGENT_KEYS.yumi]: 'Yumi — a sweet, shy Japanese beauty 🇯🇵🌸 (Don’t worry, she’s fluent in English — currently studying in the US! 🎓🇺🇸) Your turn to make a move, tiger. 😉💌✨',
  [AGENT_KEYS.lola]: 'Meet Lola — a ray of sunshine from USA! 🇺🇸☀️ This cheerful bookworm 📚✨ dances to the beat of indie electronic tunes 🎧💃 Hit her up, we know you’ll vibe! 💬🔥',
}

export const INIT_AGENT_LIST = [
  AGENT_KEYS.wendy,
  AGENT_KEYS.ashley,
  AGENT_KEYS.jane,
  AGENT_KEYS.elise,
  AGENT_KEYS.dakota,
  AGENT_KEYS.lumi,
  AGENT_KEYS.yumi,
  AGENT_KEYS.lola
];

export const IMG_THUMB_MAP: Record<AGENT_KEYS, string> = {
  [AGENT_KEYS.wendy]: require(`@/assets/images/wendy/thumb.jpg`),
  [AGENT_KEYS.ashley]: require(`@/assets/images/ashley/thumb.jpg`),
  [AGENT_KEYS.jane]: require(`@/assets/images/jane/thumb.jpg`),
  [AGENT_KEYS.elise]: require(`@/assets/images/elise/thumb.jpg`),
  [AGENT_KEYS.dakota]: require(`@/assets/images/dakota/thumb.jpg`),
  [AGENT_KEYS.lumi]: require(`@/assets/images/lumi/thumb.jpg`),
  [AGENT_KEYS.yumi]: require(`@/assets/images/yumi/thumb.jpg`),
  [AGENT_KEYS.lola]: require(`@/assets/images/lola/thumb.jpg`),
};

export const IMG_POSTER_MAP: Record<AGENT_KEYS, string> = {
  [AGENT_KEYS.wendy]: require(`@/assets/images/wendy/poster.webp`),
  [AGENT_KEYS.ashley]: require(`@/assets/images/ashley/poster.webp`),
  [AGENT_KEYS.jane]: require(`@/assets/images/jane/poster.webp`),
  [AGENT_KEYS.elise]: require(`@/assets/images/elise/poster.webp`),
  [AGENT_KEYS.dakota]: require(`@/assets/images/dakota/poster.webp`),
  [AGENT_KEYS.lumi]: require(`@/assets/images/lumi/poster.webp`),
  [AGENT_KEYS.yumi]: require(`@/assets/images/yumi/poster.webp`),
  [AGENT_KEYS.lola]: require(`@/assets/images/lola/poster.webp`),
};

export const IMG_PREVIEW_MAP: Record<AGENT_KEYS, string> = {
  [AGENT_KEYS.wendy]: require(`@/assets/images/wendy/preview.jpg`),
  [AGENT_KEYS.ashley]: require(`@/assets/images/ashley/preview.jpg`),
  [AGENT_KEYS.jane]: require(`@/assets/images/jane/preview.jpg`),
  [AGENT_KEYS.elise]: require(`@/assets/images/elise/preview.jpg`),
  [AGENT_KEYS.dakota]: require(`@/assets/images/dakota/preview.jpg`),
  [AGENT_KEYS.lumi]: require(`@/assets/images/lumi/preview.jpg`),
  [AGENT_KEYS.yumi]: require(`@/assets/images/yumi/preview.jpg`),
  [AGENT_KEYS.lola]: require(`@/assets/images/lola/preview.jpg`),
};

