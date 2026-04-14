import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import {
  Trash2, CheckCircle, XCircle, Mail, Phone,
  Calendar, Users, Search, ChevronDown,
  Clock, LayoutDashboard, ArrowUpRight,
  UserPlus, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router';

/* ─── Config ────────────────────────────────────────────────────── */
const ITEMS_PER_PAGE = 10;

const STATUS_THEME = {
  pending:  { bg: 'bg-orange-500/10',  text: 'text-orange-400',  border: 'border-orange-500/20',  icon: <Clock size={12} /> },
  approved: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', icon: <CheckCircle size={12} /> },
  rejected: { bg: 'bg-rose-500/10',    text: 'text-rose-400',    border: 'border-rose-500/20',    icon: <XCircle size={12} /> },
};

/* ─── Shared Components ─────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const s = STATUS_THEME[status] || STATUS_THEME.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${s.bg} ${s.text} ${s.border}`}>
      {s.icon} {status}
    </span>
  );
};

const ActionButtons = ({ id, status, onAction, isMobile }) => (
  <div className={`flex items-center gap-2 ${isMobile ? 'w-full pt-4' : 'justify-end'}`}>
    {status === 'pending' && (
      <>
        <button
          onClick={() => onAction(id, 'approved')}
          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
        >
          Approve
        </button>
        <button
          onClick={() => onAction(id, 'rejected')}
          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-700 transition-all active:scale-95"
        >
          Reject
        </button>
      </>
    )}
    <button
      onClick={() => window.confirm('Delete this request?') && onAction(id, null, true)}
      className={`p-2.5 rounded-xl transition-all active:scale-95 ${
        isMobile && status !== 'pending'
          ? 'w-full bg-rose-500/10 text-rose-400 flex justify-center gap-2 font-bold text-xs border border-rose-500/20 py-2.5'
          : 'text-slate-500 hover:text-rose-400 hover:bg-rose-500/10'
      }`}
    >
      <Trash2 size={16} />
      {isMobile && status !== 'pending' && <span>Remove Record</span>}
    </button>
  </div>
);

/* ─── Pagination Component ──────────────────────────────────────── */
const Pagination = ({ currentPage, totalPages, totalItems, onPageChange }) => {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end   = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
    .reduce((acc, p, idx, arr) => {
      if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
      acc.push(p);
      return acc;
    }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t border-slate-800/60 bg-slate-950/20">
      <p className="text-xs text-slate-500 order-2 sm:order-1">
        Showing <span className="text-slate-200 font-bold">{start}</span>–<span className="text-slate-200 font-bold">{end}</span> of <span className="text-slate-200 font-bold">{totalItems}</span>
      </p>
      <div className="flex items-center gap-1 order-1 sm:order-2">
        <button
          onClick={() => onPageChange(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={15} />
        </button>

        {pages.map((item, idx) =>
          item === '...' ? (
            <span key={`e-${idx}`} className="px-2 text-slate-500 text-xs">…</span>
          ) : (
            <button
              key={item}
              onClick={() => onPageChange(item)}
              className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                currentPage === item
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {item}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};

/* ─── Main Component ────────────────────────────────────────────── */
const AdmissionApplication = () => {
  const axiosSecure   = useAxiosSecure();
  const queryClient   = useQueryClient();
  const [search,       setSearch]       = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expanded,     setExpanded]     = useState({});
  const [currentPage,  setCurrentPage]  = useState(1);

  const { data: admissions = [], isLoading } = useQuery({
    queryKey: ['admissions'],
    queryFn: async () => (await axiosSecure.get('/admission')).data,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status, isDelete }) =>
      isDelete
        ? axiosSecure.delete(`/admission/${id}`)
        : axiosSecure.patch(`/admission/${id}`, { status }),
    onSuccess: (_, v) => {
      queryClient.invalidateQueries(['admissions']);
      toast.success(v.isDelete ? 'Deleted' : `Status: ${v.status}`, {
        style: { borderRadius: '12px', background: '#1E293B', color: '#fff', fontWeight: 'bold', border: '1px solid #334155' }
      });
    },
  });

  const { paginated, counts, totalFiltered } = useMemo(() => {
    const stats = { total: admissions.length, pending: 0, approved: 0, rejected: 0 };

    const filtered = admissions.filter(a => {
      if (stats[a.application_status] !== undefined) stats[a.application_status]++;
      const matchSearch = `${a.firstName} ${a.lastName} ${a.email}`.toLowerCase().includes(search.toLowerCase());
      return (filterStatus === 'all' || a.application_status === filterStatus) && matchSearch;
    });

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return {
      paginated:     filtered.slice(start, start + ITEMS_PER_PAGE),
      counts:        stats,
      totalFiltered: filtered.length,
    };
  }, [admissions, search, filterStatus, currentPage]);

  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE);

  const handleSearch = (val) => { setSearch(val);       setCurrentPage(1); };
  const handleFilter = (val) => { setFilterStatus(val); setCurrentPage(1); };

  const handleAction = (id, status, isDelete = false) => {
    if (isDelete && paginated.length === 1 && currentPage > 1) {
      setCurrentPage(p => p - 1);
    }
    updateMutation.mutate({ id, status, isDelete });
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0F172A] p-3 sm:p-4 md:p-8 lg:p-10 text-slate-300">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-400">
              <LayoutDashboard size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">SCA Admin Panel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight">
              Admission <span className="text-indigo-500">Queue</span>
            </h1>
          </div>

          <div className="w-full sm:w-auto bg-slate-900/50 backdrop-blur-md border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 shrink-0">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Applied</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-black text-white leading-none">{counts.total}</p>
                <ArrowUpRight size={14} className="text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Manual Enrollment Banner ── */}
        <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-slate-900/40 border border-slate-800/60 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform duration-300 shrink-0">
              <UserPlus size={20} />
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">Administrative Task</h4>
              <p className="text-sm font-semibold text-slate-200">Manual Student Enrollment</p>
            </div>
          </div>
          <Link to={'/admission'} className="w-full sm:w-auto">
            <button className="w-full px-6 py-3 hover:bg-slate-800 bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-500 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer">
              Add New Student
            </button>
          </Link>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-10">
          {[
            { label: 'Applications', val: counts.total,    color: 'text-indigo-400',  border: 'border-indigo-500/20' },
            { label: 'Pending',      val: counts.pending,  color: 'text-orange-400',  border: 'border-orange-500/20' },
            { label: 'Approved',     val: counts.approved, color: 'text-emerald-400', border: 'border-emerald-500/20' },
            { label: 'Rejected',     val: counts.rejected, color: 'text-rose-400',    border: 'border-rose-500/20' },
          ].map(s => (
            <div
              key={s.label}
              className={`bg-slate-900/40 border ${s.border} rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all hover:bg-slate-900/60 hover:-translate-y-1`}
            >
              <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 sm:mb-2">{s.label}</p>
              <p className={`text-3xl sm:text-4xl font-black ${s.color}`}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* ── Filter & Search Bar ── */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-3 sm:p-4 mb-6 sm:mb-8 flex flex-col gap-3">
          {/* Search */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              onChange={e => handleSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-2xl outline-none text-sm font-bold text-white placeholder:text-slate-600 focus:border-indigo-500/50 transition-all"
            />
          </div>
          {/* Filter pills — scrollable row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar">
            {['all', 'pending', 'approved', 'rejected'].map(s => (
              <button
                key={s}
                onClick={() => handleFilter(s)}
                className={`shrink-0 px-4 sm:px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  filterStatus === s
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── List Container ── */}
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden mb-10 sm:mb-12">

          {/* Desktop Table (md+) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="bg-slate-950/30 text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] border-b border-slate-800">
                  <th className="px-6 py-5 lg:p-8">#</th>
                  <th className="px-6 py-5 lg:p-8">Student</th>
                  <th className="px-6 py-5 lg:p-8">Academic Info</th>
                  <th className="px-6 py-5 lg:p-8">Contact</th>
                  <th className="px-6 py-5 lg:p-8">Status</th>
                  <th className="px-6 py-5 lg:p-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {paginated.map((app, index) => (
                  <tr key={app._id} className="group hover:bg-slate-800/20 transition-all">

                    <td className="px-6 py-5 lg:p-8 text-xs text-slate-500 font-mono">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>

                    <td className="px-6 py-5 lg:p-8">
                      <div className="flex items-center gap-3 lg:gap-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-sm lg:text-base group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shrink-0">
                          {app.firstName[0]}{app.lastName[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white text-sm lg:text-[16px] tracking-tight truncate">{app.firstName} {app.lastName}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 flex items-center gap-1.5">
                            <Calendar size={11} className="text-slate-600 shrink-0" />
                            {new Date(app.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 lg:p-8">
                      <div className="flex flex-col gap-2">
                        <span className="w-fit px-3 py-1 bg-slate-950 text-indigo-400 border border-slate-800 rounded-lg text-[10px] font-black uppercase tracking-tighter">Class {app.class}</span>
                        <span className="w-fit px-3 py-1 bg-slate-950 text-rose-700 border border-slate-800 rounded-lg text-[10px] font-black uppercase tracking-tighter">Blood: {app.bloodGroup}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5 lg:p-8">
                      <div className="space-y-1.5">
                        <p className="text-xs font-bold text-slate-400 flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-pointer truncate max-w-[180px]">
                          <Mail size={12} className="shrink-0" />{app.email}
                        </p>
                        <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
                          <Phone size={12} className="shrink-0" />{app.phone}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 lg:p-8"><StatusBadge status={app.application_status} /></td>
                    <td className="px-6 py-5 lg:p-8"><ActionButtons id={app._id} status={app.application_status} onAction={handleAction} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards (below md) */}
          <div className="md:hidden divide-y divide-slate-800/60">
            {paginated.map((app, index) => (
              <div key={app._id} className="p-4 sm:p-6">
                <div
                  onClick={() => setExpanded(p => ({ ...p, [app._id]: !p[app._id] }))}
                  className="flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[10px] font-mono text-slate-600 w-5 shrink-0 text-right">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-white flex items-center justify-center font-black text-sm shrink-0">
                      {app.firstName[0]}{app.lastName[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-white text-sm truncate">{app.firstName} {app.lastName}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mt-0.5">
                        {new Date(app.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={app.application_status} />
                    <ChevronDown
                      size={16}
                      className={`text-slate-600 transition-transform duration-300 shrink-0 ${expanded[app._id] ? 'rotate-180 text-indigo-400' : ''}`}
                    />
                  </div>
                </div>

                {expanded[app._id] && (
                  <div className="mt-5 pt-5 border-t border-slate-800 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-2 py-1 bg-slate-950 border border-slate-800 rounded-md text-[9px] font-black text-indigo-400 uppercase tracking-widest">CL-{app.class}</span>
                        <span className="px-2 py-1 bg-slate-950 border border-slate-800 rounded-md text-[9px] font-black text-rose-400 uppercase tracking-widest">{app.bloodGroup}</span>
                      </div>
                    </div>
                    <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-800 space-y-3">
                      <p className="text-xs font-bold text-slate-400 flex items-center gap-3 break-all">
                        <Mail size={13} className="text-indigo-500/50 shrink-0" /> {app.email}
                      </p>
                      <p className="text-xs font-bold text-slate-400 flex items-center gap-3">
                        <Phone size={13} className="text-indigo-500/50 shrink-0" /> {app.phone}
                      </p>
                    </div>
                    <ActionButtons id={app._id} status={app.application_status} onAction={handleAction} isMobile />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty state */}
          {paginated.length === 0 && (
            <div className="py-20 sm:py-32 text-center px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={28} className="text-slate-700" />
              </div>
              <p className="text-slate-500 font-bold text-base sm:text-lg">No admission requests found</p>
              <p className="text-slate-600 text-sm mt-1">Try changing your filters or search terms.</p>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalFiltered}
            onPageChange={setCurrentPage}
          />
        </div>

      </div>
    </div>
  );
};

export default AdmissionApplication;