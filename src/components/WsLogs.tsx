import { FC } from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { Logs } from "@/types";
import { Card, CardContent } from "./ui/card";
import { Virtuoso } from "react-virtuoso";

interface Props {
  logs: Logs[];
}

const WsLogs: FC<Props> = ({ logs }) => {
  return (
    <Card className="flex-1 h-fit">
      <CardContent>
        <h2 className="text-lg font-semibold mb-2">Logs</h2>
        <div className="h-[75vh] bg-black text-white text-sm rounded">
          <Virtuoso
            data={logs}
            className="h-full"
            followOutput={(isAtBottom) => {
              if (isAtBottom) {
                return "smooth";
              }
              return false;
            }}
            itemContent={(_, log) => (
              <div
                className={`break-all flex gap-0.5 border-b-[0.5px] border-[#5e5e5e] p-2 ${
                  log.type === "sent" ? "bg-[#1c3d26]" : ""
                }`}
              >
                {log.type === "sent" && <FaLongArrowAltUp color="#6dd57f" />}
                {log.type === "received" && (
                  <FaLongArrowAltDown color="#f2b8a8" />
                )}
                <p>{log.message}</p>
              </div>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WsLogs;
