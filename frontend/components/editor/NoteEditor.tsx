'use client';

import { useState } from 'react';
import { Bold, Italic, List, Heading2, Code, Sparkles, Save } from 'lucide-react';

export default function NoteEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Bold">
              <Bold size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Italic">
              <Italic size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Heading">
              <Heading2 size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="List">
              <List size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Code">
              <Code size={18} />
            </button>
            
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />
            
            <button className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-colors">
              <Sparkles size={16} />
              <span className="text-sm font-medium">AI Assistant</span>
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Save size={16} />
            <span className="text-sm font-medium">Save</span>
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Note"
            className="w-full text-4xl font-bold text-gray-900 dark:text-white bg-transparent border-none outline-none placeholder-gray-400 dark:placeholder-gray-500 mb-4"
          />

          {/* Tags */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                #work
              </span>
              <span className="px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                #ideas
              </span>
              <button className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                + Add tag
              </button>
            </div>
          </div>

          {/* Content Editor */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your note... Type '/' for AI commands"
            className="w-full min-h-[500px] text-base text-gray-900 dark:text-white bg-transparent border-none outline-none placeholder-gray-400 dark:placeholder-gray-500 resize-none"
          />
        </div>
      </div>

      {/* AI Suggestions Panel (floating) */}
      <div className="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 hidden">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-purple-600" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">AI Suggestions</h3>
        </div>
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
            📝 Summarize this note
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
            🔍 Find related notes
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
            🏷️ Suggest tags
          </button>
        </div>
      </div>
    </div>
  );
}
