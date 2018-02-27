using projeto.DAL;
using projeto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace projeto.core.DAL
{
    public class DalImportacao
    {
        private string _sql;
        private Conexao _conn;

        public string SQL { get; set; }

        public void insereImportacao(InfImportacao imp)
        {
            _conn = new Conexao();
            _sql = "insert into tb_importacao (imp_arquivo, imp_data_inicio) values ('" + imp.NomeArquivo + "',getdate())";
    
            _conn.executarInsertUpdate(_sql);

        }

        public bool verificaImportacaoJaExiste(string nomeArquivo)
        {
            bool jaExiste = false;
            _conn = new Conexao();
            _sql = "select count(*) as total from tb_importacao where imp_arquivo = '" + nomeArquivo+"'";
           
            if (_conn.executaSelectScalar(_sql) > 0)
            {
                jaExiste = true;
            }

            return jaExiste;

        }
    }
}
