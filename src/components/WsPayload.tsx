import { Dispatch, FC, SetStateAction } from "react";
import { Card, CardContent } from "./ui/card";
import AddPayload from "./AddPayload";
import { PayloadItem } from "@/types";
import PayloadItemCard from "./PayloadItemCard";

interface Props {
  payloads: PayloadItem[];
  setPayloads: Dispatch<SetStateAction<PayloadItem[]>>;
  onSend: (payload: string) => void;
}

const WsPayload: FC<Props> = ({ payloads, setPayloads, onSend }) => {
  const addPayload = (newPayload: string) => {
    const updated = [
      ...payloads,
      { id: crypto.randomUUID(), payload: newPayload, editing: false },
    ];
    setPayloads(updated);
  };

  return (
    <Card className="mb-4">
      <CardContent className="space-y-4">
        <h2 className="text-lg font-semibold">WS Payloads</h2>
        <AddPayload onAdd={addPayload} />

        {payloads.map((item) => (
          <PayloadItemCard
            key={item.id + item.payload}
            item={item}
            setPayloads={setPayloads}
            onSend={onSend}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default WsPayload;
