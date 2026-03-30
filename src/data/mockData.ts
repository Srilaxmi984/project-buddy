export interface Project {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "SUBMITTED" | "ASSIGNED" | "IN_PROGRESS" | "TESTING" | "DONE";
  reporterId: string;
  reporterName: string;
  assignedTo?: string;
  assignedToName?: string;
  projectId: string;
  projectName: string;
  stepsToReproduce?: string;
  impact?: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Feedback {
  id: string;
  issueId: string;
  issueTitle: string;
  reporterId: string;
  reporterName: string;
  rating: number;
  comment: string;
  satisfaction: "SATISFIED" | "NEUTRAL" | "NOT_SATISFIED";
  createdAt: string;
  assignedToName?: string;
}

export const projects: Project[] = [
  { id: "p1", name: "E-Commerce Platform", description: "Main shopping platform for customers", createdBy: "2", createdAt: "2024-01-20" },
  { id: "p2", name: "Internal CRM", description: "Customer relationship management tool", createdBy: "2", createdAt: "2024-02-01" },
  { id: "p3", name: "Mobile App", description: "iOS and Android mobile application", createdBy: "2", createdAt: "2024-02-15" },
];

export const issues: Issue[] = [
  { id: "i1", title: "Login page crashes on Safari", description: "Users on Safari browser cannot log in. The page throws a white screen error.", category: "Bug", priority: "CRITICAL", status: "IN_PROGRESS", reporterId: "1", reporterName: "John Reporter", assignedTo: "3", assignedToName: "Mike Developer", projectId: "p1", projectName: "E-Commerce Platform", stepsToReproduce: "1. Open Safari\n2. Navigate to login\n3. Enter credentials\n4. Click login", impact: "Affects ~20% of users", createdAt: "2024-03-01", updatedAt: "2024-03-05" },
  { id: "i2", title: "Payment gateway timeout", description: "Payments take more than 30 seconds to process during peak hours.", category: "Performance", priority: "HIGH", status: "ASSIGNED", reporterId: "1", reporterName: "John Reporter", assignedTo: "4", assignedToName: "Alex Chen", projectId: "p1", projectName: "E-Commerce Platform", impact: "Revenue loss during peak hours", createdAt: "2024-03-02", updatedAt: "2024-03-03" },
  { id: "i3", title: "Dashboard data not refreshing", description: "CRM dashboard shows stale data. Requires manual page refresh.", category: "Bug", priority: "MEDIUM", status: "TESTING", reporterId: "1", reporterName: "John Reporter", assignedTo: "3", assignedToName: "Mike Developer", projectId: "p2", projectName: "Internal CRM", createdAt: "2024-03-03", updatedAt: "2024-03-06" },
  { id: "i4", title: "Add dark mode support", description: "Users have requested dark mode for the mobile app.", category: "Feature", priority: "LOW", status: "SUBMITTED", reporterId: "1", reporterName: "John Reporter", projectId: "p3", projectName: "Mobile App", createdAt: "2024-03-05", updatedAt: "2024-03-05" },
  { id: "i5", title: "Search filters not working", description: "Product search filters return incorrect results when multiple filters are applied.", category: "Bug", priority: "HIGH", status: "DONE", reporterId: "1", reporterName: "John Reporter", assignedTo: "4", assignedToName: "Alex Chen", projectId: "p1", projectName: "E-Commerce Platform", stepsToReproduce: "1. Go to product list\n2. Apply price filter\n3. Apply category filter\n4. Results are wrong", createdAt: "2024-02-20", updatedAt: "2024-03-04" },
  { id: "i6", title: "Email notifications delayed", description: "Order confirmation emails are delayed by 15+ minutes.", category: "Performance", priority: "MEDIUM", status: "IN_PROGRESS", reporterId: "1", reporterName: "John Reporter", assignedTo: "3", assignedToName: "Mike Developer", projectId: "p1", projectName: "E-Commerce Platform", createdAt: "2024-03-04", updatedAt: "2024-03-07" },
  { id: "i7", title: "Mobile app crash on upload", description: "App crashes when uploading images larger than 5MB.", category: "Bug", priority: "HIGH", status: "ASSIGNED", reporterId: "1", reporterName: "John Reporter", assignedTo: "3", assignedToName: "Mike Developer", projectId: "p3", projectName: "Mobile App", createdAt: "2024-03-06", updatedAt: "2024-03-06" },
  { id: "i8", title: "CRM export to CSV broken", description: "Export function generates corrupted CSV files.", category: "Bug", priority: "MEDIUM", status: "DONE", reporterId: "1", reporterName: "John Reporter", assignedTo: "4", assignedToName: "Alex Chen", projectId: "p2", projectName: "Internal CRM", createdAt: "2024-02-25", updatedAt: "2024-03-02" },
];

export const feedbacks: Feedback[] = [
  { id: "f1", issueId: "i5", issueTitle: "Search filters not working", reporterId: "1", reporterName: "John Reporter", rating: 4, comment: "Fixed well, but took a bit long.", satisfaction: "SATISFIED", createdAt: "2024-03-05", assignedToName: "Alex Chen" },
  { id: "f2", issueId: "i8", issueTitle: "CRM export to CSV broken", reporterId: "1", reporterName: "John Reporter", rating: 5, comment: "Quick fix, works perfectly now!", satisfaction: "SATISFIED", createdAt: "2024-03-03", assignedToName: "Alex Chen" },
];

export const CATEGORIES = ["Bug", "Feature", "Performance", "Security", "UI/UX"];
export const PRIORITIES: Issue["priority"][] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
export const STATUSES: Issue["status"][] = ["SUBMITTED", "ASSIGNED", "IN_PROGRESS", "TESTING", "DONE"];
export const KANBAN_COLUMNS = ["SUBMITTED", "ASSIGNED", "IN_PROGRESS", "TESTING", "DONE"] as const;
