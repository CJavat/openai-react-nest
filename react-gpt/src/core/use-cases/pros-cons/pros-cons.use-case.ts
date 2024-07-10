import { ProsConsResponse } from "../../../interfaces";

export const prosConsUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      }
    );

    if (!response.ok) throw new Error("No se pudo generar la respuesta");

    const data = (await response.json()) as ProsConsResponse;
    // console.log(data);

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      content: "No se pudo generar la respuesta",
    };
  }
};
