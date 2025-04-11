import { useEffect, useState } from "react";
import { Logs, PayloadItem, WsStatuses } from "./types";
import useLocalStorage from "./hooks/useLocalStorage";
import WsLogs from "./components/WsLogs";
import Header from "./components/Header";
import WsUrl from "./components/WsUrl";
import WsPayload from "./components/WsPayload";

const App = () => {
  const [savedWsUrl, setSavedWsUrl] = useLocalStorage<string | null>(
    "ws_url",
    null
  );
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [reconnectWs, setReconnectWs] = useState(Date.now());
  const [wsStatus, setWsStatus] = useState<WsStatuses>("destructive");
  const [payloads, setPayloads] = useLocalStorage<PayloadItem[]>(
    "ws_payloads",
    []
  );
  const [logs, setLogs] = useState<Logs[]>([]);

  // Connect to WebSocket
  useEffect(() => {
    if (savedWsUrl) {
      setWsStatus("warning");
      setLogs((prev) => [
        ...prev,
        { type: "generic", message: "WS connecting..." },
      ]);
      const socket = new WebSocket(savedWsUrl);
      setWs(socket);

      socket.onopen = (ev) => {
        const target = ev.target as WebSocket;
        setWsStatus("success");
        setIsConnected(true);
        setLogs((prev) => [
          ...prev,
          {
            type: "generic",
            message: `WS connected: ${JSON.stringify({
              readyState: target.readyState,
              protocol: target.protocol,
            })}`,
          },
        ]);
      };
      socket.onclose = (ev) => {
        setWsStatus("destructive");
        setIsConnected(false);
        setLogs((prev) => [
          ...prev,
          {
            type: "generic",
            message: `WS closed: ${JSON.stringify({
              code: ev.code,
              reason: ev.reason,
            })}`,
          },
        ]);
      };
      socket.onerror = () => setIsConnected(false);

      socket.onmessage = (event) => {
        setLogs((prev) => [...prev, { type: "received", message: event.data }]);
      };

      return () => {
        socket.close();
      };
    }
  }, [savedWsUrl, reconnectWs]);

  const sendPayload = (payload: string) => {
    if (ws && isConnected) {
      ws.send(payload);
      setLogs((prev) => [...prev, { type: "sent", message: payload }]);
    } else {
      setLogs((prev) => [
        ...prev,
        { type: "generic", message: "WS not connected" },
      ]);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <Header
        wsStatus={wsStatus}
        savedWsUrl={savedWsUrl}
        setReconnectWs={setReconnectWs}
      />
      <div className="flex w-full flex-col gap-10 md:flex-row">
        <div className="flex-1">
          {/* WebSocket URL Section */}
          <WsUrl savedWsUrl={savedWsUrl} setSavedWsUrl={setSavedWsUrl} />

          {/* Payload Section */}
          <WsPayload
            payloads={payloads}
            setPayloads={setPayloads}
            onSend={sendPayload}
          />
        </div>

        {/* Logs Section */}
        <WsLogs logs={logs} />
      </div>
    </div>
  );
};

export default App;
