import { motion } from "framer-motion";
import {
  IoTrendingUpOutline,
  IoPeopleOutline,
  IoWalletOutline,
  IoStarOutline,
} from "react-icons/io5";

import { Card, CardContent } from "@/components/UI/card";
import { Badge } from "@/components/UI/badge";

const stats = [
  {
    title: "Total Customers",
    value: "12,480",
    icon: IoPeopleOutline,
    growth: "+12%",
  },
  {
    title: "Revenue Generated",
    value: "$84,320",
    icon: IoWalletOutline,
    growth: "+18%",
  },
  {
    title: "Loyal Customers",
    value: "1,420",
    icon: IoStarOutline,
    growth: "+8%",
  },
  {
    title: "Retention Rate",
    value: "78%",
    icon: IoTrendingUpOutline,
    growth: "+5%",
  },
];

const CustomerStats = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p>{item.title}</p>
                    <h2>{item.value}</h2>

                    <Badge>{item.growth}</Badge>
                  </div>

                  <Icon className="text-2xl" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CustomerStats;
