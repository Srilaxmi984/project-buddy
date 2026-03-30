import KanbanBoard from "@/components/shared/KanbanBoard";
import PageHeader from "@/components/shared/PageHeader";
import { issues } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

export default function DeveloperKanban() {
  const { user } = useAuth();
  const myIssues = issues.filter(i => i.assignedTo === user?.id);

  return (
    <div>
      <PageHeader title="My Kanban Board" description="Track your issue workflow" />
      <KanbanBoard filteredIssues={myIssues} />
    </div>
  );
}
