import KanbanBoard from "@/components/shared/KanbanBoard";
import PageHeader from "@/components/shared/PageHeader";

export default function ManagerKanban() {
  return (
    <div>
      <PageHeader title="Kanban Board" description="Drag and drop issues across workflow stages" />
      <KanbanBoard />
    </div>
  );
}
