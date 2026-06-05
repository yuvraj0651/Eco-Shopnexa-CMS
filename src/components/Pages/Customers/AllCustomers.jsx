import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { customerStats } from "../constants/customerStats";

const AllCustomers = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {customerStats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
            }}
          >
            <Card className="rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p>{item.title}</p>

                    <h2 className="mt-2 text-3xl font-bold">
                      {item.value}
                    </h2>

                    <Badge className="mt-3">
                      {item.growth}
                    </Badge>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl">
                    <Icon className="text-2xl" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AllCustomers;