using projeto.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace projeto.DAL
{
    public class DalProduto
    {
        Conexao _conexao;

        public DalProduto()
        {
            _conexao = new Conexao();
        }
        public void insereProduto(Produtos prod)
        {
            string _sql = "";
            _sql = "insert into tb_produtos (pro_nome, pro_valor, pro_quantidade,  pro_cor,pro_tipo_plano, pro_marca) values ('" + prod.NomeProduto + "'," + prod.Valor.ToString().Replace(",",".") + "," + prod.Quantidade + ",'" + prod.CorProduto + "','"+prod.TipoPlano+"',"+prod.Marca+")";

            _conexao.executarInsertUpdate(_sql);

        }

        public void atualizaProduto(Produtos prod)
        {
            string _sql = "";
            _sql = "update tb_produtos set pro_valor = " + prod.Valor + ", pro_quantidade = " + prod.Quantidade + ",  pro_unidade = '" + prod.Unidade + "', pro_cor = '"+prod.CorProduto+"', pro_tipo_plano=  '"+prod.TipoPlano+"', pro_marca = "+prod.Marca+" where pro_id = " + prod.ID;

            _conexao.executarInsertUpdate(_sql);

        }


        public int verificaProdutoExiste(Produtos prod)
        {
            string _sql = "";
            int codigoProduto = 0;
            _sql = "select pro_id from tb_produtos where pro_nome = '" + prod.NomeProduto + "' and pro_cor = '"+prod.CorProduto+"' and pro_tipo_plano = '"+prod.TipoPlano+"' and pro_valor = '"+prod.Valor+"' ";

            codigoProduto = int.Parse(_conexao.executaSelectScalar(_sql).ToString());
            return codigoProduto;

        }

        public List<Produtos> SelecionarProdutos(string nomeProduto)
        {
            string _query = string.Empty;

            if (string.IsNullOrEmpty(nomeProduto))
                _query = "select pro.*, mar.nome_marca from tb_produtos pro inner join tb_marcas mar on mar.id_marca = pro.pro_marca ";
            else
                _query = "select  pro.*, mar.nome_marca from tb_produtos pro inner join tb_marcas mar on mar.id_marca = pro.pro_marca where pro_nome like '%" + nomeProduto+"%'";

            DataTable dtRetorno = new DataTable();
            dtRetorno = _conexao.ExecutaConsulta(_query);
            List<Produtos> listaProdutos = new List<Produtos>();

            foreach (DataRow dr in dtRetorno.Rows)
            {
                listaProdutos.Add(
                    new Produtos
                    {
                        ID = Convert.ToInt32(dr["pro_id"]),
                        NomeProduto = Convert.ToString(dr["pro_nome"]),
                        Quantidade = Convert.ToInt32(dr["pro_quantidade"]),
                        Valor = Convert.ToDecimal(dr["pro_valor"]),                        
                        ValorTotal = (Convert.ToInt32(dr["pro_quantidade"]) *  Convert.ToDecimal(dr["pro_valor"])),
                        CorProduto= Convert.ToString(dr["pro_cor"]),
                        TipoPlano= Convert.ToString(dr["pro_tipo_plano"]),
                        Marca = Convert.ToInt32(dr["pro_marca"])
                        
                    });
            }
            return listaProdutos;

        }
    }
}