"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";

import { usePermissions, RequirePermission } from "@/providers/permissions";
import { usePagination } from "@/hooks/use-pagination";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";

// Sample user data for demonstration
const users = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    role: "admin",
    status: "active",
    lastActive: "2023-06-12T09:45:00Z",
    createdAt: "2023-01-15T14:30:00Z",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "editor",
    status: "active",
    lastActive: "2023-06-11T15:22:00Z",
    createdAt: "2023-02-08T11:15:00Z",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "viewer",
    status: "inactive",
    lastActive: "2023-05-28T10:30:00Z",
    createdAt: "2023-02-20T09:45:00Z",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "editor",
    status: "active",
    lastActive: "2023-06-10T16:15:00Z",
    createdAt: "2023-03-05T13:20:00Z",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert@example.com",
    role: "viewer",
    status: "pending",
    lastActive: null,
    createdAt: "2023-06-01T08:30:00Z",
  },
  {
    id: "6",
    name: "Jennifer Lee",
    email: "jennifer@example.com",
    role: "admin",
    status: "active",
    lastActive: "2023-06-12T11:10:00Z",
    createdAt: "2023-01-22T10:00:00Z",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david@example.com",
    role: "editor",
    status: "inactive",
    lastActive: "2023-04-15T14:20:00Z",
    createdAt: "2023-03-18T15:30:00Z",
  },
  {
    id: "8",
    name: "Lisa Garcia",
    email: "lisa@example.com",
    role: "viewer",
    status: "active",
    lastActive: "2023-06-09T09:15:00Z",
    createdAt: "2023-04-10T08:45:00Z",
  },
  {
    id: "9",
    name: "Thomas Martinez",
    email: "thomas@example.com",
    role: "editor",
    status: "pending",
    lastActive: null,
    createdAt: "2023-06-05T11:20:00Z",
  },
  {
    id: "10",
    name: "Jessica Robinson",
    email: "jessica@example.com",
    role: "viewer",
    status: "active",
    lastActive: "2023-06-08T13:45:00Z",
    createdAt: "2023-05-12T10:30:00Z",
  },
];

// Role options for filter
const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
];

// Status options for filter
const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
];

// Get status badge
const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
    case "inactive":
      return <Badge variant="secondary">Inactive</Badge>;
    case "pending":
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

// Data-table column header component
function DataTableColumnHeader({ column, title }) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="whitespace-nowrap"
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function UsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { hasPermission } = usePermissions();

  // Set up pagination with URL syncing
  const pagination = usePagination({
    defaultPageSize: 5,
    defaultPage: 1,
  });

  // Define table columns
  const columns = [
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("name")}</div>
          <div className="text-sm text-muted-foreground">{row.original.email}</div>
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      id: "role",
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        return (
          <div className="capitalize">{role}</div>
        );
      },
      enableSorting: true,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        return getStatusBadge(row.getValue("status"));
      },
      enableSorting: true,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "lastActive",
      accessorKey: "lastActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Active" />
      ),
      cell: ({ row }) => {
        const lastActive = row.getValue("lastActive");
        if (!lastActive) return <span className="text-muted-foreground">Never</span>;
        return formatDate(lastActive as string);
      },
      enableSorting: true,
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Joined" />
      ),
      cell: ({ row }) => {
        return formatDate(row.getValue("createdAt"));
      },
      enableSorting: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => router.push(`/dashboard/users/${user.id}`)}
                >
                  View details
                </DropdownMenuItem>
                <RequirePermission permission="users:write">
                  <DropdownMenuItem
                    onClick={() => router.push(`/dashboard/users/${user.id}/edit`)}
                  >
                    Edit
                  </DropdownMenuItem>
                </RequirePermission>
                <DropdownMenuSeparator />
                <RequirePermission permission="users:delete">
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => alert(`Delete user: ${user.name}`)}
                  >
                    Delete
                  </DropdownMenuItem>
                </RequirePermission>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Users</h1>
        <RequirePermission permission="users:write">
          <Button onClick={() => router.push("/dashboard/users/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </RequirePermission>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            View and manage users across your organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={users}
            pagination={pagination}
            toolbar={(table) => (
              <DataTableToolbar
                table={table}
                searchPlaceholder="Search users..."
                searchColumn="name"
                filters={[
                  {
                    id: "role",
                    title: "Role",
                    component: (
                      <DataTableFacetedFilter
                        column={table.getColumn("role")}
                        title="Role"
                        options={roleOptions}
                      />
                    ),
                  },
                  {
                    id: "status",
                    title: "Status",
                    component: (
                      <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={statusOptions}
                      />
                    ),
                  },
                ]}
              />
            )}
          />
        </CardContent>
      </Card>

      <Card className="bg-muted/30 border border-dashed">
        <CardHeader>
          <CardTitle className="text-base">Implementation Details</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>This users table demonstrates the following features:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Data table component with sorting, filtering, and pagination</li>
            <li>Role-based access control for actions</li>
            <li>URL-synced pagination state</li>
            <li>Faceted filters for role and status</li>
            <li>Formatted date display using our formatter utilities</li>
            <li>Responsive design for all screen sizes</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
