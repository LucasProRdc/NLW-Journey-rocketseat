import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./importants-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { ActivitiesAndDateHeader } from "./activities-and-date-header";
import { Button } from "../../components/button";

export function TripDetail() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <ActivitiesAndDateHeader />
      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-zinc-100">Atividades</h1>
            <Button onClick={openCreateActivityModal} variant="primary">
              Cadastrar atividade <Plus className="size-5" />
            </Button>
          </div>
          <Activities />
        </div>
        <div className="w-80 space-y-6">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800"></div>
          <Guests />
        </div>
      </main>
      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  );
}
