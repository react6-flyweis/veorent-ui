import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoadingButton } from "@/components/ui/loading-button";

import houseIcon from "./assets/house.png";
import leaseIcon from "./assets/deal.png";
import { BuilderLayout } from "./components/BuilderLayout";
import { DateInput } from "@/components/ui/date-input";
import { useNavigate } from "react-router";

const leaseSpecificSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required"),
  unit: z.string().optional(),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  leaseTerm: z.enum(["fixed", "month-to-month"], {
    required_error: "Please select a lease term",
  }),
  startDate: z.date({
    required_error: "Start date is required",
  }),
});

type LeaseSpecificFormValues = z.infer<typeof leaseSpecificSchema>;

export default function LeaseSpecific() {
  const navigate = useNavigate();

  const form = useForm<LeaseSpecificFormValues>({
    resolver: zodResolver(leaseSpecificSchema),
    defaultValues: {
      streetAddress: "",
      unit: "",
      city: "",
      region: "",
      zipCode: "",
      leaseTerm: "fixed",
      startDate: new Date(),
    },
  });

  const onSubmit = async (values: LeaseSpecificFormValues) => {
    try {
      console.log(values);
      // TODO: Save lease information and move to next step
      navigate("/landlord/lease-agreement/rent-deposit-fee");
    } catch (error) {
      console.error("Error saving lease information:", error);
    }
  };

  return (
    <BuilderLayout
      title="Lease Specific"
      description="We automatically filled information we had on file. Please double check it since it will go into the legal agreement."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Rental Property Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={houseIcon} className="size-10" />
              <span>Rental Property</span>
            </div>

            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Lease Term Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={leaseIcon} className="size-10" />
              <span>Lease Term</span>
            </div>

            <FormField
              control={form.control}
              name="leaseTerm"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>What is the term for this lease?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="fixed" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Fixed Term
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="month-to-month" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Month-to-Month
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DateInput className="w-52" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center">
            <LoadingButton
              isLoading={form.formState.isSubmitting}
              size="lg"
              className="w-4/5 rounded-lg @lg:w-3/5"
              type="submit"
            >
              {form.formState.isSubmitting ? "Saving..." : "Save & Next"}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
