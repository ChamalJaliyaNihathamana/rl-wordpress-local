import {
  ChatLeftTextFill,
  ClockHistory,
  PersonCircle,
  ArchiveFill,
  HouseFill,
  MegaphoneFill,
  Percent,
  PersonBoundingBox,
  TagsFill,
  GeoAltFill,
  Clipboard2DataFill,
} from "react-bootstrap-icons";

export const DrawerData = [
  {
    title: "My Dashboard",
    path: "/dashboard",
    icon: <ChatLeftTextFill />,
  },
  {
    title: "Order History",
    path: "/order-history",
    icon: <ClockHistory />,
  },
  {
    title: "Update Profile",
    path: "/update-profile",
    icon: <PersonCircle />,
  },
  {
    title: "Inventory",
    path: "/pick-up",
    icon: <Clipboard2DataFill />,
  },
];

export const DrawerAdminData = [
  {
    title: "Home",
    id: "home",
    path: "/admin/dashboard",
    icon: <HouseFill />,
  },

  {
    title: "Advertisement",
    id: "advertisement",
    path: "/admin/advertisement",
    icon: <MegaphoneFill />,
  },

  {
    title: "Discount Codes",
    id: "discountCodes",
    path: "/admin/discount-code",
    icon: <Percent />,
  },
  {
    title: "Distance Charges",
    id: "distanceCharges",
    path: "/admin/distance-charges",
    icon: <GeoAltFill />,
  },
  {
    title: "Manager Users",
    id: "managerUsers",
    path: "/admin/manage-users",
    icon: <PersonBoundingBox />,
  },
  {
    title: "Package Manager",
    id: "managerPackages",
    path: "/admin/manage-packages",
    icon: <ArchiveFill />,
  },
  {
    title: "Pricing",
    id: "pricing",
    path: "/admin/pricing",
    icon: <TagsFill />,
  },
];
