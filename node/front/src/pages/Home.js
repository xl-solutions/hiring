import { Link } from "react-router-dom";

export function Home() {
    return (
      <>
        <main>
          <h2>Bemvindo a nossa Corretora de Investimentos</h2>
          <p></p>
        </main>
        <nav>
          <Link to="/about">Sobre Nosotros</Link>
        </nav>
      </>
    );
  }