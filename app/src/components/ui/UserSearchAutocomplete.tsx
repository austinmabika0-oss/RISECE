"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { IconSearch, IconLoader2, IconUserPlus } from "@tabler/icons-react";

interface Profile {
  id: string;
  full_name: string;
  roll_number: string;
  college_name: string;
}

interface UserSearchAutocompleteProps {
  onSelect: (user: Profile) => void;
  excludeIds: string[];
}

export function UserSearchAutocomplete({ onSelect, excludeIds }: UserSearchAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Profile[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchUsers = async () => {
      if (query.length < 3) {
        setResults([]);
        setIsOpen(false);
        return;
      }
      
      setLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, roll_number, college_name')
        .or(`full_name.ilike.%${query}%,roll_number.ilike.%${query}%,phone_number.ilike.%${query}%`)
        .limit(5);
        
      if (data) {
        // Filter out people already in the team
        const filtered = data.filter(p => !excludeIds.includes(p.id));
        setResults(filtered);
        setIsOpen(true);
      }
      
      setLoading(false);
    };

    const debounce = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounce);
  }, [query, excludeIds]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {loading ? <IconLoader2 size={16} className="animate-spin text-primary" /> : <IconSearch size={16} className="text-muted-foreground" />}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, roll number, or phone..."
          className="w-full pl-10 pr-4 py-3 min-h-[44px] bg-background border border-border focus:border-primary outline-none transition-colors font-mono text-sm"
        />
      </div>

      {isOpen && query.length >= 3 && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border shadow-xl max-h-[50vh] overflow-y-auto">
          {results.length > 0 ? (
            <ul className="py-1">
              {results.map((user) => (
                <li
                  key={user.id}
                  onClick={() => {
                    onSelect(user);
                    setQuery("");
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 hover:bg-secondary cursor-pointer border-b border-border/50 last:border-0 transition-colors flex justify-between items-center group"
                >
                  <div>
                    <div className="font-bold text-sm text-foreground">{user.full_name}</div>
                    <div className="text-xs font-mono text-muted-foreground uppercase">{user.roll_number} • {user.college_name}</div>
                  </div>
                  <IconUserPlus size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-sm text-muted-foreground font-mono text-center">
              No matching operatives found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
