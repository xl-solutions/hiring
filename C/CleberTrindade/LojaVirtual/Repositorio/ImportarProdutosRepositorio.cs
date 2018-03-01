using LojaVirtual.Models;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace LojaVirtual.Repositorio
{
    public class ImportarProdutosRepositorio
    {
        private SqlConnection _con;

        private void Connection()
        {
            string stringCon = ConfigurationManager.ConnectionStrings["stringConexao"].ToString();
            _con = new SqlConnection(stringCon);
            _con.Open();
        }

        public bool ImportarProdutos(ImportarProdutoModel import)
        {

            int i;
            if (_con == null || _con.State == ConnectionState.Closed)
            {
                Connection();
            }

            using (SqlCommand cmd = new SqlCommand("sp_ImportarProdutos", _con))
            {
                cmd.CommandType = CommandType.StoredProcedure;                
                cmd.Parameters.AddWithValue("@Fabricante", import.Fabricante.ToUpper());
                cmd.Parameters.AddWithValue("@Modelo", import.Modelo.ToUpper());
                cmd.Parameters.AddWithValue("@Cor", import.Cor.ToUpper());
                cmd.Parameters.AddWithValue("@PlanoVenda", import.PlanoVenda.ToUpper());
                cmd.Parameters.AddWithValue("@Quantidade", import.Quantidade);
                cmd.Parameters.AddWithValue("@Preco", import.Preco);
                

                i = cmd.ExecuteNonQuery();

            }
            _con.Close();

            return i >= 1;
        }




    }
}