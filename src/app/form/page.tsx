import AdvancedForm from "@/components/AdvancedForm";

export const metadata = {
  title: "Advanced Form Demo | Next.js + shadcn/ui Template",
  description: "Demo of advanced form handling with React Hook Form and Zod validation",
};

export default function FormPage() {
  return (
    <div className="container py-10 space-y-6">
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <h1 className="text-3xl font-bold">Advanced Form with Conditional Fields</h1>
        <p className="text-muted-foreground">
          This form demonstrates conditional fields, validation, file uploads, and submission handling.
        </p>
      </div>
      
      <AdvancedForm />
      
      <div className="max-w-2xl mx-auto mt-8 p-4 border rounded-lg bg-muted/30">
        <h2 className="text-lg font-medium mb-2">Implementation Details</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Uses React Hook Form for state management</li>
          <li>Implements Zod schema validation</li>
          <li>Features conditional fields based on selected contact method</li>
          <li>Supports file uploads with drag-and-drop interface</li>
          <li>Includes form submission with progress indicator</li>
          <li>Sends email notifications via EmailJS</li>
          <li>Stores submissions in database via Prisma</li>
        </ul>
      </div>
    </div>
  );
}
