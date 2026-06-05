import { IoSearch } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { Input } from "@/components/UI/input";
import { Button } from "@/components/UI/button";
import { Tabs, TabsContent } from "@/components/UI/tabs";
import { TabsList } from "@/components/UI/tabs";
import { TabsTrigger } from "@/components/UI/tabs";
import UserProfileCard from "./UsersProfileCard";
import { customerData } from "./CustomerData";
import CustomersTable from "./CustomersTable";
import { Card, CardContent } from "@/components/UI/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import { Progress } from "@/components/UI/progress";
import PurchaseHistory from "./PurchaseHistory";
import CustomerStats from "@/components/Pages/Customers/CustomerStats";

const CustomersHeader = ({ searchTerm, setSearchTerm }) => {

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Customers
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage customers, loyalty & analytics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-80">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customers..."
              className="h-12 rounded-2xl border border-slate-200 bg-white pl-10 dark:border-slate-700 dark:bg-slate-950"
            />
          </div>

          <Button
            variant="outline"
            className="h-12 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <IoFilter className="mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* STATS */}
      <CustomerStats />

      {/* CONTENT */}
      {/* <Tabs defaultValue="customers" className="space-y-6">
        <TabsList className="inline-flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
          <TabsTrigger
            value="customers"
            className="rounded-xl px-5 py-2 text-sm font-medium data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
          >
            Customers
          </TabsTrigger>

          <TabsTrigger
            value="analytics"
            className="rounded-xl px-5 py-2 text-sm font-medium data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
          >
            Analytics
          </TabsTrigger>

          <TabsTrigger
            value="history"
            className="rounded-xl px-5 py-2 text-sm font-medium data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
          >
            Purchase History
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
          <UserProfileCard customer={customerData[0]} />

          <CustomersTable customers={customerData} searchTerm={searchTerm} />
        </div>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {customerData.map((item) => (
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
                      <span className="text-slate-500">Engagement</span>

                      <span className="font-medium text-slate-900 dark:text-white">
                        {item.loyalty}%
                      </span>
                    </div>

                    <Progress value={item.loyalty} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <PurchaseHistory />
        </TabsContent>
      </Tabs> */}
    </div>
  );
};

export default CustomersHeader;
