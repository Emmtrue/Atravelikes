
"use client"

import * as React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Globe, MapPin } from "lucide-react"
import { getAutocompleteSuggestions } from "@/app/actions"
import type { Destination } from "@/lib/destinations"

interface AutocompleteInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string
  onChange: (value: string) => void
  onSelect?: (value: string) => void
}

const AutocompleteInput = React.forwardRef<HTMLInputElement, AutocompleteInputProps>(
  ({ value, onChange, onSelect, ...props }, ref) => {
    const [suggestions, setSuggestions] = useState<Destination[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const fetchSuggestions = useCallback(async (inputValue: string) => {
      if (inputValue.length < 1) {
        setSuggestions([])
        setShowSuggestions(false)
        return
      }
      setIsLoading(true)
      try {
        const result = await getAutocompleteSuggestions(inputValue)
        setSuggestions(result)
        setShowSuggestions(true)
      } catch (error) {
        console.error("Failed to fetch autocomplete suggestions", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false)
      }
    }, [])

    useEffect(() => {
      const debounceTimeout = setTimeout(() => {
        if (value) {
          fetchSuggestions(value)
        } else {
          setShowSuggestions(false)
        }
      }, 300) // Debounce requests by 300ms

      return () => clearTimeout(debounceTimeout)
    }, [value, fetchSuggestions])
    
    const handleSelect = (suggestion: Destination) => {
      onChange(suggestion.label)
      if (onSelect) {
        onSelect(suggestion.label)
      }
      setShowSuggestions(false)
    }

    const handleClickOutside = useCallback((event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setShowSuggestions(false);
      }
    }, []);

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [handleClickOutside]);
    
    return (
      <div className="relative w-full" ref={containerRef}>
        <Input
          {...props}
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            if (value) fetchSuggestions(value)
          }}
          autoComplete="off"
        />
        {showSuggestions && (
          <div className="absolute z-50 w-full mt-1 bg-card border rounded-md shadow-lg max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="p-2 space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : suggestions.length > 0 ? (
              <ul className="py-1">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="flex items-center px-3 py-2 cursor-pointer hover:bg-accent"
                    onMouseDown={(e) => { // use onMouseDown to avoid blur event firing first
                      e.preventDefault();
                      handleSelect(suggestion);
                    }}
                  >
                    {suggestion.type === 'city' ? <MapPin className="h-4 w-4 mr-2 text-muted-foreground" /> : <Globe className="h-4 w-4 mr-2 text-muted-foreground" />}
                    <span className="text-sm">{suggestion.label}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-3 text-sm text-muted-foreground">No results found.</p>
            )}
          </div>
        )}
      </div>
    )
  }
)
AutocompleteInput.displayName = "AutocompleteInput"

export { AutocompleteInput }
