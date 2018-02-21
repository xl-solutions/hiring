//
//  PortfolioSearchViewController.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 19/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

class PortfolioSearchViewController: UIViewController {
    @IBOutlet weak var symbolText: UITextField!
    @IBOutlet weak var functionSegment: UISegmentedControl!
    @IBOutlet weak var sizeSegment: UISegmentedControl!
    @IBOutlet weak var datePicker: UIDatePicker!
    @IBOutlet weak var functionDescription: UITextView!
    @IBOutlet weak var sizeDescription: UITextView!
    
    @IBOutlet weak var valorText: UITextField!
    // Opção da Function da pesquisa
    var function: Function?
    // Opção do OutputSize da pesquisa
    var size: OutputSize?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.function = .daily
        self.size = .full
        self.datePicker.maximumDate = Date()
    }
    
    @IBAction func functionSelected(_ sender: UISegmentedControl) {
        
        switch  sender.selectedSegmentIndex{
        case 0:
            functionDescription.text = "Diaria irá fazer uma busca mais completa com maior chance de achar o valor no dia especifico, porem pode deixara a busca mais lenta."
            //Seta a function para daily
            self.function = .daily
            break
        case 1:
            functionDescription.text = "Semanal fará uma busca de semana em semana até no maximo de 20 anos atrás. A busca pode ficar um pouco lenta."
            // Seta a function para weekly
            self.function = .weekly
            break
            
        default:
            functionDescription.text = "Mensal fará uma busca de mês em mês até no maximo de 20 anos. A busca será menos lenta que a anterior."
            //Seta a function para monthly
            self.function = .monthly
        }
    }

    
    @IBAction func sizeChanged(_ sender: UISegmentedControl) {
        switch  sender.selectedSegmentIndex{
        case 0:
            sizeDescription.text = "Completo tem uma chance alta de encontrar a ação no dia requerido, porem a pesquisa pode ficar muito lenta."
            // Seta o OutputSize para full
            self.size = .full
            break
        default:
            sizeDescription.text = "Compacto tem uma chance pequena (no maximo 100 itens serão encontrados) de encontrar a ação no dia requerido, porem a pesquisa pode ser mais rapida."
            // Seta o OutputSize para compact
            self.size = .compact
        }
    }
    
    @IBAction func done(_ sender: UIBarButtonItem) {
        UIApplication.shared.isNetworkActivityIndicatorVisible = true
        self.savePortfolio()
        UIApplication.shared.isNetworkActivityIndicatorVisible = false
    }
    
    
    
    func savePortfolio(){
        if let symbol = self.symbolText.text?.trimmingCharacters(in: .whitespacesAndNewlines) {
            if(symbol != ""){
                // Cria uma url de acordo com os dados fornecidos
                let url = StockURL(symbol: symbol, function: self.function!, outputSize: self.size!).returnURL()
                // Verifica se o valor informado é um Double valido
                if let valor = Double(self.valorText.text!){
                    if valor > 0{
                        // Pega e decodifica os dados da API para um array de TimeSerie
                        self.dataFetch(url: url, valor: valor, symbol: symbol)
                    }else{
                        Alert.alert(titulo: "", mensagem: "Valor da ação deve ser maior que 0!", popView: false, viewController: self)
                    }
                    
                    
                }else{
                    Alert.alert(titulo: "", mensagem: "Valor da ação invalido!", popView: false, viewController: self)
                }
            }
        }
        
        
    }
    
    func dataFetch(url: URL, valor: Double, symbol: String){
        var flagDate = false
        DataFetch<TimeSerie>(url: url).getResults(controller: self) { (timeSeries, error) in
            //Verifica se foi possivel fazer o decode do TimeSeries da API
            if timeSeries != nil{
                for timeSerie in timeSeries! {
                    // Verifica se existe alguma ação com a data desejada pelo usuario
                    if timeSerie.date == DateFormat.dateToString(date: self.datePicker.date){
                        flagDate = true
                        // Se existir salva no portfolio
                        let portfolio = Portfolio(symbol: symbol.uppercased(),timeSerie: timeSerie, valorDaAcao: valor)

                        //Salva a ação no array de Portifolio da Singleton Portfolios
                        //Portfolios.shared.portfolios?.append(portfolio)
                        PortfolioDAO.shared.insertPortfolio(portfolio: portfolio)
                        //Volta para a tela anterior
                        self.navigationController?.popViewController(animated: true)
                    }
                    
                }
                // caso nenhum ação na data desejada seja encontrada informa o usuario.
                if !flagDate{
                    Alert.alert(titulo: "", mensagem: "Nenhuma ação na data informada encontrada!", popView: false, viewController: self)
                }
            }else{
                Alert.alert(titulo: "", mensagem: "Não foi possivel achar a ação desejada!", popView: false, viewController: self)
            }
        }
        
    }
    

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        
    }
    
    
}
