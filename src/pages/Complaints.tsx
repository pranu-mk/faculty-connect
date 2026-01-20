import { useState } from "react";
import { Search, Eye, Edit, ChevronLeft, ChevronRight } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
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

const initialComplaints: Complaint[] = [
  { id: "CMP-1245", studentName: "Rahul Sharma", department: "Computer Science", type: "Lab Equipment", priority: "High", date: "2024-01-15", status: "Pending" },
  { id: "CMP-1244", studentName: "Priya Patel", department: "Electronics", type: "Hostel Facility", priority: "Medium", date: "2024-01-15", status: "In Progress" },
  { id: "CMP-1243", studentName: "Amit Kumar", department: "Mechanical", type: "Library Access", priority: "Low", date: "2024-01-14", status: "Resolved" },
  { id: "CMP-1242", studentName: "Sneha Gupta", department: "Civil", type: "Faculty Issue", priority: "High", date: "2024-01-14", status: "Pending" },
  { id: "CMP-1241", studentName: "Vikram Singh", department: "Computer Science", type: "Exam Related", priority: "Medium", date: "2024-01-13", status: "Rejected" },
  { id: "CMP-1240", studentName: "Ananya Roy", department: "IT", type: "Infrastructure", priority: "Low", date: "2024-01-13", status: "In Progress" },
  { id: "CMP-1239", studentName: "Karthik Nair", department: "Electronics", type: "Lab Equipment", priority: "High", date: "2024-01-12", status: "Pending" },
  { id: "CMP-1238", studentName: "Meera Joshi", department: "Computer Science", type: "Hostel Facility", priority: "Medium", date: "2024-01-12", status: "Resolved" },
];

const priorityColors = {
  Low: { bg: "#052E16", text: "#22C55E", border: "#16A34A" },
  Medium: { bg: "#3B2F0B", text: "#F59E0B", border: "#D97706" },
  High: { bg: "#3F0D0D", text: "#EF4444", border: "#DC2626" },
};

const statusColors = {
  Pending: { bg: "#3B2F0B", text: "#F59E0B", border: "#D97706" },
  "In Progress": { bg: "#0C4A6E", text: "#0EA5E9", border: "#0284C7" },
  Resolved: { bg: "#052E16", text: "#22C55E", border: "#16A34A" },
  Rejected: { bg: "#3F0D0D", text: "#EF4444", border: "#DC2626" },
};

const ITEMS_PER_PAGE = 5;

const Complaints = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [editingComplaint, setEditingComplaint] = useState<Complaint | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch = 
      complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalPages = Math.ceil(filteredComplaints.length / ITEMS_PER_PAGE);
  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEditSave = () => {
    if (editingComplaint) {
      setComplaints(prev => 
        prev.map(c => c.id === editingComplaint.id ? editingComplaint : c)
      );
      toast({
        title: "Complaint Updated",
        description: `Complaint ${editingComplaint.id} has been updated successfully.`,
      });
      setEditingComplaint(null);
    }
  };

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Assigned Complaints</h1>
          <p className="text-gray-500 mt-1">Manage and resolve student complaints</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by ID, student name, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-gray-50 border-gray-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px] bg-gray-50 border-gray-200">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
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
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Complaint ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Student Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedComplaints.map((complaint, index) => (
                <tr 
                  key={complaint.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 font-mono text-blue-600">{complaint.id}</td>
                  <td className="px-4 py-4 font-medium text-gray-800">{complaint.studentName}</td>
                  <td className="px-4 py-4 text-gray-600">{complaint.department}</td>
                  <td className="px-4 py-4 text-gray-800">{complaint.type}</td>
                  <td className="px-4 py-4">
                    <Badge 
                      variant="outline" 
                      style={{
                        backgroundColor: priorityColors[complaint.priority].bg,
                        color: priorityColors[complaint.priority].text,
                        borderColor: priorityColors[complaint.priority].border,
                      }}
                    >
                      {complaint.priority}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{complaint.date}</td>
                  <td className="px-4 py-4">
                    <Badge 
                      variant="outline" 
                      style={{
                        backgroundColor: statusColors[complaint.status].bg,
                        color: statusColors[complaint.status].text,
                        borderColor: statusColors[complaint.status].border,
                      }}
                    >
                      {complaint.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-blue-100 text-blue-600"
                        onClick={() => setSelectedComplaint(complaint)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-purple-100 text-purple-600"
                        onClick={() => setEditingComplaint(complaint)}
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
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredComplaints.length)} of {filteredComplaints.length} complaints
          </p>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 p-0 border-gray-200"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button 
                key={page}
                variant="ghost" 
                size="sm" 
                className={`h-8 w-8 p-0 ${currentPage === page ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-600"}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 p-0 border-gray-200"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
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

      {/* Edit Modal */}
      <Dialog open={!!editingComplaint} onOpenChange={() => setEditingComplaint(null)}>
        <DialogContent className="bg-white border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-gray-800">Edit Complaint {editingComplaint?.id}</DialogTitle>
          </DialogHeader>
          {editingComplaint && (
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm text-gray-500 mb-2 block">Status</label>
                <Select 
                  value={editingComplaint.status} 
                  onValueChange={(value: Complaint["status"]) => 
                    setEditingComplaint({...editingComplaint, status: value})
                  }
                >
                  <SelectTrigger className="bg-gray-50 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-2 block">Priority</label>
                <Select 
                  value={editingComplaint.priority} 
                  onValueChange={(value: Complaint["priority"]) => 
                    setEditingComplaint({...editingComplaint, priority: value})
                  }
                >
                  <SelectTrigger className="bg-gray-50 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-200"
                  onClick={() => setEditingComplaint(null)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={handleEditSave}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Complaints;
