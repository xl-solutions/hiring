using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace projeto.DAL
{
    public class Conexao
    {
        SqlConnection _conexao;
        SqlCommand _comando;

        public Conexao()
        {
            _conexao = new SqlConnection("Server=den1.mssql3.gear.host;Database=projetoxl;User Id=projetoxl;Password = Vw5w?_3bLTwi;");
        }

        public void AbrirConexao()
        {
            try
            {
                if (_conexao.State == System.Data.ConnectionState.Closed)
                    _conexao.Open();
            }
            catch(Exception ex)
            {

            }
        }

        public void FecharConexao()
        {
            try
            {
                if (_conexao.State == System.Data.ConnectionState.Open)
                    _conexao.Close();
            }
            catch (Exception ex)
            {

            }
        }

        public DataTable ExecutaConsulta(string query)
        {
            DataTable dtRetorno = new DataTable();
            try
            {
                AbrirConexao();
                _comando = new SqlCommand(query,_conexao);
                dtRetorno.Load(_comando.ExecuteReader());
            }
            catch(Exception)
            {
                FecharConexao();
            }
            finally
            {
                FecharConexao();
            }
            return dtRetorno;
        }

        public void executarInsertUpdate(string query)
        {
            try
            {
                AbrirConexao();
                _comando = new SqlCommand(query, _conexao);
                _comando.ExecuteNonQuery();
            }
            catch (Exception ex)
            {

                FecharConexao();
                throw new Exception(ex.Message);
            }
            finally
            {
                FecharConexao();
            }
        }

        public int executaSelectScalar(string query)
        {
            int retorno = 0;
            try
            {
                AbrirConexao();
                _comando = new SqlCommand(query, _conexao);
                retorno = int.Parse(_comando.ExecuteScalar().ToString());
            }
            catch
            {
                FecharConexao();
            }
            finally
            {
                FecharConexao();
            }

            return retorno;
        }
    }
}