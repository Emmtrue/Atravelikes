
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, X } from 'lucide-react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('Hello! How can we help you today?');

  useEffect(() => {
    // Listen for real-time updates to the welcome message from Firestore.
    const unsub = onSnapshot(doc(db, "config", "live-chat"), (doc) => {
        if (doc.exists()) {
            setWelcomeMessage(doc.data().welcomeMessage || 'Hello! How can we help you today?');
        }
    });
    return () => unsub();
  }, []);

  return (
    <div>
      <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
        <Button
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-8 w-8" />
          <span className="sr-only">Open Live Chat</span>
        </Button>
      </div>

      {isOpen && (
        <Card className="fixed bottom-4 right-4 z-50 w-80 h-[450px] shadow-2xl flex flex-col transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-5">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
            <CardTitle className="text-lg">Live Chat</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-hidden">
             <ScrollArea className="h-full">
                <div className="space-y-4">
                     <div className="flex items-start gap-3">
                        <div className="bg-muted p-3 rounded-lg rounded-bl-none max-w-xs">
                            <p className="text-sm">{welcomeMessage}</p>
                        </div>
                    </div>
                    {/* Add more messages here */}
                </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <div className="flex w-full items-center space-x-2">
                <Input placeholder="Type your message..." />
                <Button>Send</Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
