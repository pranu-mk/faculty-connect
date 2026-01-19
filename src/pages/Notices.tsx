import { useState } from "react";
import { Search, FileText, Download, Calendar, User, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Notice {
  id: string;
  title: string;
  description: string;
  issuedBy: string;
  department: string;
  date: string;
  type: "College" | "Department" | "Exam" | "Meeting";
  hasAttachment: boolean;
}

const notices: Notice[] = [
  { id: "NOT-001", title: "Annual Exam Schedule 2024", description: "The annual examination schedule for all departments has been released. Please check the attached document for detailed timings.", issuedBy: "Examination Cell", department: "Administration", date: "2024-01-15", type: "Exam", hasAttachment: true },
  { id: "NOT-002", title: "Faculty Meeting Notice", description: "All faculty members are requested to attend the quarterly review meeting scheduled for next week.", issuedBy: "Dean of Academics", department: "Administration", date: "2024-01-14", type: "Meeting", hasAttachment: false },
  { id: "NOT-003", title: "Lab Maintenance Schedule", description: "Computer labs will be under maintenance from 20th to 22nd January. Please plan your practical sessions accordingly.", issuedBy: "IT Department", department: "Computer Science", date: "2024-01-13", type: "Department", hasAttachment: true },
  { id: "NOT-004", title: "Republic Day Celebrations", description: "College will organize Republic Day celebrations on 26th January. All faculty members are expected to participate.", issuedBy: "Principal Office", department: "Administration", date: "2024-01-12", type: "College", hasAttachment: false },
  { id: "NOT-005", title: "Research Grant Applications", description: "Faculty members interested in applying for research grants may submit their proposals by the end of this month.", issuedBy: "Research Cell", department: "Administration", date: "2024-01-10", type: "College", hasAttachment: true },
  { id: "NOT-006", title: "Internal Assessment Submission", description: "All faculty members are requested to submit internal assessment marks for the current semester.", issuedBy: "Examination Cell", department: "Administration", date: "2024-01-08", type: "Exam", hasAttachment: false },
];

const typeStyles = {
  College: "bg-primary/20 text-primary border-primary/30",
  Department: "bg-info/20 text-info border-info/30",
  Exam: "bg-warning/20 text-warning border-warning/30",
  Meeting: "bg-success/20 text-success border-success/30",
};

const Notices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          notice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || notice.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Notice Board</h1>
        <p className="text-muted-foreground mt-1">College announcements and notifications</p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-secondary/50 border-border/50"
            />
          </div>
          <div className="flex gap-2">
            {["all", "College", "Department", "Exam", "Meeting"].map((type) => (
              <Button
                key={type}
                size="sm"
                variant="ghost"
                className={`${typeFilter === type ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}
                onClick={() => setTypeFilter(type)}
              >
                {type === "all" ? "All" : type}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.map((notice, index) => (
          <div 
            key={notice.id}
            className="glass-card-hover p-6 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline" className={typeStyles[notice.type]}>
                    {notice.type}
                  </Badge>
                  {notice.hasAttachment && (
                    <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-muted">
                      <FileText className="w-3 h-3 mr-1" />
                      Attachment
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">{notice.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{notice.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{notice.issuedBy}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    <span>{notice.department}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{notice.date}</span>
                  </div>
                </div>
              </div>
              
              {notice.hasAttachment && (
                <Button size="sm" variant="ghost" className="hover:bg-primary/20">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notices;
