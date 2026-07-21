"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  className?: string;
}

export default function CustomDropdown({
  value,
  onChange,
  options,
  placeholder = "Pilih...",
  className = "",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#2654A4]/20 bg-white px-4 py-2.5 text-sm text-[#041020] transition hover:border-[#2654A4]/40 focus:border-[#FDB715] focus:outline-none focus:ring-2 focus:ring-[#FDB715]/50"
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-[#041020]/40 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 min-w-[240px] origin-top-right rounded-xl border border-[#2654A4]/10 bg-white py-1.5 shadow-lg animate-in fade-in zoom-in-95 duration-100 right-0 sm:right-auto sm:left-0 max-h-64 overflow-y-auto custom-scrollbar">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-between px-4 py-2 text-left text-sm transition hover:bg-[#FDFBF7] focus:bg-[#FDFBF7] focus:outline-none"
            >
              <span className={`truncate ${value === option.value ? "font-bold text-[#2654A4]" : "text-[#041020]"}`}>
                {option.label}
              </span>
              {value === option.value && (
                <Check size={16} className="text-[#2654A4] shrink-0 ml-3" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
