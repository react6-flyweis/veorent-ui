import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  MultiStepper,
  MultiStepperBackButton,
  MultiStepperButton,
  MultiStepperHeader,
  MultiStepperStep,
} from "@/components/MultiStepper";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { PageTitle } from "@/components/PageTitle";
import marketingImg from "@/assets/images/marketing.png";
import sofaImg from "@/assets/images/sofa.png";
import apartmentImg from "@/assets/images/apartment.png";
import townhouseImg from "@/assets/images/townhouse.png";
import villaImg from "@/assets/images/villa.png";
import skyscraperImg from "@/assets/images/skyscraper.png";
import factoryImg from "@/assets/images/factory.png";
import requestImg from "@/assets/images/request.png";

import personalInfoIcon from "./assets/personal-info.png";
import villaIcon from "./assets/villa.png";
import leaseIcon from "./assets/lease.png";
import uploadDocIcon from "./assets/documents.png";

import { useGoBack } from "@/hooks/useGoBack";
import { IconRound } from "@/components/IconRound";
import { DateInput } from "@/components/ui/date-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PlusCircleIcon } from "lucide-react";

const propertyTypes = [
  {
    label: "Marketing",
    image: marketingImg,
    key: "marketing",
  },
  {
    label: "Furnished Home",
    image: sofaImg,
    key: "furnished-home",
  },
  {
    label: "Apartment",
    image: apartmentImg,
    key: "apartment",
  },
  {
    label: "Townhouse",
    image: townhouseImg,
    key: "townhouse",
  },
  {
    label: "Condo",
    image: villaImg,
    key: "condo",
  },
  {
    label: "Multi-Family",
    image: skyscraperImg,
    key: "multi-family",
  },
  {
    label: "Manufactured",
    image: factoryImg,
    key: "manufactured",
  },
  {
    label: "Other",
    image: requestImg,
    key: "other",
  },
];

const formSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number is too long"),
    rentAmount: z.string().min(1, "Rent amount is required"),
    propertyType: z.string().min(1, "Please select a property type"),
    // Property Address fields
    streetAddress: z.string().min(1, "Street address is required"),
    unit: z.string().optional(),
    city: z.string().min(1, "City is required"),
    region: z.string().min(1, "Region is required"),
    zipCode: z.string().min(1, "Zip code is required"),
    // Lease information
    moveInDate: z
      .date({
        message: "Move-in date is required",
      })
      .refine((date) => date >= new Date(), {
        message: "Move-in date cannot be in the past",
      }),
    leaseStartDate: z
      .date({
        message: "Lease start date is required",
      })
      .optional(),
    leaseEndDate: z
      .date({
        message: "Lease end date is required",
      })
      .optional(),
    leaseTerm: z.enum(["fixed-term", "month-to-month"]),
    uploadLater: z.boolean().optional(),
    photoId: z.any().optional(),
    proofOfIncome: z.any().optional(),
    otherDocs: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.leaseTerm === "fixed-term") {
      if (!data.leaseStartDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Lease start date is required for fixed-term leases",
        });
      }
      if (!data.leaseEndDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Lease end date is required for fixed-term leases",
        });
      }
      if (
        data.leaseStartDate &&
        data.leaseEndDate &&
        data.leaseStartDate >= data.leaseEndDate
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Lease start date must be before lease end date",
        });
      }
    }
  });

export default function AddTenant() {
  const goBack = useGoBack();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      rentAmount: "",
      propertyType: "",
      streetAddress: "",
      unit: "",
      city: "",
      region: "",
      zipCode: "",
      moveInDate: new Date(),
      leaseStartDate: new Date(),
      leaseEndDate: new Date(),
      leaseTerm: "fixed-term",
      uploadLater: false,
      photoId: undefined,
      proofOfIncome: undefined,
      otherDocs: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form Data:", data);
    // Handle form submission here
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MultiStepper>
            <MultiStepperHeader>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MultiStepperBackButton routeBack={goBack} />
                  <PageTitle
                    title="Add Tenant"
                    description=""
                    className="mb-0"
                  />
                </div>
                <div className="text-muted-foreground">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </div>
              </div>
            </MultiStepperHeader>

            {/* Step 1: Tenant Personal Information */}
            <MultiStepperStep
              onValidate={() =>
                form.trigger(["fullName", "email", "phone", "rentAmount"])
              }
            >
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <IconRound icon={personalInfoIcon} size="sm" />
                  <h2 className="text-xl font-medium">Personal Information</h2>
                </div>

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your full name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email ID</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          placeholder="Enter email address"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter phone number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rent Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter rent amount"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </MultiStepperStep>

            {/* Step 2: Property Type Selection */}
            <MultiStepperStep onValidate={() => form.trigger("propertyType")}>
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <div className="">
                    <FormLabel>Property Type</FormLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="mt-2 grid grid-cols-4 gap-4"
                    >
                      {propertyTypes.map((type) => (
                        <label
                          key={type.key}
                          htmlFor={type.key}
                          className="cursor-pointer"
                        >
                          <Card
                            className={`border-input relative cursor-pointer gap-0 border p-2 ${
                              field.value === type.key &&
                              "border-primary bg-blue-50"
                            }`}
                          >
                            <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                              <div className="absolute top-4 left-4">
                                <RadioGroupItem
                                  value={type.key}
                                  id={type.key}
                                />
                              </div>
                              <img
                                src={type.image}
                                alt={type.label}
                                className="size-12"
                              />
                              <span className="text-primary text-lg">
                                {type.label}
                              </span>
                            </CardContent>
                          </Card>
                        </label>
                      ))}
                    </RadioGroup>
                    <FormMessage />
                  </div>
                )}
              />
            </MultiStepperStep>

            {/* Step 3: Property Address and Lease Information */}
            <MultiStepperStep
              onValidate={() =>
                form.trigger([
                  "streetAddress",
                  "city",
                  "region",
                  "zipCode",
                  "leaseTerm",
                  "moveInDate",
                  "leaseStartDate",
                  "leaseEndDate",
                ])
              }
            >
              <div className="space-y-8">
                {/* Property Address Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <img
                      src={villaIcon}
                      alt="Villa Icon"
                      className="max-h-10 max-w-10"
                    />
                    <h2 className="text-xl font-medium">Property Address</h2>
                  </div>

                  <FormField
                    control={form.control}
                    name="streetAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter street address"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter unit number (optional)"
                            />
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
                            <Input {...field} placeholder="Enter city" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Region</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter region/state/province"
                            />
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
                            <Input
                              {...field}
                              placeholder="Enter zip/postal code"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Lease Term Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <img
                      src={leaseIcon}
                      alt="Lease Icon"
                      className="max-h-10 max-w-10"
                    />
                    <h2 className="text-xl font-medium">Lease Term</h2>
                  </div>

                  <FormField
                    control={form.control}
                    name="leaseTerm"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>What is the term for this lease?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="fixed-term"
                                id="fixed-term"
                              />
                              <label
                                htmlFor="fixed-term"
                                className="cursor-pointer"
                              >
                                Fixed Term
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="month-to-month"
                                id="month-to-month"
                              />
                              <label
                                htmlFor="month-to-month"
                                className="cursor-pointer"
                              >
                                Month-to-Month
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="moveInDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <DateInput allowPastDates={false} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("leaseTerm") === "fixed-term" && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="leaseStartDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lease Start Date</FormLabel>
                            <FormControl>
                              <DateInput {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="leaseEndDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lease End Date</FormLabel>
                            <FormControl>
                              <DateInput
                                minDate={form.watch("leaseStartDate")}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
            </MultiStepperStep>

            {/* Step 4: Document Upload */}
            <MultiStepperStep>
              <div className="space-y-8">
                <div className="flex items-center gap-2">
                  <IconRound icon={uploadDocIcon} size="sm" />
                  <h2 className="text-xl font-medium">Upload Document</h2>
                </div>

                {/* Photo ID Upload */}
                <FormField
                  control={form.control}
                  name="photoId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-semibold">
                        Photo ID
                      </FormLabel>
                      <FormControl>
                        <div>
                          <Input
                            id={field.name}
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                          <Label
                            htmlFor={field.name}
                            className="bg-accent flex w-40 cursor-pointer items-center justify-center gap-3 border p-1 shadow hover:bg-white"
                          >
                            <PlusCircleIcon className="size-5" />
                            <span>Upload Photo ID</span>
                          </Label>
                          {field.value && (
                            <p className="mt-2 text-sm">
                              File: {(field.value as File).name}
                            </p>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Proof of Income */}
                <FormField
                  control={form.control}
                  name="proofOfIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-semibold">
                        Proof of Income
                      </FormLabel>
                      <FormControl>
                        <div>
                          <Input
                            id={field.name}
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                          <Label
                            htmlFor={field.name}
                            className="bg-accent flex w-40 cursor-pointer items-center justify-center gap-3 border p-1 shadow hover:bg-white"
                          >
                            <PlusCircleIcon className="size-5" />
                            <span>Upload Proof of Income</span>
                          </Label>
                          {field.value && (
                            <p className="mt-2 text-sm">
                              File: {(field.value as File).name}
                            </p>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Other Documents */}
                <FormField
                  control={form.control}
                  name="otherDocs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-semibold">
                        Other Docs{" "}
                        <span className="text-muted-foreground">
                          (Optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div>
                          <Input
                            id={field.name}
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                          <Label
                            htmlFor={field.name}
                            className="bg-accent flex w-40 cursor-pointer items-center justify-center gap-3 border p-1 shadow hover:bg-white"
                          >
                            <PlusCircleIcon className="size-5" />
                            <span>Upload Other Docs</span>
                          </Label>
                          {field.value && (
                            <p className="mt-2 text-sm">
                              File: {(field.value as File).name}
                            </p>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Upload Later Checkbox */}
                <FormField
                  control={form.control}
                  name="uploadLater"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(!!checked)
                          }
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Upload documents later</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <p className="text-muted-foreground text-sm">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </p>
              </div>
            </MultiStepperStep>

            <MultiStepperButton />
          </MultiStepper>
        </form>
      </Form>
    </div>
  );
}
