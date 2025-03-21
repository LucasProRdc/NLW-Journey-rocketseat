import { useNavigate } from "react-router";
import { useState } from "react";
import { InviteGuestModal } from "./invite-guest-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { PlaceAndDateStep } from "./steps/place-and-date-step";
import { InviteGuestStep } from "./steps/invite-guest-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTrip() {
  const navigate = useNavigate();
  const [isGuestIputOpen, setIsGuestInputOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailToInvite, setEmailToInvite] = useState([
    "Teste@gmail.com",
    "Maria.White@email.com",
  ]);

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [dateSelected, setDateSelected] = useState<DateRange | undefined>();

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function handleInviteEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) return;

    if (emailToInvite.includes(email)) {
      return;
    }
    setEmailToInvite([...emailToInvite, email]);

    event.currentTarget.reset();
  }

  const removeEmail = (email: string) => {
    setEmailToInvite(
      emailToInvite.filter((emailToInvite) => emailToInvite !== email)
    );
  };

  async function createTrip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (emailToInvite.length === 0) return;
    if (!destination || !dateSelected) return;
    if (!ownerName || !ownerEmail) return;

    const response = await api.post("/trips", {
      destination: destination,
      starts_at: dateSelected?.from,
      ends_at: dateSelected?.to,
      emails_to_invite: emailToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    const { tripId } = response.data;

    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <h1 className="text-zinc-300 text-3xl">Plann.er</h1>
        <p className="text-zinc-300 text-lg ">
          Convide seus amigos e planeje sua próxima viagem
        </p>
        <div className="space-y-4">
          <PlaceAndDateStep
            isGuestIputOpen={isGuestIputOpen}
            setIsGuestInputOpen={setIsGuestInputOpen}
            setDestination={setDestination}
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
          />
          {isGuestIputOpen && (
            <InviteGuestStep
              emailToInvite={emailToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openModal={openModal}
            />
          )}
        </div>

        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela Planner você automaticamente concorda{" "}
          <br /> com nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade
          </a>
        </p>
      </div>
      {isModalOpen && (
        <InviteGuestModal
          closeModal={closeModal}
          emailToInvite={emailToInvite}
          handleInviteEmail={handleInviteEmail}
          removeEmail={removeEmail}
        />
      )}
      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}
    </div>
  );
}
