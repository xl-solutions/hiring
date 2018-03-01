using LojaVirtual.Models;
using LojaVirtual.Repositorio;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace LojaVirtual.Controllers
{
    public class HomeController : Controller
    {
        private ImportarProdutosRepositorio _repositorio;
        private ProdutoRepositorio _repositorioProduto;

        // GET: Home
        public ActionResult Index()
        {
            return View(new List<ImportarProdutoModel>());
        }

        [HttpPost]
        public ActionResult Index(HttpPostedFileBase postedFile)
        {
            List<ImportarProdutoModel> importar = new List<ImportarProdutoModel>();
            string filePath = string.Empty;
            bool erro = false;
            StringBuilder msg = new StringBuilder();

            if (postedFile != null)
            {
                string path = Server.MapPath("~/Uploads/");

                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                filePath = string.Format("{0}{1}", path, Path.GetFileName(postedFile.FileName));
                string ext = Path.GetExtension(postedFile.FileName);

                postedFile.SaveAs(filePath);

                string cvsData = System.IO.File.ReadAllText(filePath);
                
                int linha = 1;

                ImportarProdutoModel prodModel = new ImportarProdutoModel();
                foreach (string row in cvsData.Split('\n'))
                {
                    if (!string.IsNullOrEmpty(row))
                    {
                        if (row.Split(',')[0] != "manufacturer")
                        {
                            prodModel = new ImportarProdutoModel();
                            try
                            {
                                if (row.Split(',').Length < 6)
                                {
                                    prodModel.MensagemErro = String.Format("Inválido. Interface esperando 6 campos, foram informados apenas {0} - Linha {1}.",row.Split(',').Length, linha);                                    
                                    erro = true;
                                }
                                else
                                {
                                    prodModel.Fabricante = row.Split(',')[0];
                                    prodModel.Modelo = row.Split(',')[1];
                                    prodModel.Cor = row.Split(',')[2];
                                    prodModel.PlanoVenda = row.Split(',')[3];
                                    prodModel.Quantidade = Convert.ToInt32(row.Split(',')[4]);
                                    prodModel.Preco = Convert.ToDecimal(row.Split(',')[5]);
                                    prodModel.MensagemErro = "Válido";

                                }

                            }
                            catch (Exception ex)
                            {
                                prodModel.MensagemErro = msg.ToString();
                                erro = true;
                            }
                            
                            importar.Add(prodModel);
                        }
                        linha++;
                    }
                }

                if (!erro)
                {
                    foreach (ImportarProdutoModel prod in importar)
                    {
                        ImportarProdutos(prod);
                    }
                }
            }
            if (erro)
            {
                ViewBag.Message = "Arquivo não pode ser processado, pois contem informações inválidas.";
                return View(importar);
            }
            else
                return RedirectToAction("Index", "Produtos");

        }

        [HttpPost]
        public ActionResult ImportarProdutos(ImportarProdutoModel importarProdutoObj)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _repositorio = new ImportarProdutosRepositorio();

                    if (_repositorio.ImportarProdutos(importarProdutoObj))
                    {
                        ViewBag.Mensagem = "Arquivo importado com Sucesso!";
                    }
                }
            }
            catch (Exception ex)
            {
                ViewBag.Mensagem = "Erro ao importar o Arquivo: " + ex.Message;
            }
            return View();
        }



    }
}