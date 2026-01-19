import { useState } from "react";
import { Search, Eye, History, ChevronLeft, ChevronRight, Filter } from "lucide-react";
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

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  course: string;
  year: string;
  semester: number;
  email: string;
  department: string;
  totalComplaints: number;
}

const students: Student[] = [
  { id: "STU-001", name: "Rahul Sharma", rollNumber: "CS21001", course: "B.Tech", year: "3rd Year", semester: 6, email: "rahul.sharma@college.edu", department: "Computer Science", totalComplaints: 3 },
  { id: "STU-002", name: "Priya Patel", rollNumber: "EC21015", course: "B.Tech", year: "3rd Year", semester: 6, email: "priya.patel@college.edu", department: "Electronics", totalComplaints: 1 },
  { id: "STU-003", name: "Amit Kumar", rollNumber: "ME21022", course: "B.Tech", year: "3rd Year", semester: 6, email: "amit.kumar@college.edu", department: "Mechanical", totalComplaints: 2 },
  { id: "STU-004", name: "Sneha Gupta", rollNumber: "CE21008", course: "B.Tech", year: "3rd Year", semester: 6, email: "sneha.gupta@college.edu", department: "Civil", totalComplaints: 0 },
  { id: "STU-005", name: "Vikram Singh", rollNumber: "CS21034", course: "B.Tech", year: "3rd Year", semester: 6, email: "vikram.singh@college.edu", department: "Computer Science", totalComplaints: 4 },
  { id: "STU-006", name: "Ananya Roy", rollNumber: "IT21019", course: "B.Tech", year: "3rd Year", semester: 6, email: "ananya.roy@college.edu", department: "IT", totalComplaints: 1 },
  { id: "STU-007", name: "Karthik Nair", rollNumber: "EC21028", course: "B.Tech", year: "3rd Year", semester: 6, email: "karthik.nair@college.edu", department: "Electronics", totalComplaints: 2 },
  { id: "STU-008", name: "Meera Joshi", rollNumber: "CS21042", course: "B.Tech", year: "3rd Year", semester: 6, email: "meera.joshi@college.edu", department: "Computer Science", totalComplaints: 0 },
];

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const departments = [...new Set(students.map(s => s.department))];

  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter === "all" || student.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Student Directory</h1>
        <p className="text-muted-foreground mt-1">Department-wise student list and complaint history</p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, roll number, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-secondary/50 border-border/50"
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[200px] bg-secondary/50 border-border/50">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent className="glass-card border-border/50">
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Course</th>
                <th>Year / Semester</th>
                <th>Department</th>
                <th>Email</th>
                <th>Complaints</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr 
                  key={student.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="font-mono text-primary">{student.id}</td>
                  <td className="font-medium">{student.name}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.course}</td>
                  <td>{student.year} / Sem {student.semester}</td>
                  <td>
                    <Badge variant="outline" className="bg-secondary/50 border-border/50">
                      {student.department}
                    </Badge>
                  </td>
                  <td className="text-muted-foreground">{student.email}</td>
                  <td>
                    <Badge variant="outline" className={student.totalComplaints > 2 ? "badge-priority-high" : "bg-muted/50 text-muted-foreground border-muted"}>
                      {student.totalComplaints}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-primary/20"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-info/20"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <History className="w-4 h-4" />
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
            Showing {filteredStudents.length} of {students.length} students
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-primary/20 text-primary">
              1
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="glass-card border-border/50 modal-enter">
          <DialogHeader>
            <DialogTitle className="text-foreground">Student Profile</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                  {selectedStudent.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{selectedStudent.name}</h3>
                  <p className="text-muted-foreground">{selectedStudent.rollNumber}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p className="text-sm font-medium text-foreground">{selectedStudent.department}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground">Course</p>
                  <p className="text-sm font-medium text-foreground">{selectedStudent.course}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground">Year / Semester</p>
                  <p className="text-sm font-medium text-foreground">{selectedStudent.year} / Sem {selectedStudent.semester}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground">Total Complaints</p>
                  <p className="text-sm font-medium text-foreground">{selectedStudent.totalComplaints}</p>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">{selectedStudent.email}</p>
              </div>
              
              <Button className="w-full bg-primary hover:bg-primary/90">
                <History className="w-4 h-4 mr-2" />
                View Complaint History
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Students;
