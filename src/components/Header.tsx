import { Dispatch, FC, SetStateAction } from "react";
import Button from "./ui/button";
import { TfiReload } from "react-icons/tfi";
import Badge from "./ui/badge";
import { WsStatuses } from "@/types";

interface Props {
  wsStatus: WsStatuses;
  savedWsUrl: string | null;
  setReconnectWs: Dispatch<SetStateAction<number>>;
}

const Header: FC<Props> = ({ wsStatus, savedWsUrl, setReconnectWs }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-semibold">WebSocket Control Panel</h1>
      <div className="flex items-center gap-2">
        {wsStatus === "destructive" && !!savedWsUrl?.trim() && (
          <Button
            variant="outline"
            size="icon"
            className="bg-transparent border-none shadow-none h-6 w-6"
            onClick={() => setReconnectWs(Date.now())}
          >
            <TfiReload />
          </Button>
        )}
        <Badge variant={wsStatus}>
          {wsStatus === "success"
            ? "Connected"
            : wsStatus === "destructive"
            ? "Disconnected"
            : "Connecting"}
        </Badge>
      </div>
    </div>
  );
};

export default Header;
