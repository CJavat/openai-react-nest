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
    messages: [{ role: 'user', content: 'Eres un asistente muy util.' }],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion);

  return completion.choices[0];
};
