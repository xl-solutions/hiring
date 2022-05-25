import { Link } from "react-router-dom";

export function Home() {
    return (
      <>
        <main>
          <h2>Bem-vindo ao AppInvestimentos</h2>
          <p></p>
        </main>
        <nav>
          <Link to="/about">Sobre nós</Link>
        </nav>
      </>
    );
  }