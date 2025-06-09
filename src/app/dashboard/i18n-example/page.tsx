"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/i18n/useTranslation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Locale, localeNames } from "@/i18n/config";
import { toast } from "sonner";

export default function I18nExamplePage() {
  const { t, locale, isLoaded } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Function to handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast.success(t("notifications.tabChanged"));
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("dashboard.overview")}</h1>
          <p className="text-muted-foreground">
            {t("dashboard.welcome")}, {t("app.description")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
            <span className="text-sm font-medium">{t("theme.currentLanguage")}:</span>
            <Badge variant="outline" className="font-medium">
              {localeNames[locale as Locale]}
            </Badge>
          </div>
          <LanguageSwitcher showLabel size="default" />
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="dashboard">{t("dashboard.overview")}</TabsTrigger>
          <TabsTrigger value="statistics">{t("dashboard.analytics")}</TabsTrigger>
          <TabsTrigger value="translations">{t("dashboard.translations")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("dashboard.totalUsers")}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,853</div>
                <p className="text-xs text-muted-foreground">
                  +18% {t("dashboard.fromLastMonth")}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("dashboard.activeUsers")}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,429</div>
                <p className="text-xs text-muted-foreground">
                  +5% {t("dashboard.fromLastWeek")}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("dashboard.languages")}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M5 3v16h16" />
                  <path d="m5 19 6-6" />
                  <path d="m2 6 3-3 3 3" />
                  <path d="M18 13v-3" />
                  <path d="M13 8v5" />
                  <path d="M18 8v10" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  +0% {t("dashboard.fromLastMonth")}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.analytics")}</CardTitle>
              <CardDescription>
                {t("dashboard.analyticsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="h-[200px] bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                {t("dashboard.chartPlaceholder")}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="translations">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.translations")}</CardTitle>
              <CardDescription>
                {t("dashboard.translationsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-medium">{t("dashboard.translationKeys")}</h3>
                  <ul className="space-y-2 border rounded-md p-4">
                    <li className="flex justify-between text-sm">
                      <span className="font-mono">app.name</span>
                      <Badge variant="outline">{t("app.name")}</Badge>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="font-mono">dashboard.welcome</span>
                      <Badge variant="outline">{t("dashboard.welcome")}</Badge>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="font-mono">auth.login</span>
                      <Badge variant="outline">{t("auth.login")}</Badge>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">{t("dashboard.availableLanguages")}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border rounded-md p-3 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                        EN
                      </div>
                      <span className="text-sm font-medium">English</span>
                    </div>
                    <div className="border rounded-md p-3 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-xs">
                        ES
                      </div>
                      <span className="text-sm font-medium">Español</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => toast.success(t("notifications.success"))}>
                {t("form.save")} {t("dashboard.translations")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
