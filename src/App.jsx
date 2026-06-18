import React, { useState, useEffect, useMemo } from 'react';
import { Button, ToggleSwitch, Tabs } from '@shashpicious/casa';
import ToolCard from './components/ToolCard';
import ToolTable from './components/ToolTable';
import ToolForm from './components/ToolForm';
import Login from './components/Login';
import { fetchTools, createTool, updateTool, deleteTool } from './api';

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [tools, setTools] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTool, setEditingTool] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filterDept, setFilterDept] = useState('');
  const [filterCreatedBy, setFilterCreatedBy] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    fetchTools().then(setTools).catch(console.error);
  }, []);

  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [darkMode]);

  const departments = useMemo(() => {
    const set = new Set(tools.map((t) => (t.department || '').trim()).filter(Boolean));
    return [...set].sort();
  }, [tools]);

  const creators = useMemo(() => {
    const set = new Set(tools.map((t) => (t.createdBy || '').trim()).filter(Boolean));
    return [...set].sort();
  }, [tools]);

  const filteredTools = useMemo(() => {
    return tools.filter((t) => {
      if (filterDept && (t.department || '').trim() !== filterDept) return false;
      if (filterCreatedBy && (t.createdBy || '').trim() !== filterCreatedBy) return false;
      return true;
    });
  }, [tools, filterDept, filterCreatedBy]);

  const handleAdd = async (tool) => {
    try {
      const created = await createTool(tool);
      setTools([...tools, created]);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add tool:', err);
    }
  };

  const handleUpdate = async (updated) => {
    try {
      const saved = await updateTool(updated);
      setTools(tools.map((t) => (t.id === saved.id ? saved : t)));
      setEditingTool(null);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to update tool:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      await deleteTool(id);
      setTools(tools.filter((t) => t.id !== id));
    }
  };

  const handleEdit = (tool) => {
    setEditingTool(tool);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTool(null);
  };

  const ADMIN_EMAIL = 'paras.de@amberstudent.com';
  const isAdmin = user?.email === ADMIN_EMAIL;

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const tabItems = [
    {
      key: 'grid',
      label: '▦ Grid',
      content: (
        <div className="tools-grid">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onEdit={isAdmin ? handleEdit : null}
              onDelete={isAdmin ? handleDelete : null}
            />
          ))}
        </div>
      ),
    },
    {
      key: 'table',
      label: '☰ Table',
      content: (
        <ToolTable tools={filteredTools} onEdit={isAdmin ? handleEdit : null} onDelete={isAdmin ? handleDelete : null} />
      ),
    },
  ];

  if (!user) {
    return <Login onSuccess={setUser} />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Internal Efficiency Tools</h1>
        <div className="header-actions">
          <div className="user-info">
            {user.picture && <img src={user.picture} alt={user.name} className="user-avatar" />}
            <span className="user-name">{user.name}</span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
          <div className="theme-switch">
            <span className="theme-label">{darkMode ? '🌙' : '☀️'}</span>
            <ToggleSwitch checked={darkMode} onChange={setDarkMode} />
          </div>
          {!showForm && isAdmin && (
            <Button variant="primary" onClick={() => setShowForm(true)}>
              + Add Tool
            </Button>
          )}
        </div>
      </div>

      <div className="filters">
        <select
          className="filter-select"
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          className="filter-select"
          value={filterCreatedBy}
          onChange={(e) => setFilterCreatedBy(e.target.value)}
        >
          <option value="">All Creators</option>
          {creators.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {(filterDept || filterCreatedBy) && (
          <button
            className="filter-clear"
            onClick={() => { setFilterDept(''); setFilterCreatedBy(''); }}
          >
            Clear filters
          </button>
        )}
      </div>

      {showForm && (
        <ToolForm
          tool={editingTool}
          onSubmit={editingTool ? handleUpdate : handleAdd}
          onCancel={handleCancel}
        />
      )}

      <Tabs
        items={tabItems}
        activeKey={viewMode}
        onChange={setViewMode}
      />

      {filteredTools.length === 0 && !showForm && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '3rem' }}>
          {tools.length === 0
            ? 'No tools added yet. Click "+ Add Tool" to get started.'
            : 'No tools match the selected filters.'}
        </p>
      )}
    </div>
  );
}
