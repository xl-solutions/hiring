import Footer from '../../components/patterns/Footer'
import  Header from '../../components/patterns/Header'
import { theme } from '../../theme/theme';
import { Image, Box, Text, Icon, Input, Button } from '../../theme/components';
import GridCard from '../../components/commun/GridTemplate';
import FilterBox from '../../components/commun/BoxFiltter';



export default function HomeScreen() {
  return (
    <Box>
      <Header/>
      <GridCard/>
      <FilterBox/>
      <Footer />
    </Box>
  )
}