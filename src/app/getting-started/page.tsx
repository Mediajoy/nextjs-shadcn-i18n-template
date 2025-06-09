import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block/code-block";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
  title: "Getting Started | Next.js + shadcn/ui Template",
  description: "Learn how to get started with the Next.js and shadcn/ui template",
};

export default function GettingStartedPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">Getting Started</h1>
          <p className="text-muted-foreground">
            Follow these steps to get up and running with the Next.js + shadcn/ui template
          </p>
        </div>

        <div className="space-y-10">
          {/* Prerequisites */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Prerequisites</h2>
            <p>Before you begin, make sure you have the following installed:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Node.js 18.17 or later</li>
              <li>npm, yarn, or pnpm</li>
              <li>Git (optional, for version control)</li>
            </ul>
          </section>

          {/* Installation */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
            <p>Follow these steps to install and set up the template:</p>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Step 1: Clone the repository</CardTitle>
                  <CardDescription>Clone the template repository to your local machine.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock 
                    code="git clone https://github.com/yourusername/nextjs-shadcn-template.git my-project
cd my-project" 
                    language="bash"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 2: Install dependencies</CardTitle>
                  <CardDescription>Install all the required packages.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock 
                    code="npm install
# or
yarn install
# or
pnpm install" 
                    language="bash"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 3: Set up environment variables</CardTitle>
                  <CardDescription>Create a .env.local file with your configuration.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock 
                    code="cp .env.example .env.local" 
                    language="bash"
                  />
                  <p className="text-sm text-muted-foreground mt-4">
                    Then edit .env.local to add your specific configuration values:
                  </p>
                  <CodeBlock 
                    code="# Database connection (PostgreSQL default)
DATABASE_URL=postgresql://username:password@localhost:5432/mydb

# EmailJS configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Vercel Blob Storage
NEXT_PUBLIC_VERCEL_BLOB_READ_WRITE_TOKEN=your_token" 
                    language="env"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 4: Set up your database (optional)</CardTitle>
                  <CardDescription>If using a database, set up Prisma and run migrations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock 
                    code="# Generate Prisma client
npx prisma generate

# Create your database tables (if using a database)
npx prisma migrate dev --name init" 
                    language="bash"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 5: Start the development server</CardTitle>
                  <CardDescription>Run the Next.js development server to preview your app.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock 
                    code="npm run dev
# or
yarn dev
# or
pnpm dev" 
                    language="bash"
                  />
                  <p className="text-sm text-muted-foreground mt-4">
                    Your app should now be running at <code className="bg-muted px-1 rounded">http://localhost:3000</code>
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Project Structure */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Project Structure</h2>
            <p>The project follows a standard Next.js 14 application structure:</p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="structure">
                <AccordionTrigger>View Project Structure</AccordionTrigger>
                <AccordionContent>
                  <CodeBlock
                    code={`nextjs-shadcn-template/
├── .vscode/                 # VS Code configuration
├── prisma/                  # Prisma schema and migrations
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API routes
│   │   │   ├── forms/       # Form submission API
│   │   │   └── upload/      # File upload API
│   │   ├── form/            # Form demo page
│   │   ├── upload/          # File upload demo page
│   │   ├── email/           # Email demo page
│   │   ├── database/        # Database demo page
│   │   ├── dashboard/       # Dashboard demo page
│   │   ├── docs/            # Documentation page
│   │   ├── getting-started/ # Getting started guide
│   │   ├── search/          # Search results page
│   │   ├── layout.tsx       # Root layout component
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── layout/          # Layout components (header, footer)
│   │   ├── theme/           # Theme components
│   │   └── ...              # Other components
│   ├── lib/                 # Utility functions and modules
│   │   ├── database.ts      # Database client
│   │   ├── email.ts         # Email utilities
│   │   ├── utils.ts         # General utilities
│   │   └── validations.ts   # Zod schemas
│   └── types/               # TypeScript types
│       └── index.ts         # Type definitions
├── .env.example             # Example env variables
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore file
├── .prettierrc              # Prettier configuration
├── jest.config.js           # Jest configuration
├── jest.setup.js            # Jest setup file
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration`}
                    language="plain"
                    showLineNumbers={false}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Key Features */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Key Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Form Handling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Forms with React Hook Form and Zod validation.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/form">View Demo</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>File Uploads</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Upload files with drag-and-drop and progress tracking.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/upload">View Demo</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Send emails with EmailJS and track progress.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/email">View Demo</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Database</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Prisma ORM with PostgreSQL/MongoDB support.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/database">View Demo</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Data visualization and management interface.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/dashboard">View Demo</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Comprehensive guides and code examples.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/docs">View Docs</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Next Steps */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
            <p>Ready to start building? Here's what to do next:</p>

            <ul className="list-decimal list-inside space-y-2 ml-4">
              <li>Customize the template to fit your project requirements</li>
              <li>Configure your environment variables for services you plan to use</li>
              <li>Extend the Prisma schema for your specific data models</li>
              <li>Modify the UI components in <code className="bg-muted px-1 rounded">src/components/ui</code></li>
              <li>Implement your own API routes based on the provided examples</li>
            </ul>

            <div className="mt-6">
              <Button asChild>
                <Link href="/docs">
                  View Full Documentation
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
