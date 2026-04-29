import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load terms data
const termsPath = path.join(__dirname, 'data', 'terms.json');
let terms = JSON.parse(fs.readFileSync(termsPath, 'utf-8'));

// API Endpoint
app.get('/api/terms', (req, res) => {
  const { search, category } = req.query;
  let filteredTerms = terms;

  if (category && category !== '전체') {
    filteredTerms = filteredTerms.filter((t: any) => t.category === category);
  }

  if (search) {
    const query = (search as string).toLowerCase();
    filteredTerms = filteredTerms.filter((t: any) => 
      t.term.toLowerCase().includes(query) || 
      t.definition.toLowerCase().includes(query)
    );
  }

  res.json(filteredTerms);
});

// Serve static frontend files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
