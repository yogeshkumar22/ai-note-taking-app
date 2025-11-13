import NoteEditor from '@/components/editor/NoteEditor';
import Sidebar from '@/components/sidebar/Sidebar';

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <NoteEditor />
      </main>
    </div>
  );
}
