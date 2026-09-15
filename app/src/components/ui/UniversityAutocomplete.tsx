"use client";

import { useState, useEffect, useRef } from "react";
import { universities, University } from "@/data/universities";

interface UniversityAutocompleteProps {
  onSelect: (university: University) => void;
  selectedName: string;
}

export function UniversityAutocomplete({ onSelect, selectedName }: UniversityAutocompleteProps) {
  const [query, setQuery] = useState(selectedName);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<University[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only update internal query if selectedName changes externally (e.g. form reset)
    if (selectedName === "") {
      setQuery("");
    }
  }, [selectedName]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Clear selection in parent if user starts typing again
    onSelect({ id: "", name: "" });

    if (value.trim().length > 0) {
      const filtered = universities
        .filter(u => u.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10);
      setSuggestions(filtered);
      setIsOpen(true);
      setActiveIndex(-1);
    } else {
      setIsOpen(false);
      setSuggestions([]);
    }
  };

  const handleSelect = (university: University) => {
    setQuery(university.name);
    setIsOpen(false);
    onSelect(university);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelect(suggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // If user blurs and the query doesn't match a selected university perfectly, we could optionally clear it,
  // but we enforce validation at the form level by requiring a non-empty college_id.
  
  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => { if (query.length > 0) setIsOpen(true); }}
        className="w-full min-h-[44px] p-3 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans"
        placeholder="Search for University/Institution..."
        required
      />

      {isOpen && query.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border shadow-xl max-h-[50vh] overflow-y-auto">
          {suggestions.length > 0 ? (
            <ul className="py-1">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSelect(suggestion)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`px-4 py-3 cursor-pointer font-sans text-sm transition-colors ${
                    index === activeIndex ? "bg-primary/20 text-primary" : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-sm text-muted-foreground font-sans">
              No university found. Please ensure it is an approved institution.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
