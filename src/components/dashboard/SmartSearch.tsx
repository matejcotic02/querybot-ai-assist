import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, User, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface SearchResult {
  type: "ticket" | "user" | "chat";
  id: string;
  title: string;
  subtitle?: string;
  icon: typeof FileText;
}

export const SmartSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchData = async () => {
      const searchResults: SearchResult[] = [];

      // Search tickets
      const { data: tickets } = await supabase
        .from("tickets")
        .select("id, title, status")
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(5);

      if (tickets) {
        searchResults.push(
          ...tickets.map((ticket) => ({
            type: "ticket" as const,
            id: ticket.id,
            title: ticket.title,
            subtitle: `Status: ${ticket.status}`,
            icon: FileText,
          }))
        );
      }

      // Search users/profiles
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, company_name")
        .or(`full_name.ilike.%${query}%,company_name.ilike.%${query}%`)
        .limit(5);

      if (profiles) {
        searchResults.push(
          ...profiles.map((profile) => ({
            type: "user" as const,
            id: profile.id,
            title: profile.full_name,
            subtitle: profile.company_name || undefined,
            icon: User,
          }))
        );
      }

      // Search chat messages
      const { data: chats } = await supabase
        .from("chat_messages")
        .select("id, message_text, ticket_id")
        .ilike("message_text", `%${query}%`)
        .limit(5);

      if (chats) {
        searchResults.push(
          ...chats.map((chat) => ({
            type: "chat" as const,
            id: chat.id,
            title: chat.message_text.substring(0, 60) + (chat.message_text.length > 60 ? "..." : ""),
            subtitle: `Ticket: ${chat.ticket_id.substring(0, 8)}`,
            icon: MessageSquare,
          }))
        );
      }

      setResults(searchResults);
      setIsOpen(searchResults.length > 0);
    };

    const debounce = setTimeout(searchData, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    setQuery("");
    setIsOpen(false);

    switch (result.type) {
      case "ticket":
        navigate(`/tickets/${result.id}`);
        break;
      case "user":
        navigate(`/users/${result.id}`);
        break;
      case "chat":
        navigate(`/chats/${result.id}`);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[480px]">
      <div
        className={cn(
          "relative flex items-center gap-3 h-11 px-4 bg-card border rounded-xl transition-all duration-300",
          isFocused
            ? "border-primary/60 shadow-[0_0_12px_rgba(163,123,255,0.2)]"
            : "border-border shadow-sm"
        )}
      >
        <Search className="h-4 w-4 text-primary flex-shrink-0" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search tickets, customers, or AI conversations…"
          className="border-0 bg-transparent h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-xl shadow-lg max-h-[300px] overflow-y-auto z-50">
          {results.map((result) => {
            const Icon = result.icon;
            return (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => handleResultClick(result)}
                className="w-full flex items-start gap-3 p-3 hover:bg-primary/8 transition-all duration-200 hover:scale-[1.01] text-left"
              >
                <Icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {result.title}
                  </div>
                  {result.subtitle && (
                    <div className="text-xs text-muted-foreground truncate">
                      {result.subtitle}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
