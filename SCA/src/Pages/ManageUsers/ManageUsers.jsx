import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { ShieldCheck, UserCog, Trash2, Mail, Calendar, User, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import Swal from 'sweetalert2';

const USERS_PER_PAGE = 10;

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);

    const { data = {}, isLoading, refetch } = useQuery({
        queryKey: ['all-users', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${currentPage}&limit=${USERS_PER_PAGE}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const users = data.users || [];
    const totalUsers = data.total || 0;
    const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

    const handleRoleChange = async (user, newRole) => {
        const result = await Swal.fire({
            title: `Make ${user.name} a ${newRole}?`,
            text: "This will update their access level immediately.",
            icon: "question",
            background: '#1f2937',
            color: '#f1f5f9',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#374151',
            confirmButtonText: `Yes, make ${newRole}`,
            cancelButtonText: 'Cancel',
        });

        if (!result.isConfirmed) return;

        try {
            const res = await axiosSecure.patch(`/users/${user.email}`, { role: newRole });
            if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                refetch();
                Swal.fire({
                    title: "Role Updated!",
                    text: `${user.name} is now a ${newRole}`,
                    icon: "success",
                    background: '#1f2937',
                    color: '#f1f5f9',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (err) {
            console.error("Failed to update role", err);
            Swal.fire({
                title: "Error",
                text: "Failed to update role. Please try again.",
                icon: "error",
                background: '#1f2937',
                color: '#f1f5f9',
            });
        }
    };

    const handleDelete = async (user) => {
        const result = await Swal.fire({
            title: `Delete ${user.name}?`,
            text: "This action cannot be undone.",
            icon: "warning",
            background: '#1f2937',
            color: '#f1f5f9',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#374151',
            confirmButtonText: 'Yes, delete user',
            cancelButtonText: 'Cancel',
        });

        if (!result.isConfirmed) return;

        try {
            const res = await axiosSecure.delete(`/users/${user.email}`);
            if (res.data.deletedCount > 0) {
                if (users.length === 1 && currentPage > 1) {
                    setCurrentPage(p => p - 1);
                } else {
                    refetch();
                }
                Swal.fire({
                    title: "Deleted!",
                    text: `${user.name} has been removed.`,
                    icon: "success",
                    background: '#1f2937',
                    color: '#f1f5f9',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (err) {
            console.error("Failed to delete user", err);
            Swal.fire({
                title: "Error",
                text: "Failed to delete user. Please try again.",
                icon: "error",
                background: '#1f2937',
                color: '#f1f5f9',
            });
        }
    };

    const getRoleBadgeClass = (role) => {
        if (role === 'admin') return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
        if (role === 'teacher') return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
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
        <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6 min-h-screen">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-6 sm:mb-10">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white italic">User Management</h2>
                    <p className="text-slate-400 text-sm mt-1">
                        {totalUsers} registered accounts
                    </p>
                </div>
                <div className="flex items-center gap-2 sm:text-right sm:block">
                    <Users size={14} className="text-slate-500 sm:hidden" />
                    <div>
                        <p className="text-[11px] sm:text-[13px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">Access Level</p>
                        <p className="text-blue-400 font-black text-xs sm:text-sm uppercase">Administrator</p>
                    </div>
                </div>
            </div>

            {/* ── DESKTOP TABLE (md and up) ── */}
            <div className="hidden md:block bg-[#1f2937] border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-800/80 border-b border-slate-700/60">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">#</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Member</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Joined</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Role</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/40">
                            {users.map((user, index) => (
                                <tr key={user._id} className="group hover:bg-slate-700/20 transition-all duration-200">
                                    <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                                        {(currentPage - 1) * USERS_PER_PAGE + index + 1}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-600/50 overflow-hidden shrink-0">
                                                <img
                                                    src={user.image || "https://i.pravatar.cc/150?u=" + user.email}
                                                    alt={user.name}
                                                    className="w-full h-full object-cover"
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors">
                                                    {user.name || "Anonymous"}
                                                </p>
                                                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                                    <Mail size={11} />
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-300 text-xs font-medium">
                                            <Calendar size={13} className="text-slate-500" />
                                            {new Date(user.createdAt).toLocaleDateString('en-GB')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getRoleBadgeClass(user.role)}`}>
                                            {user.role || 'student'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center items-center gap-2 flex-wrap">
                                            <button
                                                onClick={() => handleRoleChange(user, 'admin')}
                                                disabled={user.role === 'admin'}
                                                title="Promote to Admin"
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all duration-200 active:scale-95 ${
                                                    user.role === 'admin'
                                                        ? 'opacity-25 cursor-not-allowed border-slate-700 text-slate-500'
                                                        : 'border-rose-500/40 text-rose-400 hover:bg-rose-500 hover:text-white hover:border-transparent'
                                                }`}
                                            >
                                                <ShieldCheck size={13} />
                                                Make Admin
                                            </button>
                                            <button
                                                onClick={() => handleRoleChange(user, 'teacher')}
                                                disabled={user.role === 'teacher'}
                                                title="Promote to Teacher"
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all duration-200 active:scale-95 ${
                                                    user.role === 'teacher'
                                                        ? 'opacity-25 cursor-not-allowed border-slate-700 text-slate-500'
                                                        : 'border-indigo-500/40 text-indigo-300 hover:bg-indigo-500 hover:text-white hover:border-transparent'
                                                }`}
                                            >
                                                <UserCog size={13} />
                                                Make Teacher
                                            </button>
                                            <button
                                                onClick={() => handleRoleChange(user, 'student')}
                                                disabled={user.role === 'student' || !user.role}
                                                title="Demote to Student"
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all duration-200 active:scale-95 ${
                                                    user.role === 'student' || !user.role
                                                        ? 'opacity-25 cursor-not-allowed border-slate-700 text-slate-500'
                                                        : 'border-blue-500/40 text-blue-300 hover:bg-blue-500 hover:text-white hover:border-transparent'
                                                }`}
                                            >
                                                <User size={13} />
                                                Make Student
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user)}
                                                title="Delete User"
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-200 active:scale-95"
                                            >
                                                <Trash2 size={13} />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination - Desktop */}
                <DesktopPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalUsers={totalUsers}
                    users={users}
                    setCurrentPage={setCurrentPage}
                    USERS_PER_PAGE={USERS_PER_PAGE}
                />
            </div>

            {/* ── MOBILE / TABLET CARDS (below md) ── */}
            <div className="md:hidden space-y-3">
                {users.map((user, index) => (
                    <div
                        key={user._id}
                        className="bg-[#1f2937] border border-slate-700/60 rounded-2xl p-4 shadow-lg"
                    >
                        {/* Card top row: avatar + info + badge */}
                        <div className="flex items-start gap-3">
                            {/* Serial */}
                            <span className="text-[10px] text-slate-600 font-mono mt-1 shrink-0 w-5 text-right">
                                {(currentPage - 1) * USERS_PER_PAGE + index + 1}
                            </span>

                            {/* Avatar */}
                            <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-600/50 overflow-hidden shrink-0">
                                <img
                                    src={user.image || "https://i.pravatar.cc/150?u=" + user.email}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            </div>

                            {/* Name + email */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <p className="text-sm font-bold text-slate-100 truncate">
                                        {user.name || "Anonymous"}
                                    </p>
                                    <span className={`shrink-0 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${getRoleBadgeClass(user.role)}`}>
                                        {user.role || 'student'}
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                                    <Mail size={10} className="shrink-0" />
                                    <span className="truncate">{user.email}</span>
                                </p>
                                <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                                    <Calendar size={10} className="shrink-0" />
                                    Joined {new Date(user.createdAt).toLocaleDateString('en-GB')}
                                </p>
                            </div>
                        </div>

                        {/* Action buttons — 2×2 grid + delete full width */}
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <button
                                onClick={() => handleRoleChange(user, 'admin')}
                                disabled={user.role === 'admin'}
                                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold border transition-all duration-200 active:scale-95 ${
                                    user.role === 'admin'
                                        ? 'opacity-25 cursor-not-allowed border-slate-700 text-slate-500'
                                        : 'border-rose-500/40 text-rose-400 hover:bg-rose-500 hover:text-white hover:border-transparent'
                                }`}
                            >
                                <ShieldCheck size={12} />
                                Make Admin
                            </button>

                            <button
                                onClick={() => handleRoleChange(user, 'teacher')}
                                disabled={user.role === 'teacher'}
                                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold border transition-all duration-200 active:scale-95 ${
                                    user.role === 'teacher'
                                        ? 'opacity-25 cursor-not-allowed border-slate-700 text-slate-500'
                                        : 'border-indigo-500/40 text-indigo-300 hover:bg-indigo-500 hover:text-white hover:border-transparent'
                                }`}
                            >
                                <UserCog size={12} />
                                Make Teacher
                            </button>

                            <button
                                onClick={() => handleRoleChange(user, 'student')}
                                disabled={user.role === 'student' || !user.role}
                                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold border transition-all duration-200 active:scale-95 ${
                                    user.role === 'student' || !user.role
                                        ? 'opacity-25 cursor-not-allowed border-slate-700 text-slate-500'
                                        : 'border-blue-500/40 text-blue-300 hover:bg-blue-500 hover:text-white hover:border-transparent'
                                }`}
                            >
                                <User size={12} />
                                Make Student
                            </button>

                            <button
                                onClick={() => handleDelete(user)}
                                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-200 active:scale-95"
                            >
                                <Trash2 size={12} />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {/* Pagination - Mobile */}
                {totalPages > 1 && (
                    <div className="bg-[#1f2937] border border-slate-700/60 rounded-2xl px-4 py-3 shadow-lg">
                        {/* Info row */}
                        <p className="text-xs text-slate-400 text-center mb-3">
                            <span className="text-slate-200 font-bold">{(currentPage - 1) * USERS_PER_PAGE + 1}</span>
                            {' '}–{' '}
                            <span className="text-slate-200 font-bold">{Math.min(currentPage * USERS_PER_PAGE, totalUsers)}</span>
                            {' '}of{' '}
                            <span className="text-slate-200 font-bold">{totalUsers}</span> users
                        </p>

                        {/* Controls */}
                        <div className="flex items-center justify-between gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-semibold"
                            >
                                <ChevronLeft size={14} /> Prev
                            </button>

                            {/* Page numbers — compact on mobile */}
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(page =>
                                        page === 1 ||
                                        page === totalPages ||
                                        Math.abs(page - currentPage) <= 1
                                    )
                                    .reduce((acc, page, idx, arr) => {
                                        if (idx > 0 && page - arr[idx - 1] > 1) acc.push('...');
                                        acc.push(page);
                                        return acc;
                                    }, [])
                                    .map((item, idx) =>
                                        item === '...' ? (
                                            <span key={`e-${idx}`} className="px-1 text-slate-500 text-xs">…</span>
                                        ) : (
                                            <button
                                                key={item}
                                                onClick={() => setCurrentPage(item)}
                                                className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                                                    currentPage === item
                                                        ? 'bg-blue-600 border-blue-600 text-white'
                                                        : 'border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'
                                                }`}
                                            >
                                                {item}
                                            </button>
                                        )
                                    )
                                }
                            </div>

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-semibold"
                            >
                                Next <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ── Desktop Pagination (extracted for cleanliness) ── */
const DesktopPagination = ({ currentPage, totalPages, totalUsers, users, setCurrentPage, USERS_PER_PAGE }) => {
    if (totalPages <= 1) return null;
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-700/60 bg-slate-800/40">
            <p className="text-xs text-slate-400">
                Showing{' '}
                <span className="text-slate-200 font-bold">{(currentPage - 1) * USERS_PER_PAGE + 1}</span>
                {' '}–{' '}
                <span className="text-slate-200 font-bold">{Math.min(currentPage * USERS_PER_PAGE, totalUsers)}</span>
                {' '}of{' '}
                <span className="text-slate-200 font-bold">{totalUsers}</span> users
            </p>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronLeft size={15} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page =>
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1
                    )
                    .reduce((acc, page, idx, arr) => {
                        if (idx > 0 && page - arr[idx - 1] > 1) acc.push('...');
                        acc.push(page);
                        return acc;
                    }, [])
                    .map((item, idx) =>
                        item === '...' ? (
                            <span key={`ellipsis-${idx}`} className="px-2 text-slate-500 text-xs">…</span>
                        ) : (
                            <button
                                key={item}
                                onClick={() => setCurrentPage(item)}
                                className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                                    currentPage === item
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : 'border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'
                                }`}
                            >
                                {item}
                            </button>
                        )
                    )
                }

                <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronRight size={15} />
                </button>
            </div>
        </div>
    );
};

export default ManageUsers;