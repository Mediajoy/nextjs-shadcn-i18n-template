import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export const metadata = {
  title: "Documentation | Next.js + shadcn/ui Template",
  description: "Comprehensive documentation for the Next.js and shadcn/ui template",
};

export default function DocsPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2 mb-10 text-center">
          <h1 className="text-3xl font-bold">Documentation</h1>
          <p className="text-muted-foreground">
            Learn how to use and extend the Next.js + shadcn/ui template
          </p>
        </div>

        <Tabs defaultValue="getting-started" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="api">API Routes</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
          </TabsList>

          {/* Getting Started Tab */}
          <TabsContent value="getting-started" className="space-y-6">
            <h2 className="text-2xl font-bold">Getting Started</h2>
            <p>Follow these steps to get started with the template:</p>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">1. Clone and Install</h3>
                <pre className="bg-muted mt-2 p-2 rounded-md overflow-x-auto text-xs">
                  <code>
{`git clone https://github.com/your-username/nextjs-shadcn-template.git
cd nextjs-shadcn-template
npm install`}
                  </code>
                </pre>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">2. Environment Variables</h3>
                <p className="text-sm mt-1">Copy the .env.example file to .env.local and fill in your values:</p>
                <pre className="bg-muted mt-2 p-2 rounded-md overflow-x-auto text-xs">
                  <code>cp .env.example .env.local</code>
                </pre>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">3. Database Setup (Optional)</h3>
                <p className="text-sm mt-1">If you're using a database, run the Prisma migration:</p>
                <pre className="bg-muted mt-2 p-2 rounded-md overflow-x-auto text-xs">
                  <code>npx prisma migrate dev</code>
                </pre>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">4. Development Server</h3>
                <p className="text-sm mt-1">Start the development server:</p>
                <pre className="bg-muted mt-2 p-2 rounded-md overflow-x-auto text-xs">
                  <code>npm run dev</code>
                </pre>
              </div>
            </div>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-6">
            <h2 className="text-2xl font-bold">Components</h2>
            <p>The template includes a variety of pre-built components from shadcn/ui.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>UI Components</CardTitle>
                  <CardDescription>Core UI components using shadcn/ui</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Button</li>
                    <li>Card</li>
                    <li>Dialog</li>
                    <li>Form controls</li>
                    <li>Tabs</li>
                    <li>... and more</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="https://ui.shadcn.com/docs">
                    <span className="text-sm text-blue-600 hover:underline">shadcn/ui docs</span>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Custom Components</CardTitle>
                  <CardDescription>Template-specific components</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1">
                    <li>FileUpload</li>
                    <li>AdvancedForm</li>
                    <li>Toast notifications</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/form">
                    <span className="text-sm text-blue-600 hover:underline">View demos</span>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <Alert className="mt-6">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Extending Components</AlertTitle>
              <AlertDescription>
                You can extend or customize the components in <code>src/components</code>. For shadcn/ui components,
                modify them in <code>src/components/ui</code>.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms" className="space-y-6">
            <h2 className="text-2xl font-bold">Form Handling</h2>
            <p>The template uses React Hook Form with Zod validation.</p>

            <div className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Form Setup</CardTitle>
                  <CardDescription>How to create a form with validation</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-2 rounded-md overflow-x-auto text-xs">
                    <code>
{`// 1. Create a Zod schema
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  // more fields...
});

// 2. Create a form component
function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "" }
  });

  const onSubmit = (data) => {
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </Form>
  );
}`}
                    </code>
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conditional Validation</CardTitle>
                  <CardDescription>Show/hide fields based on conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-2 rounded-md overflow-x-auto text-xs">
                    <code>
{`// In your Zod schema
const formSchema = z.object({
  contactMethod: z.enum(["email", "phone", "both"]),
  email: z.string().email(),
  phone: z.string().optional().refine(
    (val, ctx) => {
      if (ctx.parent.contactMethod === "phone" || 
          ctx.parent.contactMethod === "both") {
        return !!val;
      }
      return true;
    },
    { message: "Phone is required for this contact method" }
  ),
});`}
                    </code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* API Routes Tab */}
          <TabsContent value="api" className="space-y-6">
            <h2 className="text-2xl font-bold">API Routes</h2>
            <p>The template includes several API routes for handling form submissions, file uploads, and more.</p>

            <div className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Forms API</CardTitle>
                  <CardDescription>Form submission and management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium">POST /api/forms/submit</p>
                      <p className="text-sm text-muted-foreground">Submit a new form</p>
                    </div>
                    <div>
                      <p className="font-medium">GET /api/forms/[id]</p>
                      <p className="text-sm text-muted-foreground">Retrieve a specific form</p>
                    </div>
                    <div>
                      <p className="font-medium">PATCH /api/forms/[id]</p>
                      <p className="text-sm text-muted-foreground">Update a form</p>
                    </div>
                    <div>
                      <p className="font-medium">DELETE /api/forms/[id]</p>
                      <p className="text-sm text-muted-foreground">Delete a form</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upload API</CardTitle>
                  <CardDescription>File upload endpoint</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium">POST /api/upload</p>
                      <p className="text-sm text-muted-foreground">Upload files to Vercel Blob Storage</p>
                    </div>
                    <div>
                      <p className="font-medium">GET /api/upload</p>
                      <p className="text-sm text-muted-foreground">Get pre-signed upload URL (optional)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Database Tab */}
          <TabsContent value="database" className="space-y-6">
            <h2 className="text-2xl font-bold">Database Integration</h2>
            <p>The template uses Prisma ORM with support for PostgreSQL and MongoDB.</p>

            <div className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Schema Overview</CardTitle>
                  <CardDescription>Main database models</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-2 rounded-md overflow-x-auto text-xs">
                    <code>
{`// Key models in prisma/schema.prisma

model FormSubmission {
  id           String   @id @default(uuid())
  name         String
  email        String
  // ...more fields
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  // ...more fields
}

model FileUpload {
  id          String   @id @default(uuid())
  fileName    String
  fileUrl     String   @unique
  // ...more fields
}`}
                    </code>
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Database Usage</CardTitle>
                  <CardDescription>How to use Prisma in your code</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-2 rounded-md overflow-x-auto text-xs">
                    <code>
{`// Import the Prisma client
import { prisma } from "@/lib/database";

// Create a record
const user = await prisma.user.create({
  data: {
    email: "user@example.com",
    name: "User Name",
  },
});

// Query records
const forms = await prisma.formSubmission.findMany({
  where: {
    email: "user@example.com",
  },
  orderBy: {
    createdAt: "desc",
  },
  take: 10,
});`}
                    </code>
                  </pre>
                </CardContent>
              </Card>

              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Database Connection</AlertTitle>
                <AlertDescription>
                  The template uses a singleton pattern for the Prisma client to prevent connection issues in development.
                  See <code>src/lib/database.ts</code> for the implementation.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
