import { Mail, User, X } from "lucide-react";
import { Button } from "../../components/button";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: React.FormEvent<HTMLFormElement>) => void;
  setOwnerName: (value: string) => void;
  setOwnerEmail: (value: string) => void;
}
export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h2>Confirmar criação de viagem</h2>
            <button onClick={closeConfirmTripModal}>
              <X className="size-5 hover:scale-125 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluír a viagem para{" "}
            <span className="font-semibold text-zinc-100">
              florianópolis, Brasil
            </span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">
              16 a 27 de agosto de 2024
            </span>{" "}
            preencha seus dados abaixo
          </p>
        </div>
        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              name="name"
              placeholder="Digite o seu nome completo?"
              className="bg-transparent text-lg placeholder-zinc-400 w-48 outline-none flex-1"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal completo?"
              className="bg-transparent text-lg placeholder-zinc-400 w-48 outline-none flex-1"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
}
