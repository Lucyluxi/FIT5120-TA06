import axios from 'axios';

const TRANSLATOR_KEY = '1VBT9UOchWSllzGwhXjj1FRt00qJT2s4P5Fkr9bCaIVLKwAL4JuEJQQJ99BEACL93NaXJ3w3AAAbACOGMBdg';
const TRANSLATOR_ENDPOINT = 'https://api.cognitive.microsofttranslator.com';
const REGION = 'australiaeast';

export async function translateText(text, targetLang) {
  try {
    const response = await axios({
      method: 'post',
      url: `${TRANSLATOR_ENDPOINT}/translate`,
      params: {
        'api-version': '3.0',
        to: targetLang,
      },
      headers: {
        'Ocp-Apim-Subscription-Key': TRANSLATOR_KEY,
        'Ocp-Apim-Subscription-Region': REGION,
        'Content-Type': 'application/json',
      },
      data: [{ text: text }],
    });

    return response.data[0].translations[0].text;
  } catch (error) {
    console.error('Translation failed:', error);
    return text;
  }
}
