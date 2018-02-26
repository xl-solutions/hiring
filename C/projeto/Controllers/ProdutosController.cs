using projeto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace projeto.Controllers
{
    public class ProdutosController : Controller
    {
        // GET: Produtos
        public ActionResult Index(int? id)
        {
           
            List<Models.Produtos> produtos = new List<Models.Produtos>();          

            
            if (Request.Form.Count > 0)
            {

                string parametroBusca = Request.Form["tbPesquisa"].ToString();

                if (!string.IsNullOrEmpty(parametroBusca))
                {
                    Produtos prod = new Produtos();
                    produtos = prod.SelecionarProdutos(parametroBusca);
                }

            }
            else {

                Produtos prod = new Produtos();
                produtos = prod.SelecionarProdutos("");
            }
            
         
            return View(produtos);
        }

      
   }
}