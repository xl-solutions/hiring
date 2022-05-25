import { Link } from "react-router-dom";

export function Home() {
    return (
      <>
        <main>
          <h2>Bem-vindo ao AppInvestimentos</h2>
          <p><i className="fa fa-money" aria-hidden="true"></i></p>
        </main>
        <nav>
          <Link to="/about">Sobre nós</Link>
        </nav>
      </>
    );
  }