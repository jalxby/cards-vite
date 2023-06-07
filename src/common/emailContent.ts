export const emailContent = `<div style="background-color: lime; padding: 15px">password recovery link:<a href=${
  import.meta.env.DEV
    ? "http://localhost:5173/#/createnewpass"
    : "https://jalxby.github.io/cards-vite/#/createnewpass"
}/$token$>link</a></div>`;
