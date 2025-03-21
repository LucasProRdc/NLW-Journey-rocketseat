import { ArrowRight, UserRoundPlusIcon } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestStepProps {
  openModal: () => void;
  openConfirmTripModal: () => void;
  emailToInvite: string[];
}

export function InviteGuestStep({
  openModal,
  openConfirmTripModal,
  emailToInvite,
}: InviteGuestStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3">
      <button
        type="button"
        onClick={openModal}
        className="flex items-center gap-2 flex-1 text-left"
      >
        <UserRoundPlusIcon className="size-5 text-zinc-500" />
        {emailToInvite.length > 0 ? (
          <span className="text-zinc-400 text-lg">
            {emailToInvite.length + " pessoa(s) convidada(s)"}
          </span>
        ) : (
          <span className="text-zinc-400 text-lg">Quem estará na viagem?</span>
        )}
      </button>
      <Button onClick={openConfirmTripModal} variant="primary">
        Confirmar viagem <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
