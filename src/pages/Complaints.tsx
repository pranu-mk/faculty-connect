import { useState } from "react";
import { Search, Filter, Eye, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ComplaintDetailModal from "@/components/modals/ComplaintDetailModal";

interface Complaint {
  id: string;
  studentName: string;
  department: string;
  type: string;
  priority: "Low" | "Medium" | "High";
  date: string;
  status: "Pending" | "In Progress" | "Resolved" | "Rejected";
}

const complaints: Complaint[] = [
  { id: "CMP-1245", studentName: "Rahul Sharma", department: "Computer Science", type: "Lab Equipment", priority: "High", date: "2024-01-15", status: "Pending" },
  { id: "CMP-1244", studentName: "Priya Patel", department: "Electronics", type: "Hostel Facility", priority: "Medium", date: "2024-01-15", status: "In Progress" },
  { id: "CMP-1243", studentName: "Amit Kumar", department: "Mechanical", type: "Library Access", priority: "Low", date: "2024-01-14", status: "Resolved" },
  { id: "CMP-1242", studentName: "Sneha Gupta", department: "Civil", type: "Faculty Issue", priority: "High", date: "2024-01-14", status: "Pending" },
  { id: "CMP-1241", studentName: "Vikram Singh", department: "Computer Science", type: "Exam Related", priority: "Medium", date: "2024-01-13", status: "Rejected" },
  { id: "CMP-1240", studentName: "Ananya Roy", department: "IT", type: "Infrastructure", priority: "Low", date: "2024-01-13", status: "In Progress" },
  { id: "CMP-1239", studentName: "Karthik Nair", department: "Electronics", type: "Lab Equipment", priority: "High", date: "2024-01-12", status: "Pending" },
  { id: "CMP-1238", studentName: "Meera Joshi", department: "Computer Science", type: "Hostel Facility", priority: "Medium", date: "2024-01-12", status: "Resolved" },
];

const priorityStyles = {
  Low: "badge-priority-low",
  Medium: "badge-priority-medium",
  High: "badge-priority-high",
};

const statusStyles = {
  Pending: "badge-status-pending",
  "In Progress": "badge-status-progress",
  Resolved: "badge-status-resolved",
  Rejected: "badge-status-rejected",
};

const Complaints = () => {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch = 
      complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Assigned Complaints</h1>
          <p className="text-muted-foreground mt-1">Manage and resolve student complaints</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, student name, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-secondary/50 border-border/50"
            />
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-secondary/50 border-border/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="glass-card border-border/50">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px] bg-secondary/50 border-border/50">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="glass-card border-border/50">
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Student Name</th>
                <th>Department</th>
                <th>Type</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint, index) => (
                <tr 
                  key={complaint.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="font-mono text-primary">{complaint.id}</td>
                  <td className="font-medium">{complaint.studentName}</td>
                  <td className="text-muted-foreground">{complaint.department}</td>
                  <td>{complaint.type}</td>
                  <td>
                    <Badge variant="outline" className={priorityStyles[complaint.priority]}>
                      {complaint.priority}
                    </Badge>
                  </td>
                  <td className="text-muted-foreground">{complaint.date}</td>
                  <td>
                    <Badge variant="outline" className={statusStyles[complaint.status]}>
                      {complaint.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-primary/20"
                        onClick={() => setSelectedComplaint(complaint)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-primary/20"
                        onClick={() => setSelectedComplaint(complaint)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            Showing {filteredComplaints.length} of {complaints.length} complaints
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-primary/20 text-primary">
              1
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <ComplaintDetailModal
        complaint={selectedComplaint}
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
      />
    </div>
  );
};

export default Complaints;
