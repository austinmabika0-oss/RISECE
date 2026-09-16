"use client";

import { useState, useMemo } from "react";
import { 
  IconChevronDown, IconChevronUp, IconSearch, 
  IconFilter, IconCheck, IconX, IconEye, IconCurrencyRupee
} from "@tabler/icons-react";

export interface FlatRegistration {
  id: string; // registration_id
  participant_name: string;
  roll_number: string;
  phone: string;
  university: string;
  program: string;
  event_ids: string[]; // List of event codes/names
  event_count: number;
  total_amount: number;
  participation_fee: number;
  accommodation_required: boolean;
  accommodation_fee: number;
  utr_number: string;
  payment_status: string;
  payment_screenshot: string | null;
  registration_date: string;
}

interface AdminRegistrationsTableProps {
  data: FlatRegistration[];
  onVerify: (id: string) => void;
  onReject: (id: string) => void;
  loadingId?: string | null;
}

export function AdminRegistrationsTable({ 
  data, 
  onVerify,
  onReject,
  loadingId 
}: AdminRegistrationsTableProps) {
  const [sortField, setSortField] = useState<keyof FlatRegistration>("registration_date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    payment_status: "all",
  });
  
  // Pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Image Viewer Modal
  const [viewImage, setViewImage] = useState<string | null>(null);

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
    if (filters.payment_status !== "all") {
      result = result.filter(item => item.payment_status === filters.payment_status);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.participant_name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.university.toLowerCase().includes(q) ||
        item.roll_number.toLowerCase().includes(q) ||
        (item.utr_number && item.utr_number.toLowerCase().includes(q)) ||
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
  }, [data, searchQuery, sortField, sortDir, filters]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const renderSortIcon = (field: keyof FlatRegistration) => {
    if (sortField !== field) return null;
    return sortDir === "asc" ? <IconChevronUp size={14} className="inline ml-1" /> : <IconChevronDown size={14} className="inline ml-1" />;
  };

  return (
    <div className="bg-card/50 border border-border overflow-hidden">
      
      {/* Toolbar */}
      <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-96">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search by ID, Name, Roll No, UTR..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border focus:border-primary font-mono text-sm outline-none"
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-colors flex-1 sm:flex-none justify-center ${showFilters ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border hover:border-primary'}`}
          >
            <IconFilter size={16} /> Filters
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="p-4 bg-background border-b border-border grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-mono text-xs text-muted-foreground uppercase mb-1">Payment Status</label>
            <select 
              value={filters.payment_status}
              onChange={(e) => setFilters(f => ({ ...f, payment_status: e.target.value }))}
              className="w-full p-2 bg-card border border-border text-sm font-mono outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="PENDING PAYMENT">Pending Payment</option>
              <option value="UNDER VERIFICATION">Under Verification</option>
              <option value="VERIFIED">Verified</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      )}

      {/* Image Viewer Modal */}
      {viewImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm p-4">
          <div className="relative max-w-4xl w-full bg-card border border-border p-2">
            <button 
              onClick={() => setViewImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
            >
              <IconX size={20} />
            </button>
            <div className="w-full aspect-auto flex justify-center max-h-[80vh] overflow-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={viewImage} alt="Payment Evidence" className="max-w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/30 border-b border-border">
              <th className="p-3 font-mono text-xs uppercase text-muted-foreground cursor-pointer hover:text-primary whitespace-nowrap" onClick={() => handleSort("id")}>
                Reg ID {renderSortIcon("id")}
              </th>
              <th className="p-3 font-mono text-xs uppercase text-muted-foreground cursor-pointer hover:text-primary whitespace-nowrap" onClick={() => handleSort("participant_name")}>
                Participant {renderSortIcon("participant_name")}
              </th>
              <th className="p-3 font-mono text-xs uppercase text-muted-foreground cursor-pointer hover:text-primary whitespace-nowrap" onClick={() => handleSort("event_count")}>
                Events {renderSortIcon("event_count")}
              </th>
              <th className="p-3 font-mono text-xs uppercase text-muted-foreground cursor-pointer hover:text-primary whitespace-nowrap" onClick={() => handleSort("total_amount")}>
                Payment {renderSortIcon("total_amount")}
              </th>
              <th className="p-3 font-mono text-xs uppercase text-muted-foreground cursor-pointer hover:text-primary whitespace-nowrap" onClick={() => handleSort("utr_number")}>
                UTR {renderSortIcon("utr_number")}
              </th>
              <th className="p-3 font-mono text-xs uppercase text-muted-foreground cursor-pointer hover:text-primary whitespace-nowrap" onClick={() => handleSort("payment_status")}>
                Status {renderSortIcon("payment_status")}
              </th>
              <th className="p-3 font-mono text-xs uppercase text-muted-foreground text-center whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground font-mono">
                  NO REGISTRATIONS FOUND
                </td>
              </tr>
            ) : paginatedData.map((row) => (
              <tr key={row.id} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                
                {/* ID & Date */}
                <td className="p-3 align-top whitespace-nowrap">
                  <div className="font-mono text-sm font-bold text-primary">{row.id}</div>
                  <div className="font-mono text-[10px] text-muted-foreground mt-1">{row.registration_date}</div>
                </td>
                
                {/* Participant Info */}
                <td className="p-3 align-top">
                  <div className="font-bold text-sm uppercase">{row.participant_name}</div>
                  <div className="font-mono text-xs text-muted-foreground mt-0.5">{row.roll_number}</div>
                  <div className="text-xs mt-1 text-foreground/70">{row.university}</div>
                  <div className="text-[10px] uppercase text-muted-foreground mt-0.5">{row.program}</div>
                </td>
                
                {/* Events */}
                <td className="p-3 align-top">
                  <div className="font-mono text-sm font-bold">{row.event_count} Events</div>
                  <div className="flex flex-wrap gap-1 mt-1 max-w-[200px]">
                    {row.event_ids.map(eid => (
                      <span key={eid} className="inline-block px-1.5 py-0.5 border border-border text-[10px] font-mono bg-background">
                        {eid}
                      </span>
                    ))}
                  </div>
                </td>
                
                {/* Payment & Accommodation */}
                <td className="p-3 align-top whitespace-nowrap">
                  <div className="font-display font-bold text-lg text-primary flex items-center gap-1">
                    <IconCurrencyRupee size={16} /> {row.total_amount}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground mt-1">
                    Fee: ₹{row.participation_fee}
                  </div>
                  {row.accommodation_required && (
                    <div className="font-mono text-[10px] text-amber-500 mt-0.5 border border-amber-500/30 px-1 py-0.5 inline-block">
                      +₹{row.accommodation_fee} (ACC)
                    </div>
                  )}
                </td>
                
                {/* UTR */}
                <td className="p-3 align-top">
                  <div className="font-mono text-sm">{row.utr_number}</div>
                  {row.payment_screenshot && (
                    <button 
                      onClick={() => setViewImage(row.payment_screenshot)}
                      className="mt-2 flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest text-primary hover:underline"
                    >
                      <IconEye size={12} /> View Proof
                    </button>
                  )}
                </td>
                
                {/* Status */}
                <td className="p-3 align-top whitespace-nowrap">
                  <span className={`inline-block px-2 py-1 border text-[10px] font-mono uppercase tracking-widest ${
                    row.payment_status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/50' :
                    row.payment_status === 'UNDER VERIFICATION' ? 'bg-amber-500/10 text-amber-500 border-amber-500/50' :
                    row.payment_status === 'REJECTED' ? 'bg-destructive/10 text-destructive border-destructive/50' :
                    'bg-secondary text-muted-foreground border-border'
                  }`}>
                    {row.payment_status}
                  </span>
                </td>
                
                {/* Actions */}
                <td className="p-3 align-top text-center whitespace-nowrap">
                  {loadingId === row.id ? (
                    <IconLoader2 className="animate-spin mx-auto text-primary" size={20} />
                  ) : (
                    <div className="flex flex-col gap-2">
                      {row.payment_status === 'UNDER VERIFICATION' && (
                        <>
                          <button 
                            onClick={() => onVerify(row.id)}
                            className="px-3 py-1 bg-emerald-500 text-white font-mono text-xs font-bold uppercase hover:bg-emerald-600 flex items-center justify-center gap-1"
                          >
                            <IconCheck size={14} /> Verify
                          </button>
                          <button 
                            onClick={() => onReject(row.id)}
                            className="px-3 py-1 bg-destructive text-white font-mono text-xs font-bold uppercase hover:bg-destructive/90 flex items-center justify-center gap-1"
                          >
                            <IconX size={14} /> Reject
                          </button>
                        </>
                      )}
                      
                      {row.payment_status === 'VERIFIED' && (
                         <button 
                         onClick={() => onReject(row.id)}
                         className="px-3 py-1 border border-border text-muted-foreground hover:bg-destructive/10 hover:text-destructive font-mono text-xs font-bold uppercase transition-colors"
                       >
                         Revoke
                       </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/10">
        <div className="font-mono text-xs text-muted-foreground">
          Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} entries
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">Rows per page:</span>
            <select 
              value={rowsPerPage} 
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
              className="p-1 bg-background border border-border font-mono text-xs outline-none"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          
          <div className="flex gap-1">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1 border border-border bg-background disabled:opacity-50 hover:bg-muted"
            >
              <IconChevronDown className="rotate-90" size={16} />
            </button>
            <div className="px-3 py-1 border border-border bg-background font-mono text-xs flex items-center">
              {page} / {totalPages || 1}
            </div>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="p-1 border border-border bg-background disabled:opacity-50 hover:bg-muted"
            >
              <IconChevronDown className="-rotate-90" size={16} />
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
