import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Database Integration | Next.js + shadcn/ui Template",
  description: "Database integration examples with Prisma",
};

// Example form submissions (in a real app, these would come from the database)
const exampleSubmissions = [
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
];

export default function DatabasePage() {
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "blue";
      case "in-progress":
        return "yellow";
      case "completed":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <h1 className="text-3xl font-bold">Database Integration</h1>
        <p className="text-muted-foreground">
          Prisma ORM integration with PostgreSQL or MongoDB
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Database Setup</CardTitle>
            <CardDescription>Connect to your database of choice</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              This template uses Prisma as an ORM and supports both PostgreSQL (via Vercel Postgres) 
              and MongoDB. Set up your database connection in the <code>.env</code> file.
            </p>
            <div className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
              <pre>{`# PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# MongoDB
# Add your MongoDB connection string in .env file`}</pre>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="https://www.prisma.io/docs" target="_blank">
              <Button variant="outline">Prisma Docs</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Model Schema</CardTitle>
            <CardDescription>Prisma models for your application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              The template includes predefined models for form submissions, users, 
              file uploads, and email notifications.
            </p>
            <div className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
              <pre>{`model FormSubmission {
  id           String   @id @default(uuid())
  name         String
  email        String
  subject      String
  message      String
  // Other fields...
}`}</pre>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/prisma/schema.prisma">
              <Button variant="outline">View Schema</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Example Data</CardTitle>
          <CardDescription>
            Form submissions stored in the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Recent form submissions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exampleSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-mono text-xs">
                    {submission.id}
                  </TableCell>
                  <TableCell>{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.subject}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(submission.status) as any}>
                      {submission.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(submission.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="max-w-3xl mx-auto mt-8 p-4 border rounded-lg bg-muted/30">
        <h2 className="text-lg font-medium mb-2">Implementation Details</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Uses Prisma ORM for database operations</li>
          <li>Supports PostgreSQL via Vercel Postgres</li>
          <li>Alternatively supports MongoDB</li>
          <li>Includes data models for forms, users, files, and emails</li>
          <li>Implements database connection pooling for serverless environments</li>
          <li>Singleton pattern prevents connection issues during development</li>
        </ul>
      </div>
    </div>
  );
}
