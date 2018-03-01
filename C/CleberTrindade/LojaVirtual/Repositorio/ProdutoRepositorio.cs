using LojaVirtual.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace LojaVirtual.Repositorio
{
    public class ProdutoRepositorio
    {

        private SqlConnection _con;

        private void Connection()
        {
            string stringCon = ConfigurationManager.ConnectionStrings["stringConexao"].ToString();
            _con = new SqlConnection(stringCon);
            _con.Open();
        }


        public List<ProdutoModel> ObterProdutos(string pPesquisar)
        {
            if (_con == null || _con.State == ConnectionState.Closed)
            {
                Connection();
            }

            List<ProdutoModel> produtos = new List<ProdutoModel>();

            using (SqlCommand cmd = new SqlCommand("sp_ObterProdutos", _con))
            {
                cmd.CommandType = CommandType.StoredProcedure;            

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    produtos.Add(new ProdutoModel
                    {                        
                        CodFabricante = Convert.ToInt32(reader["CODMODELO"]),
                        CodModelo = Convert.ToInt32(reader["CODFABRICANTE"]),                        
                        Fabricante = Convert.ToString(reader["FABRICANTE"]),
                        Modelo = Convert.ToString(reader["MODELO"]),
                        Cor = Convert.ToString(reader["COR"]),
                        Quantidade = Convert.ToInt32(reader["QUANTIDADE"]),
                        Valor = Convert.ToDecimal(reader["VALOR"]),
                        PlanoVenda = Convert.ToString(reader["PLANOVENDA"])
                    });
       
                }
                _con.Close();
            }

            return produtos;
        }

        public List<ProdutoModel> ObterProdutosPorModelo(string pPesquisar)
        {
            if (_con == null || _con.State == ConnectionState.Closed)
            {
                Connection();
            }

            List<ProdutoModel> produtos = new List<ProdutoModel>();

            using (SqlCommand cmd = new SqlCommand("sp_ObterProdutosPorModelo", _con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Modelo", pPesquisar);

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    produtos.Add(new ProdutoModel
                    {
                        CodFabricante = Convert.ToInt32(reader["CODMODELO"]),
                        CodModelo = Convert.ToInt32(reader["CODFABRICANTE"]),
                        Fabricante = Convert.ToString(reader["FABRICANTE"]),
                        Modelo = Convert.ToString(reader["MODELO"]),
                        Cor = Convert.ToString(reader["COR"]),
                        Quantidade = Convert.ToInt32(reader["QUANTIDADE"]),
                        Valor = Convert.ToDecimal(reader["VALOR"]),
                        PlanoVenda = Convert.ToString(reader["PLANOVENDA"])
                    });

                }
                _con.Close();
            }

            return produtos;
        }

        public List<ProdutoModel> ObterProdutosPorFabricante(string pPesquisar)
        {
            if (_con == null || _con.State == ConnectionState.Closed)
            {
                Connection();
            }

            List<ProdutoModel> produtos = new List<ProdutoModel>();

            using (SqlCommand cmd = new SqlCommand("sp_ObterProdutosPorFabricante", _con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Fabricante", pPesquisar);

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    produtos.Add(new ProdutoModel
                    {
                        CodFabricante = Convert.ToInt32(reader["CODMODELO"]),
                        CodModelo = Convert.ToInt32(reader["CODFABRICANTE"]),
                        Fabricante = Convert.ToString(reader["FABRICANTE"]),
                        Modelo = Convert.ToString(reader["MODELO"]),
                        Cor = Convert.ToString(reader["COR"]),
                        Quantidade = Convert.ToInt32(reader["QUANTIDADE"]),
                        Valor = Convert.ToDecimal(reader["VALOR"]),
                        PlanoVenda = Convert.ToString(reader["PLANOVENDA"])
                    });

                }
                _con.Close();
            }

            return produtos;
        }

        public List<ProdutoModel> ObterProdutosPorTipoVenda(string pPesquisar)
        {
            if (_con == null || _con.State == ConnectionState.Closed)
            {
                Connection();
            }

            List<ProdutoModel> produtos = new List<ProdutoModel>();

            using (SqlCommand cmd = new SqlCommand("sp_ObterProdutosPorTipoVenda", _con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@TipoVenda", pPesquisar);

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    produtos.Add(new ProdutoModel
                    {
                        CodFabricante = Convert.ToInt32(reader["CODMODELO"]),
                        CodModelo = Convert.ToInt32(reader["CODFABRICANTE"]),
                        Fabricante = Convert.ToString(reader["FABRICANTE"]),
                        Modelo = Convert.ToString(reader["MODELO"]),
                        Cor = Convert.ToString(reader["COR"]),
                        Quantidade = Convert.ToInt32(reader["QUANTIDADE"]),
                        Valor = Convert.ToDecimal(reader["VALOR"]),
                        PlanoVenda = Convert.ToString(reader["PLANOVENDA"])
                    });

                }
                _con.Close();
            }

            return produtos;
        }
    }
}