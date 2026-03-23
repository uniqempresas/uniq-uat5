"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockActivities } from "@/lib/mocks/dashboard";
import {
  DollarSign,
  User,
  Package,
  AlertTriangle,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const activityConfig = {
  sale: {
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  customer: {
    icon: User,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  product: {
    icon: Package,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  alert: {
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  message: {
    icon: MessageCircle,
    color: "text-uniq-accent",
    bgColor: "bg-uniq-accent/20",
  },
};

type ActivityType = keyof typeof activityConfig;

interface Activity {
  id: number;
  type: ActivityType;
  message: string;
  time: string;
}

export function ActivitiesList() {
  const activities: Activity[] = mockActivities;

  return (
    <Card className="border-uniq-border shadow-sm">
      <CardHeader className="border-b border-uniq-border px-6 py-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-uniq-text">
          Atividades Recentes
        </CardTitle>
        <Link
          href="/atividades"
          className="text-sm text-uniq-primary hover:text-uniq-hover font-medium flex items-center gap-1"
        >
          Ver todas
          <ArrowRight className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px]">
          <div className="divide-y divide-uniq-border">
            {activities.map((activity) => {
              const config = activityConfig[activity.type];
              const Icon = config.icon;

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-4 hover:bg-[#f9fafb] transition-colors"
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      config.bgColor
                    )}
                  >
                    <Icon className={cn("w-5 h-5", config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-uniq-text">
                      {activity.message}
                    </p>
                    <p className="text-xs text-uniq-muted mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
