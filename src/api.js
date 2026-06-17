const API_URL = 'http://localhost:3001/api/tools';
const STORAGE_KEY = 'efficiency_tools';

function getLocalTools() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function saveLocalTools(tools) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tools));
}

async function loadSeedData() {
  try {
    const res = await fetch('/db.json');
    if (!res.ok) throw new Error('No seed file');
    const data = await res.json();
    saveLocalTools(data);
    return data;
  } catch {
    return [];
  }
}

export async function fetchTools() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Server error');
    return res.json();
  } catch {
    const local = getLocalTools();
    if (local) return local;
    return loadSeedData();
  }
}

export async function createTool(tool) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tool),
    });
    if (!res.ok) throw new Error('Server error');
    return res.json();
  } catch {
    const tools = getLocalTools() || [];
    const maxId = tools.length > 0 ? Math.max(...tools.map((t) => t.id)) : 0;
    const newTool = { ...tool, id: maxId + 1 };
    tools.push(newTool);
    saveLocalTools(tools);
    return newTool;
  }
}

export async function updateTool(tool) {
  try {
    const res = await fetch(`${API_URL}/${tool.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tool),
    });
    if (!res.ok) throw new Error('Server error');
    return res.json();
  } catch {
    const tools = (getLocalTools() || []).map((t) => (t.id === tool.id ? tool : t));
    saveLocalTools(tools);
    return tool;
  }
}

export async function deleteTool(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Server error');
  } catch {
    const tools = (getLocalTools() || []).filter((t) => t.id !== id);
    saveLocalTools(tools);
  }
}
