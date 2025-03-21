import { AtSign, Plus, X } from "lucide-react";

interface InviteGuestModalProps {
  closeModal: () => void;
  emailToInvite: string[];
  removeEmail: (email: string) => void;
  handleInviteEmail: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function InviteGuestModal({
  closeModal,
  emailToInvite,
  removeEmail,
  handleInviteEmail,
}: InviteGuestModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h2>Selecionar convidados</h2>
            <button onClick={closeModal}>
              <X className="size-5 hover:scale-125 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {emailToInvite.map((email: string) => {
            return (
              <div
                key={email}
                className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
              >
                <span className="text-zinc-300">{email}</span>
                <button
                  onClick={() => removeEmail(email)}
                  type="button"
                  className=""
                >
                  <X className="size-4 text-zinc-400" />
                </button>
              </div>
            );
          })}
        </div>
        <div className="w-full h-px bg-zinc-800"></div>
        <form
          onSubmit={handleInviteEmail}
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <AtSign className="text-zinc-400 size-5" />
          <input
            type="email"
            name="email"
            placeholder="Digite o e-mail do convidado?"
            className="bg-transparent text-lg placeholder-zinc-400 w-48 outline-none flex-1"
          />
          <button
            type="submit"
            className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
          >
            Convidar <Plus className="size-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
