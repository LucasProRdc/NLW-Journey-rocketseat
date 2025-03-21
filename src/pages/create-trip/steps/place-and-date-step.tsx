import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";

interface PlaceAndDateStepProps {
  isGuestIputOpen: boolean;
  setIsGuestInputOpen: (value: boolean) => void;
  setDestination: (value: string) => void;
  dateSelected: DateRange | undefined;
  setDateSelected: (value: DateRange | undefined) => void;
}

export function PlaceAndDateStep({
  isGuestIputOpen,
  setIsGuestInputOpen,
  setDestination,
  dateSelected,
  setDateSelected,
}: PlaceAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const displayDate =
    dateSelected && dateSelected.from && dateSelected.to
      ? format(dateSelected.from, "d ' de 'LLL")
          .concat(" até ")
          .concat(format(dateSelected.to, "d ' de 'LLL"))
      : null;
  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-500" />
        <input
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none"
          disabled={isGuestIputOpen}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <button
        onClick={openDatePicker}
        disabled={isGuestIputOpen}
        className="flex items-center gap-2 w-[240px]"
      >
        <Calendar className="size-5 text-zinc-500" />
        <span className="text-lg text-zinc-400 w-48 text-left flex-1">
          {displayDate || "Quando?"}
        </span>
      </button>
      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className=" rounded-xl py-5 px-6 bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h2>Selecione a data</h2>
                <button onClick={closeDatePicker}>
                  <X className="size-5 hover:scale-125 text-zinc-400" />
                </button>
              </div>
            </div>
            <DayPicker
              animate
              mode="range"
              selected={dateSelected}
              onSelect={setDateSelected}
            />
          </div>
        </div>
      )}

      {isGuestIputOpen ? (
        <Button
          onClick={() => {
            setIsGuestInputOpen(false);
          }}
          variant="secondary"
        >
          Alterar local/data <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button
          onClick={() => {
            setIsGuestInputOpen(true);
          }}
          variant="primary"
        >
          Continuar <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
