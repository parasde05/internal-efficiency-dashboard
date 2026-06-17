const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

function readDB() {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// GET all tools
app.get('/api/tools', (req, res) => {
  const tools = readDB();
  res.json(tools);
});

// POST create tool
app.post('/api/tools', (req, res) => {
  const tools = readDB();
  const maxId = tools.length > 0 ? Math.max(...tools.map((t) => t.id)) : 0;
  const newTool = { ...req.body, id: maxId + 1 };
  tools.push(newTool);
  writeDB(tools);
  res.status(201).json(newTool);
});

// PUT update tool
app.put('/api/tools/:id', (req, res) => {
  const tools = readDB();
  const id = Number(req.params.id);
  const index = tools.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Tool not found' });
  tools[index] = { ...req.body, id };
  writeDB(tools);
  res.json(tools[index]);
});

// DELETE tool
app.delete('/api/tools/:id', (req, res) => {
  let tools = readDB();
  const id = Number(req.params.id);
  const exists = tools.some((t) => t.id === id);
  if (!exists) return res.status(404).json({ error: 'Tool not found' });
  tools = tools.filter((t) => t.id !== id);
  writeDB(tools);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
