import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { OPENAI_API_KEY } = process.env;

export async function analyzeEmailContent(content: string): Promise<string> {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4',
      messages: [{ role: 'system', content: 'Categorize the following email content' }, { role: 'user', content }],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );

  const category = response.data.choices[0].message.content.trim();
  return category;
}
