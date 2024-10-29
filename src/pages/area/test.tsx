import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchDropdownProps {
  items: { id: number; name: string }[];
  placeholder?: string;
  onChange: (value: number) => void;
  defaultValue?: { id: number; name: string };
}

export const SearchTest: React.FC<SearchDropdownProps> = ({
  items,
  placeholder = "Select item...",
  onChange,
  defaultValue,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue ? defaultValue.name : "");

  React.useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue.name);
    }
  }, [defaultValue]);

  const handleSelect = (item: { id: number; name: string }) => {
    setValue(item.name);
    onChange(item.id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || "Select " + " " + placeholder + "..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            value={value}
            onValueChange={(value) => setValue(value)}
          />
          <CommandList>
            <CommandEmpty>No {placeholder} found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => handleSelect(item)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};