import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import Button from "./ui/button";
import { FC } from "react";

interface Props {
  onAdd: (newPayload: string) => void;
}

const formSchema = z.object({
  newPayload: z.string().nonempty("This field is required"),
});

const AddPayload: FC<Props> = ({ onAdd }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPayload: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAdd(values.newPayload);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-2"
      >
        <FormField
          control={form.control}
          name="newPayload"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Enter payload" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};

export default AddPayload;
