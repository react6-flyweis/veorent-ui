import { type SidebarItem } from "@/features/shared/layouts/AppSidebar";

// Landlord navigation items
export const landlordNavigation: SidebarItem[] = [
  {
    icon: "dashboard.png",
    title: "Dashboard",
    url: "/landlord",
  },
  {
    title: "Messages",
    icon: "message.png",
    url: "/landlord/messages",
  },
  {
    title: "Maintenance",
    icon: "maintenance.png",
    url: "/landlord/maintenance",
  },
  {
    title: "Leases",
    icon: "lease.png",
    url: "/landlord/leases",
  },
  {
    title: "Form",
    icon: "forms.png",
    url: "/landlord/forms",
  },
  {
    title: "Renters",
    icon: "renters.png",
    url: "/landlord/renters",
  },
  {
    title: "Settings",
    icon: "setting.png",
    url: "/landlord/settings",
  },
];
