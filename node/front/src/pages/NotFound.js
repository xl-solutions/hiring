import { Link } from "react-router-dom";

export function NotFound() {
    return (
      <>
        <main>
          <h2>Página não encontrada</h2>
          <p>
            That feels like an existential question, don't you
            think?
          </p>
        </main>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </>
    );
  }