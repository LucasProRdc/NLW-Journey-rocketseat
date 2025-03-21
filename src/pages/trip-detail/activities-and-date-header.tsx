import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function ActivitiesAndDateHeader() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip>();

  const displayDate = trip
    ? format(trip.starts_at, "d ' de 'LLL")
        .concat(" até ")
        .concat(format(trip.ends_at, "d ' de 'LLL"))
    : null;

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((reponse) => setTrip(reponse.data.trip));
  }, [tripId]);

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className=" text-zinc-100">{trip?.destination}</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className=" text-zinc-100">{displayDate}</span>
        </div>
        <Button variant="secondary">
          Alterar local/data <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}
