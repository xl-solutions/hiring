import { Link } from "react-router-dom";

export function About() {
    return (
      <>
        <main>
          <h2>Somos a maior corretora de valores do Brasil</h2>
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