export const getAxiosConfig = (cookies?: string) => ({
  headers: {
    "Content-Type": "application/json",
    ...(cookies && { Authorization: cookies }),
    "ngrok-skip-browser-warning": "true",
  },
});
