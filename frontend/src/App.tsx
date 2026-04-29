import React, { useState, useEffect } from 'react';
import { Search, FlaskConical, Atom, Leaf, Globe2, ChevronRight } from 'lucide-react';
import './App.css';

interface Term {
  id: number;
  term: string;
  category: string;
  definition: string;
  example: string;
}

const categories = ['전체', '물리학', '화학', '생명과학', '지구과학'];

function App() {
  const [terms, setTerms] = useState<Term[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTerms();
  }, [search, selectedCategory]);

  const fetchTerms = async () => {
    setLoading(true);
    try {
      const baseUrl = import.meta.env.PROD ? '' : 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/terms?search=${search}&category=${selectedCategory}`);
      const data = await response.json();
      setTerms(data);
    } catch (error) {
      console.error('Error fetching terms:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case '물리학': return <Atom size={18} />;
      case '화학': return <FlaskConical size={18} />;
      case '생명과학': return <Leaf size={18} />;
      case '지구과학': return <Globe2 size={18} />;
      default: return null;
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <FlaskConical className="logo-icon" />
          <h1>SciGlossary</h1>
        </div>
        <p>복잡한 과학 용어를 쉽고 명확하게.</p>
      </header>

      <main className="main-content">
        <section className="controls">
          <div className="search-bar">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="용어를 검색하세요..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="category-tabs">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="results">
          {loading ? (
            <div className="loading">로딩 중...</div>
          ) : terms.length > 0 ? (
            <div className="term-grid">
              {terms.map(term => (
                <div key={term.id} className="term-card">
                  <div className="term-header">
                    <span className="category-tag">
                      {getCategoryIcon(term.category)}
                      {term.category}
                    </span>
                    <h3>{term.term}</h3>
                  </div>
                  <p className="definition">{term.definition}</p>
                  <div className="example">
                    <strong>예시:</strong> {term.example}
                  </div>
                  <button className="more-btn">
                    자세히 보기 <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">검색 결과가 없습니다.</div>
          )}
        </section>
      </main>

      <footer className="footer">
        © 2026 SciGlossary. 과학을 사랑하는 사람들을 위한 사전.
      </footer>
    </div>
  );
}

export default App;
