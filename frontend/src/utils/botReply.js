export function botReply(userMessage, persona) {
  const random = [
    `Интересно 😌 Хочешь, я подберу тебе трек в этом настроении?`,
    `О, я знаю пару похожих песен 🎶`,
    `Классно звучит! ${persona.name} любит такие темы.`,
    `Музыка — идеальный способ передать "${userMessage}" 💫`,
  ];
  return random[Math.floor(Math.random() * random.length)];
}
