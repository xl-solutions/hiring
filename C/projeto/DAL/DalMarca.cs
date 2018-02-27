using projeto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace projeto.DAL
{
    public class DalMarca
    {
        private Conexao _conn;

        public DalMarca()
        {
            _conn = new Conexao();
        }

        public void insereMarca(Marcas objInfo)
        {
            string _sql = "insert into tb_marcas(nome_marca) values('"+objInfo.Nome+"')";
            _conn.executarInsertUpdate(_sql);
        }

        public int verificaMarcaExiste(string nome)
        {
            int codigo = 0;

            string _sql = "select id_marca from tb_marcas where nome_marca = '" + nome + "'";
            codigo = _conn.executaSelectScalar(_sql);

            return codigo;
        }


    }
}