export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/text-to-audio`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          voice: voice,
        }),
      }
    );

    if (!response.ok) throw new Error("No se pudo generar el audio");

    const audioFile = await response.blob();
    const audioURL = URL.createObjectURL(audioFile);

    return { ok: true, message: prompt, audioURL };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo generar el audio",
    };
  }
};
