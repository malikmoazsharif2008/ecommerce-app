import fetch from "node-fetch";

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { imageBase64, fileName } = body;

    const response = await fetch("https://uploadthing.com/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.UPLOADTHING_API_KEY,
      },
      body: JSON.stringify({
        file: imageBase64,
        name: fileName,
      }),
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
