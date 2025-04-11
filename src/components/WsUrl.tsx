import { Dispatch, FC, SetStateAction, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import Button from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

interface Props {
  savedWsUrl: string | null;
  setSavedWsUrl: Dispatch<SetStateAction<string | null>>;
}

const formSchema = z.object({
  wsUrl: z.string().url("Invalid URL").nonempty("This field is required"),
});

const WsUrl: FC<Props> = ({ savedWsUrl, setSavedWsUrl }) => {
  const [editingWs, setEditingWs] = useState(!savedWsUrl);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wsUrl: typeof savedWsUrl === "string" ? savedWsUrl : "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSavedWsUrl(values.wsUrl);
    setEditingWs(false);
  }

  return (
    <Card className="mb-4">
      <CardContent>
        <h2 className="text-lg font-semibold">WS URL</h2>
        {editingWs ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 sm:flex-row w-full"
            >
              <FormField
                control={form.control}
                name="wsUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Enter WebSocket URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save</Button>
            </form>
          </Form>
        ) : (
          <div className="flex items-center justify-between">
            <p>{savedWsUrl}</p>
            <Button variant="outline" onClick={() => setEditingWs(true)}>
              Edit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WsUrl;
