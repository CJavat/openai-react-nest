import OpenAI from 'openai';
interface Options {
  prompt: string;
  // maxTokens?: number;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'Eres un asistente muy util.' },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0.3,
    max_tokens: 150,
  });

  console.log(completion);

  return completion.choices[0];
};
