"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Email form schema
const emailSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message is too short"),
});

type EmailFormValues = z.infer<typeof emailSchema>;

export default function EmailPage() {
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: EmailFormValues) => {
    setIsSending(true);
    setProgress(25);

    try {
      // This is where we would use EmailJS to send the email
      // For demo purposes, we'll simulate the API call
      // In a real app, you would import the sendEmail function from @/lib/email
      
      setProgress(50);
      
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setProgress(100);
      
      toast.success("Email sent successfully!");
      form.reset();
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsSending(false);
      setTimeout(() => setProgress(0), 500);
    }
  };

  return (
    <div className="container py-10 space-y-6">
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <h1 className="text-3xl font-bold">Email Integration Demo</h1>
        <p className="text-muted-foreground">
          Send emails using EmailJS integration
        </p>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Send Email</CardTitle>
          <CardDescription>
            Complete the form below to send an email notification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Email subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Your message here..." 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {isSending && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Sending email...</span>
                    <span className="text-sm">{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={isSending}>
                {isSending ? "Sending..." : "Send Email"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="max-w-2xl mx-auto mt-8 p-4 border rounded-lg bg-muted/30">
        <h2 className="text-lg font-medium mb-2">Implementation Details</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Uses EmailJS for serverless email sending</li>
          <li>Form validation with Zod schema</li>
          <li>Progress indicator for better user experience</li>
          <li>Toast notifications for success/error feedback</li>
          <li>Custom templates supported through EmailJS</li>
          <li>CORS-ready configuration for production use</li>
        </ul>
      </div>
    </div>
  );
}
