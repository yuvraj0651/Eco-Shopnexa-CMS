import {
  FileText,
  Globe,
  Archive,
  Clock3,
} from "lucide-react";

export const getStats = ({
  totalSections,
  totalItems,
}) => [
  {
    title: "Total Sections",
    value: totalSections,
    icon: FileText,
  },

  {
    title: "Content Blocks",
    value: totalItems,
    icon: Globe,
  },

  {
    title: "Pages",
    value: 5,
    icon: Archive,
  },

  {
    title: "Forms",
    value: 1,
    icon: Clock3,
  },
];