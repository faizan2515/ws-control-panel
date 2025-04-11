import { Dispatch, FC, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PayloadItem } from "@/types";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import Button from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  item: PayloadItem;
  setPayloads: Dispatch<SetStateAction<PayloadItem[]>>;
  onSend: (payload: string) => void;
}

const formSchema = z.object({
  editPayload: z.string().nonempty("This field is required"),
});

const PayloadItemCard: FC<Props> = ({ item, setPayloads, onSend }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      editPayload: item.payload,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setPayloads((prev) =>
      prev.map((p) =>
        p.id === item.id
          ? { ...p, payload: values.editPayload, editing: false }
          : p
      )
    );
    form.reset();
  }

  const deletePayload = (id: string) => {
    setPayloads((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 border p-2 rounded-md bg-white">
      {item.editing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col sm:flex-row gap-2"
          >
            <FormField
              control={form.control}
              name="editPayload"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Enter payload" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="outline">
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <p className="flex-1 break-all self-center">{item.payload}</p>
      )}
      <div className="flex gap-2">
        {!item.editing && (
          <Button
            variant="outline"
            onClick={() => {
              setPayloads((prev) =>
                prev.map((p) =>
                  p.id === item.id ? { ...p, editing: !p.editing } : p
                )
              );
            }}
          >
            {item.editing ? "Save" : "Edit"}
          </Button>
        )}
        <Button variant="destructive" onClick={() => deletePayload(item.id)}>
          Delete
        </Button>
        <Button onClick={() => onSend(item.payload)}>Send</Button>
      </div>
    </div>
  );
};

export default PayloadItemCard;
