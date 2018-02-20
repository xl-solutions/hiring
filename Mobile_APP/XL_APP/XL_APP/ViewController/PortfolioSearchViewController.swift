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
    var function: Function?
    var size: OutputSize?
    var portfolio: Portfolio?
    override func viewDidLoad() {
        super.viewDidLoad()
        self.function = .daily
        self.size = .full
//        print(formaterDate())
    }
    
    @IBAction func functionSelected(_ sender: UISegmentedControl) {

        switch  sender.selectedSegmentIndex{
        case 0:
            functionDescription.text = "Diaria irá fazer uma busca mais completa com maior chance de achar o valor no dia especifico, porem pode deixara a busca mais lenta."
            self.function = .daily
            break
        case 1:
            functionDescription.text = "Semanal fará uma busca de semana em semana até no maximo de 20 anos atrás. A busca pode ficar um pouco lenta."
            self.function = .weekly
            break
            
        default:
            functionDescription.text = "Mensal fará uma busca de mês em mês até no maximo de 20 anos. A busca será menos lenta que a anterior."
            self.function = .monthly
        }
    }
    func formaterDate() -> String{
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        

        return formatter.string(from: datePicker.date)
    }
    
    
    @IBAction func sizeChanged(_ sender: UISegmentedControl) {
        switch  sender.selectedSegmentIndex{
        case 0:
            sizeDescription.text = "Completo tem uma chance alta de encontrar a ação no dia requerido, porem a pesquisa pode ficar muito lenta."
            self.size = .full
            break
        default:
            sizeDescription.text = "Compacto tem uma chance pequena (no maximo 100 itens serão encontrados) de encontrar a ação no dia requerido, porem a pesquisa pode ser mais rapida."
            self.size = .compact
        }
    }
    
    @IBAction func done(_ sender: UIBarButtonItem) {
        UIApplication.shared.isNetworkActivityIndicatorVisible = true
        
        self.savePortfolio()
        UIApplication.shared.isNetworkActivityIndicatorVisible = false
    }
    
    
    
    func savePortfolio(){
        let url = StockURL(symbol: self.symbolText.text!, function: self.function!, outputSize: self.size!).returnURL()
        print(url)
        DataFetch<TimeSerie>(url: url).getResults { (timeSeries, error) in
            print(error)
            if timeSeries != nil{
                for timeSerie in timeSeries! {
                   
                    if timeSerie.date == self.formaterDate(){
                        if let valor = Double(self.valorText.text!){
                            self.portfolio = Portfolio(timeSerie: timeSerie, valorDaAcao: valor)
                            print(self.portfolio?.valorDaAcao)
                            
                        }else{
                            print("VALOR INVALIDO!")
                        }

                        print("Igual")
                    }
                }
            }
            
        }
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        
    }


}
