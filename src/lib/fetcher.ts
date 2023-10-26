export const fetcher = async ({ url, method, body }: { url: string; method: string; body: any }) => {
  try {
    await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("[FETCHER ERROR]: ", error);
  }
};
