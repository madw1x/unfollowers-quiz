import React from 'react';
import { Emoji, EmojiStyle } from 'emoji-picker-react';

const InstagramEmoji = ({ emoji, size = 22 }) => {
  // Получаем unified код эмодзи
  const getUnified = (emoji) => {
    return [...emoji]
      .map(char => char.codePointAt(0).toString(16))
      .join('-');
  };

  return (
    <Emoji 
      unified={getUnified(emoji)}
      size={size}
      emojiStyle={EmojiStyle.APPLE} 
    />
  );
};

export default InstagramEmoji;
