namespace LojaVirtual.Models
{
    public class ProdutoModel
    {        
        public int CodModelo { get; set; }
        public int CodFabricante { get; set; }        
        public string Fabricante { get; set; }
        public string Modelo { get; set; }
        public string Cor { get; set; }
        public string PlanoVenda { get; set; }
        public int Quantidade { get; set; }
        public decimal Valor { get; set; }
        
    }
}