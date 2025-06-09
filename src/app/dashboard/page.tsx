"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Simulated data for the dashboard
const formSubmissions = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "General Inquiry",
    status: "new",
    createdAt: "2025-06-01T10:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Technical Support",
    status: "in-progress",
    createdAt: "2025-06-02T14:15:00Z",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    subject: "Feature Request",
    status: "completed",
    createdAt: "2025-06-03T09:45:00Z",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    subject: "Bug Report",
    status: "new",
    createdAt: "2025-06-05T16:20:00Z",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@example.com",
    subject: "Account Issues",
    status: "in-progress",
    createdAt: "2025-06-06T11:10:00Z",
  },
];

// Simulated stats
const stats = {
  total: 42,
  new: 15,
  inProgress: 8,
  completed: 19,
  filesUploaded: 37,
  emailsSent: 56,
};

export default function DashboardPage() {
  const [filter, setFilter] = useState<string>("all");
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  // Get filtered submissions
  const getFilteredSubmissions = () => {
    if (filter === "all") return formSubmissions;
    return formSubmissions.filter(submission => submission.status === filter);
  };
  
  // Get status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="container py-10">
      <div className="space-y-2 mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of form submissions and system statistics
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.new}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Being processed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Successfully resolved</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="submissions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="submissions">Form Submissions</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="emails">Email Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submissions">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0">
                <div>
                  <CardTitle>Recent Form Submissions</CardTitle>
                  <CardDescription>Manage and track submissions</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Status:</span>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredSubmissions().map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{submission.name}</div>
                          <div className="text-sm text-muted-foreground">{submission.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{submission.subject}</TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell>{formatDate(submission.createdAt)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption>
                  Showing {getFilteredSubmissions().length} of {stats.total} total submissions
                </TableCaption>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">Export Data</Button>
              <Button size="sm">
                <Link href="/form">New Submission</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle>File Uploads</CardTitle>
              <CardDescription>
                Recent file uploads and storage usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Storage usage</span>
                  <span className="text-sm text-muted-foreground">24.5MB / 500MB</span>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div className="h-2 bg-primary rounded-full w-[5%]" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {stats.filesUploaded} files uploaded
                </p>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3">Recent Uploads</h4>
                <div className="space-y-2">
                  {["document.pdf", "image.jpg", "spreadsheet.xlsx"].map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                          <span className="text-xs">{file.split('.').pop()}</span>
                        </div>
                        <span>{file}</span>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Link href="/upload" className="w-full">Upload New File</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="emails">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Recent emails sent through the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { recipient: "john@example.com", subject: "Form Submission Confirmation", status: "delivered", date: "Jun 5, 2025" },
                    { recipient: "support@company.com", subject: "New Support Request", status: "delivered", date: "Jun 4, 2025" },
                    { recipient: "jane@example.com", subject: "Your Request Update", status: "delivered", date: "Jun 3, 2025" },
                    { recipient: "admin@company.com", subject: "Weekly Report", status: "failed", date: "Jun 2, 2025" },
                  ].map((email, i) => (
                    <TableRow key={i}>
                      <TableCell>{email.recipient}</TableCell>
                      <TableCell>{email.subject}</TableCell>
                      <TableCell>
                        {email.status === "delivered" ? (
                          <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>
                        ) : (
                          <Badge variant="destructive">Failed</Badge>
                        )}
                      </TableCell>
                      <TableCell>{email.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Total emails sent: {stats.emailsSent}
              </div>
              <Button size="sm">
                <Link href="/email">Send Email</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 border rounded-lg p-4 bg-muted/30">
        <h2 className="text-lg font-medium mb-2">Dashboard Implementation</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Built with shadcn/ui components like Card, Table, and Tabs</li>
          <li>Client-side state management for filters</li>
          <li>Integration points for real data from database</li>
          <li>Responsive layout for all screen sizes</li>
          <li>Ready for authentication integration</li>
        </ul>
      </div>
    </div>
  );
}
