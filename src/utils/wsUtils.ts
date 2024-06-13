import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 4004 });

const clients = new Map();

wss.on("connection", (ws, req) => {
  const accountCode = new URLSearchParams(req.url.split("?")[1]).get(
    "accountCode"
  );
  if (accountCode) {
    clients.set(accountCode, ws);
    ws.on("close", () => {
      clients.delete(accountCode);
    });
  }
});

const sendToAccount = (accountCode, data) => {
  const client = clients.get(accountCode);
  console.log(clients);
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(data);
  }
};

export { sendToAccount };
