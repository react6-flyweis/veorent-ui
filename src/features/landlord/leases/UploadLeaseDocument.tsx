import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "@/components/ui/image-upload";
import { useNavigate } from "react-router";

const formSchema = z.object({
  document: z.array(
    z.instanceof(File).refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    }),
  ),
});

type FormValues = z.infer<typeof formSchema>;

export default function UploadLeaseDocument() {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    // Handle form submission with the document file
    console.log(data);
    // Here you would typically upload the file to a server
    navigate("/landlord/leases/whats-next");
  };

  return (
    <div className="space-y-5">
      <PageTitle title="Upload Your Document" withBack />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" size="lg" className="w-full md:w-3/5">
              Upload
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
