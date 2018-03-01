namespace LojaVirtual.Models
{
    public class ImportarProdutoModel
    {       
        
        public string Fabricante { get; set; }
        public string Modelo { get; set; }
        public string Cor { get; set; }
        public string PlanoVenda { get; set; }
        public int Quantidade { get; set; }
        public decimal Preco { get; set; }        
        public string MensagemErro { get; set; }


    }
}