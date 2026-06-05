import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const UserProfileCard = ({ customer }) => {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 border-4 border-emerald-500/20">
            <AvatarImage src={customer.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
            {customer.name}
          </h2>

          <p className="text-sm text-slate-500">{customer.email}</p>

          <Badge className="mt-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            {customer.status}
          </Badge>

          <div className="mt-6 w-full space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">Loyalty Score</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {customer.loyalty}%
                </span>
              </div>

              <Progress value={customer.loyalty} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                <p className="text-xs text-slate-500">Orders</p>
                <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {customer.orders}
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                <p className="text-xs text-slate-500">Spent</p>
                <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  ${customer.totalSpent}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;