
"use client"

import * as React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { PlaneTakeoff, Globe, MapPin } from "lucide-react"
import { getAutocompleteSuggestions } from "@/app/actions"

type Suggestion = {
  name: string
  type: 'city' | 'country'
}

interface AutocompleteInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string
  onChange: (value: string) => void
  onSelect?: (value: string) => void
}

const AutocompleteInput = React.forwardRef<HTMLInputElement, AutocompleteInputProps>(
  ({ value, onChange, onSelect, ...props }, ref) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const fetchSuggestions = useCallback(async (inputValue: string) => {
      if (inputValue.length < 2) {
        setSuggestions([])
        setShowSuggestions(false)
        return
      }
      setIsLoading(true)
      const result = await getAutocompleteSuggestions(inputValue)
      setSuggestions(result)
      setIsLoading(false)
      setShowSuggestions(true)
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

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setShowSuggestions(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelect = (suggestionName: string) => {
      onChange(suggestionName)
      if (onSelect) {
        onSelect(suggestionName)
      }
      setShowSuggestions(false)
    }
    
    return (
      <div className="relative w-full" ref={containerRef}>
        <Input
          {...props}
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true)
          }}
          autoComplete="off"
        />
        {showSuggestions && (
          <div className="absolute z-10 w-full mt-1 bg-card border rounded-md shadow-lg max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="p-2 space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : suggestions.length > 0 ? (
              <ul className="py-1">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.name}
                    className="flex items-center px-3 py-2 cursor-pointer hover:bg-accent"
                    onMouseDown={(e) => { // use onMouseDown to avoid blur event firing first
                      e.preventDefault();
                      handleSelect(suggestion.name);
                    }}
                  >
                    {suggestion.type === 'city' ? <MapPin className="h-4 w-4 mr-2 text-muted-foreground" /> : <Globe className="h-4 w-4 mr-2 text-muted-foreground" />}
                    <span className="text-sm">{suggestion.name}</span>
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
