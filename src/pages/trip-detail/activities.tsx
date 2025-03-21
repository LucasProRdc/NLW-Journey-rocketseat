import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Category {
  date: string;
  activities: {
    title: string;
    occurs_at: string;
  }[];
}

export function Activities() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Category[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      .then((reponse) => setActivities(reponse.data.activities));
  }, [tripId]);

  return (
    <div className="space-y-8">
      {activities.map((category: Category) => {
        return (
          <div key={category.date} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-zinc-300 font-semibold">
                {format(category.date, "d")}
              </span>
              <span className="text-xs text-zinc-500">
                {format(category.date, "EEEE", { locale: ptBR })}
              </span>
            </div>
            {category.activities.length > 0 ? (
              category.activities.map((activity) => {
                return (
                  <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl flex items-center gap-3">
                      <CircleCheck className="size-5 text-lime-500" />
                      <span className="text-zinc-100">{activity.title}</span>
                      <span className="text-zinc-400b text-sm ml-auto">
                        {format(activity.occurs_at, "HH:mm")}h
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-zinc-500 text-sm">
                Nenhuma atividade cadastrada nessa data
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
