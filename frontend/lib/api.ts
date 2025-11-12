const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Note {
  id: number;
  title: string;
  content: string;
  summary?: string;
  tags: string[];
  folder_id?: number;
  is_pinned: boolean;
  created_at: string;
  updated_at?: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tags?: string[];
  folder_id?: number;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  tags?: string[];
  folder_id?: number;
  is_pinned?: boolean;
}

// Notes API
export const notesApi = {
  async getAll(): Promise<Note[]> {
    const response = await fetch(`${API_BASE_URL}/api/notes/`);
    if (!response.ok) throw new Error(`Failed to fetch notes: ${response.status} ${response.statusText}`);
    return response.json();
  },

  async getById(id: number): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/api/notes/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch note ${id}: ${response.status} ${response.statusText}`);
    return response.json();
  },

  async create(data: CreateNoteData): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/api/notes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Failed to create note: ${response.status} ${response.statusText}`);
    return response.json();
  },

  async update(id: number, data: UpdateNoteData): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Failed to update note ${id}: ${response.status} ${response.statusText}`);
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Failed to delete note ${id}: ${response.status} ${response.statusText}`);
  },
};

// AI API
export const aiApi = {
  async summarize(content: string): Promise<{ summary: string; key_points: string[] }> {
    const response = await fetch(`${API_BASE_URL}/api/ai/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) throw new Error(`Failed to summarize: ${response.status} ${response.statusText}`);
    return response.json();
  },

  async askQuestion(question: string, note_ids?: number[]): Promise<{ answer: string; relevant_notes: number[] }> {
    const response = await fetch(`${API_BASE_URL}/api/ai/question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, note_ids }),
    });
    if (!response.ok) throw new Error(`Failed to get answer: ${response.status} ${response.statusText}`);
    return response.json();
  },

  async autoTag(noteId: number): Promise<{ tags: string[] }> {
    const response = await fetch(`${API_BASE_URL}/api/ai/auto-tag/${noteId}`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error(`Failed to generate tags for note ${noteId}: ${response.status} ${response.statusText}`);
    return response.json();
  },
};

// Search API
export const searchApi = {
  async semantic(query: string, limit: number = 10) {
    const response = await fetch(`${API_BASE_URL}/api/search/semantic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, limit }),
    });
    if (!response.ok) throw new Error(`Failed to search for "${query}": ${response.status} ${response.statusText}`);
    return response.json();
  },

  async keyword(query: string, limit: number = 10) {
    const response = await fetch(`${API_BASE_URL}/api/search/keyword`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, limit }),
    });
    if (!response.ok) throw new Error(`Failed to search for "${query}": ${response.status} ${response.statusText}`);
    return response.json();
  },
};
