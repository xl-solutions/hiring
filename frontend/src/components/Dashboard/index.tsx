// import { RecentModal } from '../HistoricModal'
import { Stocks } from '../Stocks'
// import { StocksItens } from '../RecentModal'
import { Container } from './styles'

export function DashBoard(){
    return(
        <Container>
            <Stocks/>
            {/* <StocksItens/> */}
            {/* <RecentQuotes/> */}
        </Container>
    )
}