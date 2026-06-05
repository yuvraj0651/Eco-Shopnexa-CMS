import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import { Badge } from "@/components/UI/badge";
import { Button } from "@/components/UI/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/UI/dropdown-menu";
import { Progress } from "@/components/UI/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/UI/table";
import React from "react";
import { useMemo } from "react";
import { IoBanOutline, IoCheckmarkCircleOutline, IoEllipsisVertical, IoEyeOutline } from "react-icons/io5";

const CustomersTable = ({ searchTerm, customers }) => {
  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [customers, searchTerm]);

  return (
    <Card className="rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
          Customers
        </CardTitle>

        <Button className="rounded-xl bg-emerald-500 hover:bg-emerald-600">
          Add Customer
        </Button>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow> 
                <TableHead>Customer</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Loyalty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={customer.avatar} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {customer.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{customer.orders}</TableCell>

                  <TableCell>${customer.totalSpent}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress value={customer.loyalty} className="h-2 w-28" />

                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {customer.loyalty}%
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={`rounded-full px-3 py-1 ${
                        customer.blocked
                          ? "bg-red-500/10 text-red-600 dark:text-red-400"
                          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>

                  <TableCell>{customer.joined}</TableCell>

                  <TableCell>
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <IoEllipsisVertical />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <IoEyeOutline className="mr-2" />
                            View Profile
                          </DropdownMenuItem>

                          {customer.blocked ? (
                            <DropdownMenuItem>
                              <IoCheckmarkCircleOutline className="mr-2" />
                              Unblock User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <IoBanOutline className="mr-2" />
                              Block User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomersTable;
