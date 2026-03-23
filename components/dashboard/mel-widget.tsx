"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockMELData } from "@/lib/mocks/dashboard";
import { Bot, Send, Sparkles } from "lucide-react";
import { useState } from "react";

export function MELWidget() {
  const [message, setMessage] = useState("");
  const melData = mockMELData;

  return (
    <Card className="border-uniq-border shadow-sm overflow-hidden">
      <CardHeader className="border-b border-uniq-border px-6 py-4 flex items-center gap-3 bg-gradient-to-r from-uniq-primary/5 to-transparent">
        <div className="relative">
          <Avatar className="w-10 h-10 bg-uniq-accent">
            <AvatarFallback className="bg-uniq-accent text-white">
              <Bot className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold text-uniq-text flex items-center gap-2">
            MEL
            <Sparkles className="w-4 h-4 text-uniq-accent" />
          </CardTitle>
          <p className="text-xs text-uniq-muted">Consultor de Growth IA</p>
        </div>
        <Badge className="bg-green-100 text-green-700 border-green-200">
          Online
        </Badge>
      </CardHeader>

      {/* Messages */}
      <div className="p-4 bg-uniq-accent/5 space-y-4">
        {melData.messages.map((msg) => (
          <div key={msg.id} className="flex gap-3">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarFallback className="bg-uniq-accent text-white text-xs">
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 p-3 bg-white rounded-xl rounded-tl-none shadow-sm">
              <p className="text-sm text-uniq-text">{msg.text}</p>
              <p className="text-xs text-uniq-muted mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <CardContent className="p-4 space-y-2">
        {melData.quickActions.map((action) => (
          <Button
            key={action.id}
            variant="ghost"
            className="w-full justify-start text-left text-sm text-uniq-text bg-[#f9fafb] hover:bg-uniq-platinum hover:text-uniq-primary rounded-lg py-2.5 px-4 transition-colors"
          >
            {action.label}
          </Button>
        ))}
      </CardContent>

      {/* Input */}
      <div className="p-4 border-t border-uniq-border bg-white">
        <div className="relative">
          <input
            type="text"
            placeholder="Pergunte à MEL..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full pl-4 pr-12 py-3 rounded-lg border border-uniq-border bg-[#f9fafb] text-sm text-uniq-text placeholder-uniq-muted focus:outline-none focus:ring-2 focus:ring-uniq-accent focus:border-uniq-accent transition-all"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-uniq-primary text-white rounded-lg hover:bg-uniq-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
