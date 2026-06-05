import React from "react";

import { Card, CardContent } from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Progress } from "@/components/ui/progress";

const CustomerAnalytics = ({ customers }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {customers.map((item) => (
        <Card
          key={item.id}
          className="h-fit rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={item.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-500">
                  ${item.totalSpent} spent
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Engagement
                </span>

                <span className="font-medium text-slate-900 dark:text-white">
                  {item.loyalty}%
                </span>
              </div>

              <Progress
                value={item.loyalty}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CustomerAnalytics;