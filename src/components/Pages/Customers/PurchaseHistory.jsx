import { Badge } from "@/components/UI/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";

import { purchaseHistory } from "./PurchaseHistoryData";

const PurchaseHistory = () => {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
          Purchase History
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {purchaseHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
            >
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {item.id}
                </h3>

                <p className="text-sm text-slate-500">
                  {item.customer}
                </p>
              </div>

              <div className="text-right">
                <h4 className="font-bold text-slate-900 dark:text-white">
                  {item.amount}
                </h4>

                <p className="text-sm text-slate-500">
                  {item.date}
                </p>
              </div>

              <Badge className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseHistory;