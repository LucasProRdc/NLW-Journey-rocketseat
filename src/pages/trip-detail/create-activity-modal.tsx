import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useParams } from "react-router";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  function createActivity(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const occurs_at = data.get("occurs_at")?.toString();

    api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at,
    });

    closeCreateActivityModal();
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h2>Cadastrar atividade</h2>
            <button onClick={closeCreateActivityModal}>
              <X className="size-5 hover:scale-125 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades
          </p>
        </div>
        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 w-48 outline-none flex-1"
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center flex-1 gap-2">
            <Calendar className="text-zinc-400 size-5" />
            <input
              type="datetime-local"
              name="occurs_at"
              placeholder="Seu e-mail pessoal completo?"
              className="bg-transparent text-lg placeholder-zinc-400 w-48 outline-none flex-1"
            />
          </div>

          <Button variant="primary" size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  );
}
