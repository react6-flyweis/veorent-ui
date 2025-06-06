import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { IconRound } from "@/components/IconRound";
import { Button } from "@/components/ui/button";

import penApplicationIcon from "../assets/pen-application.png";
import petIcon from "../assets/pet.png";
import utilitiesIcon from "../assets/utilities.png";
import provisionsIcon from "../assets/provisions.png";
import depositIcon from "../assets/deposit.png";
import groupIcon from "../assets/group.png";
import { Link } from "react-router";

interface Section {
  id: string;
  title: string;
  description: string;
  icon: string;
  path?: string;
}

const sections: Section[] = [
  {
    id: "lease-specifics",
    title: "Lease Specifics",
    description: "Verify the address and lease terms.",
    icon: penApplicationIcon,
    path: "/landlord/lease-agreement/specific",
  },
  {
    id: "rent-deposit-fees",
    title: "Rent, Deposit, & Fees",
    description: "Set the rent amount, security deposit, and fees.",
    icon: depositIcon,
    path: "/landlord/lease-agreement/rent-deposit-fee",
  },
  {
    id: "people",
    title: "People on the Lease",
    description: "Confirm the landlord and tenant info.",
    icon: groupIcon,
    path: "/landlord/lease-agreement/people-on-lease",
  },
  {
    id: "pet-smoking",
    title: "Pet, Smoking & Other",
    description:
      "Specify pets, smoking policy, and if renters insurance is required.",
    icon: petIcon,
    path: "/landlord/lease-agreement/pet-smoking",
  },
  {
    id: "utilities",
    title: "Utilities, Services, & Keys",
    description: "Choose what is included with the lease.",
    icon: utilitiesIcon,
    path: "/landlord/lease-agreement/utilities-services",
  },
  {
    id: "provisions",
    title: "Provisions & Attachments",
    description:
      "Add custom clauses, rules or provisions specific to your property and/or local area.",
    icon: provisionsIcon,
    path: "/landlord/lease-agreement/provisions-attachments",
  },
];

export function AgreementBuilder() {
  return (
    <div className="space-y-6">
      <Card className="gap-2 border-0 bg-blue-200 p-4">
        <CardTitle className="text-semibold text-lg">
          Here's what you need to know:
        </CardTitle>
        <CardContent className="p-0">
          <ul className="list-disc space-y-1">
            {new Array(4)
              .fill(
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              )
              .map((t, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="size-3 bg-orange-400"></div>
                  <span>{t}</span>
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex flex-col items-center justify-between gap-3 rounded-lg border bg-white p-4 @md:flex-row"
          >
            <div className="flex items-center gap-4">
              <IconRound icon={section.icon} />
              <div>
                <p className="text-xl font-semibold">{section.title}</p>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
            </div>

            <Button
              className="w-full rounded-lg @md:w-28"
              variant="outlinePrimary"
              asChild
              disabled={!section.path}
            >
              <Link to={section.path ?? "#"}>START</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
