import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router";

interface EducationCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export function EducationCard({
  title,
  description,
  imageUrl,
}: EducationCardProps) {
  return (
    <div className="mb-8 grid gap-4 @md:grid-cols-3">
      <div className="relative col-span-1 w-full overflow-hidden rounded-lg shadow">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="cursor-pointer rounded-full bg-white/80 p-3 transition-colors hover:bg-white/90">
            <Play className="fill-primary text-primary h-8 w-8" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between @md:col-span-2">
        <div>
          <h3 className="text-primary mb-2 text-xl font-bold">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <Link to="/landlord/lease-agreement">
          <Button className="mt-4 w-36">Learn More</Button>
        </Link>
      </div>
    </div>
  );
}
