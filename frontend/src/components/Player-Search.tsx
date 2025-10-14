"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { dummyCricketPlayers } from "../lib/dummycricketdata";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";

interface PlayerSearchProps {
  onPlayerSelect: (playerId: string, playerName: string) => void;
  selectedPlayerId?: string;
}

export function PlayerSearch({ onPlayerSelect, selectedPlayerId }: PlayerSearchProps) {
  const [open, setOpen] = useState(false);

  const selectedPlayer = dummyCricketPlayers.find(
    (player) => player.id === selectedPlayerId
  );

  const handleSelect = (playerId: string) => {
    const player = dummyCricketPlayers.find((p) => p.id === playerId);
    if (player) {
      onPlayerSelect(player.id, player.name);
      setOpen(false);
    }
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
          {selectedPlayer ? selectedPlayer.name : "Select player..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search player..." />
          <CommandList>
            <CommandEmpty>No player found.</CommandEmpty>
            <CommandGroup>
              {dummyCricketPlayers.map((player) => (
                <CommandItem
                  key={player.id}
                  value={player.name}
                  onSelect={() => handleSelect(player.id)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedPlayerId === player.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{player.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {player.country} • {player.role}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}