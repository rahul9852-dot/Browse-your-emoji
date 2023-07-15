import React, { useState, useEffect } from 'react'
import EmojisList from './EmojisList';


export interface Emoji{
  name: string;
  category: string;
  group:string;
  htmlCode:string[];
}
function Emojis() {

  const [emojisList, setEmojisList] = useState<Emoji[] | null>(null);

  useEffect(()=> {
    fetchData();
  },[])

  const fetchData = async () => {
    try {
      const response = await fetch('https://emojihub.yurace.pro/api/all');
      const data = await response.json();
      setEmojisList(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(emojisList);

  return (
      <EmojisList emojisList={emojisList} />
  );
}

export default Emojis;