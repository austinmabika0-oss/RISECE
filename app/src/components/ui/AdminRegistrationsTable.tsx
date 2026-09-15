"use client";

import { useState, useMemo } from "react";
import { 
  IconChevronDown, IconChevronUp, IconSearch, 
  IconFilter, IconDotsVertical, IconCheck, IconX, IconEye, IconUsers
} from "@tabler/icons-react";

export interface FlatRegistration {
  id: string; // team_member.id
  team_id: string;
  registration_id: string;
  participant_name: string;
  phone: string;
  university: string;
  event_name: string;
  event_code: string;
  team_name: string;
  team_size: string;
  role: string;
  registration_date: string;
  status: string;
}

interface AdminRegistrationsTableProps {
  data: FlatRegistration[];
  onManageTeam: (teamId: string) => void;
  onApprove: (teamId: string) => void;
  onReject: (teamId: string) => void;
  loadingId?: string | null;
}

export function AdminRegistrationsTable({ 
  data, 
  onManageTeam,
  onApprove,
  onReject,
  loadingId 
}: AdminRegistrationsTableProps) {
  const [sortField, setSortField] = useState<keyof FlatRegistration>("registration_date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    event_code: "all",
    status: "all",
    role: "all"
  });
  
  // Pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (field: keyof FlatRegistration) => {
    if (field === sortField) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filteredData = useMemo(() => {
    let result = data;
    
    // Apply Advanced Filters
    if (filters.event_code !== "all") {
      result = result.filter(item => item.event_code === filters.event_code);
    }
    if (filters.status !== "all") {
      result = result.filter(item => item.status === filters.status);
    }
    if (filters.role !== "all") {
      result = result.filter(item => item.role === filters.role);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.participant_name.toLowerCase().includes(q) ||
        item.registration_id.toLowerCase().includes(q) ||
        item.university.toLowerCase().includes(q) ||
        item.event_name.toLowerCase().includes(q) ||
        item.team_name.toLowerCase().includes(q) ||
        item.phone.includes(q)
      );
    }
    
    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();
      
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    
    return result;
  }, [data, sortField, sortDir, searchQuery, filters]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Extract unique events for the filter dropdown
  const uniqueEvents = useMemo(() => {
    const events = new Map();
    data.forEach(d => events.set(d.event_code, d.event_name));
    return Array.from(events.entries());
  }, [data]);

  const SortIcon = ({ field }: { field: keyof FlatRegistration }) => {
    if (sortField !== field) return <div className="w-4 h-4 opacity-0 group-hover:opacity-30 inline-block align-middle ml-1"><IconChevronDown size={14} /></div>;
    return sortDir === "asc" ? <IconChevronUp size={14} className="text-primary inline-block align-middle ml-1" /> : <IconChevronDown size={14} className="text-primary inline-block align-middle ml-1" />;
  };

  const thClass = "px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-bold cursor-pointer hover:text-foreground group whitespace-nowrap";

  return (
    <div className="w-full flex flex-col gap-4">
      
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-card/50 p-4 border border-border">
        <div className="relative w-full md:w-96">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input 
            type="text" 
            placeholder="Search name, ID, university..." 
            className="w-full bg-background border border-border/50 pl-10 pr-4 py-3 min-h-[44px] text-sm font-mono focus:outline-none focus:border-primary/50 transition-colors"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
          />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto relative">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] flex-1 md:flex-none border font-mono text-xs uppercase transition-colors ${showFilters ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-border/50 hover:text-primary'}`}
          >
            <IconFilter size={14} /> Filters
          </button>
          
          <select 
            className="bg-background border border-border/50 px-2 py-3 min-h-[44px] flex-1 md:flex-none text-sm font-mono focus:outline-none"
            value={rowsPerPage}
            onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
          >
            <option value={10}>10 rows</option>
            <option value={25}>25 rows</option>
            <option value={50}>50 rows</option>
            <option value={100}>100 rows</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="p-4 border border-border bg-secondary/30 flex flex-col md:flex-row flex-wrap gap-4 md:gap-6 md:items-end">
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Event</label>
            <select 
              value={filters.event_code}
              onChange={(e) => { setFilters(f => ({ ...f, event_code: e.target.value })); setPage(1); }}
              className="w-full bg-background border border-border/50 px-3 py-3 min-h-[44px] text-sm font-mono focus:outline-none focus:border-primary/50"
            >
              <option value="all">All Events</option>
              {uniqueEvents.map(([code, name]) => (
                <option key={code} value={code}>{name} ({code})</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Status</label>
            <select 
              value={filters.status}
              onChange={(e) => { setFilters(f => ({ ...f, status: e.target.value })); setPage(1); }}
              className="w-full bg-background border border-border/50 px-3 py-3 min-h-[44px] text-sm font-mono focus:outline-none focus:border-primary/50"
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto">
            <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Role</label>
            <select 
              value={filters.role}
              onChange={(e) => { setFilters(f => ({ ...f, role: e.target.value })); setPage(1); }}
              className="w-full bg-background border border-border/50 px-3 py-3 min-h-[44px] text-sm font-mono focus:outline-none focus:border-primary/50"
            >
              <option value="all">All Roles</option>
              <option value="leader">Leader</option>
              <option value="member">Member</option>
            </select>
          </div>
          
          <button 
            onClick={() => {
              setFilters({ event_code: "all", status: "all", role: "all" });
              setSearchQuery("");
              setPage(1);
            }}
            className="w-full md:w-auto px-6 py-3 min-h-[44px] text-xs font-mono border border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Table Container - Desktop */}
      <div className="hidden md:block w-full overflow-x-auto border border-border bg-card/30">
        <table className="w-full text-sm">
          <thead className="bg-background/50 border-b border-border">
            <tr>
              <th className={thClass} onClick={() => handleSort("registration_id")}>
                Reg ID <SortIcon field="registration_id" />
              </th>
              <th className={thClass} onClick={() => handleSort("participant_name")}>
                Participant <SortIcon field="participant_name" />
              </th>
              <th className={thClass} onClick={() => handleSort("university")}>
                University <SortIcon field="university" />
              </th>
              <th className={thClass} onClick={() => handleSort("event_name")}>
                Event <SortIcon field="event_name" />
              </th>
              <th className={thClass} onClick={() => handleSort("team_name")}>
                Team <SortIcon field="team_name" />
              </th>
              <th className={thClass} onClick={() => handleSort("role")}>
                Role <SortIcon field="role" />
              </th>
              <th className={thClass} onClick={() => handleSort("status")}>
                Status <SortIcon field="status" />
              </th>
              <th className="px-4 py-3 text-right font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground font-mono text-sm">
                  No registrations found
                </td>
              </tr>
            ) : paginatedData.map((row) => (
              <tr key={row.id} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                <td className="px-4 py-3 font-mono text-xs">{row.registration_id}</td>
                <td className="px-4 py-3">
                  <div className="font-bold whitespace-nowrap">{row.participant_name}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">{row.phone}</div>
                </td>
                <td className="px-4 py-3 text-xs max-w-[150px] truncate" title={row.university}>{row.university}</td>
                <td className="px-4 py-3 text-xs whitespace-nowrap">
                  <span className="text-primary font-mono text-[10px] uppercase block">{row.event_code}</span>
                  {row.event_name}
                </td>
                <td className="px-4 py-3">
                  <div className="text-xs font-bold whitespace-nowrap">{row.team_name}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">Size: {row.team_size}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-mono px-2 py-0.5 uppercase border ${row.role === 'leader' ? 'border-primary/50 text-primary' : 'border-border text-muted-foreground'}`}>
                    {row.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-mono px-2 py-0.5 uppercase border ${
                    row.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' :
                    row.status === 'rejected' ? 'bg-destructive/10 text-destructive border-destructive/30' :
                    'bg-amber-500/10 text-amber-500 border-amber-500/30'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onManageTeam(row.team_id)}
                      className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      title="View Team"
                    >
                      <IconEye size={16} />
                    </button>
                    {row.role === 'leader' && (
                      <>
                        <button 
                          onClick={() => onApprove(row.team_id)}
                          disabled={row.status === 'approved' || loadingId === row.team_id}
                          className="p-1.5 text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors disabled:opacity-30"
                          title="Approve Team"
                        >
                          <IconCheck size={16} />
                        </button>
                        <button 
                          onClick={() => onReject(row.team_id)}
                          disabled={row.status === 'rejected' || loadingId === row.team_id}
                          className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-30"
                          title="Reject Team"
                        >
                          <IconX size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card Container - Mobile */}
      <div className="block md:hidden space-y-4">
        {paginatedData.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground font-mono text-sm border border-border bg-card">
            No registrations found
          </div>
        ) : (
          paginatedData.map(row => (
            <div key={row.id} className="p-4 border border-border bg-card shadow-sm flex flex-col gap-3 relative overflow-hidden">
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${row.status === 'approved' ? 'bg-emerald-500' : row.status === 'pending' ? 'bg-amber-500' : 'bg-destructive'}`} />
              
              <div className="flex justify-between items-start pl-2 border-b border-border/50 pb-3">
                <div>
                  <div className="font-bold text-foreground text-lg">{row.participant_name}</div>
                  <div className="text-xs font-mono text-muted-foreground tracking-wider">{row.registration_id}</div>
                </div>
                <div className={`text-[10px] font-mono px-2 py-1 border uppercase ${row.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/50' : row.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/50' : 'bg-destructive/10 text-destructive border-destructive/50'}`}>
                  {row.status}
                </div>
              </div>
              
              <div className="pl-2 space-y-3">
                <div className="text-sm font-medium">
                  <span className="text-muted-foreground font-normal text-xs uppercase tracking-widest block mb-1">University</span>
                  {row.university}
                </div>
                <div className="text-sm font-medium">
                  <span className="text-muted-foreground font-normal text-xs uppercase tracking-widest block mb-1">Event</span>
                  {row.event_name}
                </div>
                <div className="text-sm font-medium">
                  <span className="text-muted-foreground font-normal text-xs uppercase tracking-widest block mb-1">Team Details</span>
                  {row.team_name ? (
                    <span>{row.team_name} <span className="text-xs text-muted-foreground">({row.role})</span></span>
                  ) : 'Individual'}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 pt-3 border-t border-border/50 mt-2 pl-2">
                {row.team_id && (
                  <button 
                    onClick={() => onManageTeam(row.team_id)}
                    className="w-full py-3 min-h-[44px] text-xs font-mono border border-primary/50 text-primary hover:bg-primary/10 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <IconUsers size={16} /> Manage Team
                  </button>
                )}
                
                {row.role === 'leader' && row.status === 'pending' && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onApprove(row.team_id)}
                      disabled={loadingId === row.team_id}
                      className="flex-1 py-3 min-h-[44px] text-xs font-mono border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 transition-colors text-center flex items-center justify-center gap-2"
                    >
                      <IconCheck size={16} /> Approve
                    </button>
                    <button 
                      onClick={() => onReject(row.team_id)}
                      disabled={loadingId === row.team_id}
                      className="flex-1 py-3 min-h-[44px] text-xs font-mono border border-destructive/50 text-destructive hover:bg-destructive/10 transition-colors text-center flex items-center justify-center gap-2"
                    >
                      <IconX size={16} /> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground p-2">
        <div>
          Showing {Math.min(filteredData.length, (page - 1) * rowsPerPage + 1)} - {Math.min(filteredData.length, page * rowsPerPage)} of {filteredData.length} registrations
        </div>
        <div className="flex gap-1">
          <button 
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-3 py-1 border border-border hover:border-primary disabled:opacity-50 disabled:hover:border-border"
          >
            PREV
          </button>
          <span className="px-3 py-1 border border-border bg-card/50">
            {page} / {totalPages || 1}
          </span>
          <button 
            disabled={page >= totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="px-3 py-1 border border-border hover:border-primary disabled:opacity-50 disabled:hover:border-border"
          >
            NEXT
          </button>
        </div>
      </div>

    </div>
  );
}
