'use client';

import { useState } from 'react';
import { FileText, FolderOpen, Plus, Search, Settings, Tag } from 'lucide-react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              AI Notes
            </h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FileText size={20} />
          </button>
        </div>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* New Note Button */}
      <div className="px-4 pb-4">
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          <Plus size={18} />
          {!isCollapsed && <span>New Note</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2">
        <div className="space-y-1">
          <NavItem icon={<FileText size={18} />} label="All Notes" isCollapsed={isCollapsed} />
          <NavItem icon={<FolderOpen size={18} />} label="Folders" isCollapsed={isCollapsed} />
          <NavItem icon={<Tag size={18} />} label="Tags" isCollapsed={isCollapsed} />
        </div>

        {!isCollapsed && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Recent Notes
            </h3>
            <div className="space-y-1">
              <NoteItem title="Meeting Notes" date="Today" />
              <NoteItem title="Project Ideas" date="Yesterday" />
              <NoteItem title="Todo List" date="2 days ago" />
            </div>
          </div>
        )}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full flex items-center gap-2 py-2 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <Settings size={18} />
          {!isCollapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, isCollapsed }: { icon: React.ReactNode; label: string; isCollapsed: boolean }) {
  return (
    <button className="w-full flex items-center gap-3 py-2 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </button>
  );
}

function NoteItem({ title, date }: { title: string; date: string }) {
  return (
    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
      <div className="text-sm font-medium text-gray-900 dark:text-white">{title}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{date}</div>
    </button>
  );
}
