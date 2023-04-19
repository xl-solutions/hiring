import Link from 'next/link'
import Header from '../src/components/Header'
 
export default function HomePage() {
    return (
        <div>
            <Header/>
            <h1>Home aqui</h1>
            <Link href="/portfolio">Portifolio</Link>
        </div>

    )
}