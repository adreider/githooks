import React, { useState, useEffect }  from 'react';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(async () => {
    const response = await fetch("https://api.github.com/users/adreider/repos");
    const data = await response.json();

    console.log(data)
    setRepositories(data)
  }, []);

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);
    document.title = `você tem ${filtered.length} favoritos` 
  }, [repositories])

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    });

    console.log(newRepositories)
    setRepositories(newRepositories);
  }

  return (
    <>
      <ul>
        { repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>{repo.favorite ? "desfavoritar" : "favoritar"}</button>
          </li>
        ))}
      </ul>
    </>
  );
}
