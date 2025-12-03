"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ToolSearchBarProps {
  currentSearch: string;
  placeholder?: string;
}

export function ToolSearchBar({
  currentSearch,
  placeholder = "Search tools by name or description...",
}: ToolSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(currentSearch);

  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleClear = () => {
    setSearchValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mb-6">
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-20 h-12 text-base"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {searchValue && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
          <Button onClick={handleSearch} size="sm" className="h-8">
            Search
          </Button>
        </div>
      </div>

      {currentSearch && (
        <div className="mt-2 text-sm text-gray-600">
          Showing results for: <span className="font-medium">&quot;{currentSearch}&quot;</span>
        </div>
      )}
    </div>
  );
}
