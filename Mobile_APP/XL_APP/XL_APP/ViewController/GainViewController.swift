//
//  LucroViewController.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 21/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

class GainViewController: UIViewController {

    @IBOutlet weak var lucroDate: UILabel!
    @IBOutlet weak var symbolLabel: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var acaoLabel: UILabel!
    @IBOutlet weak var gainLabel: UILabel!
    var portfolio: Portfolio?
    var timeSerie: TimeSerie?
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        if let portfolio = portfolio{
            self.symbolLabel.text = "\(portfolio.symbol!)"
            self.dateLabel.text = portfolio.timeSerie?.date
            self.acaoLabel.text = "Quantidade de ações: \(portfolio.qtdAcoes!)"
        }
        self.currentStock()
        let gain = Estimate.estimateGain(portifolio: self.portfolio, timeSerie: self.timeSerie)
        self.chanceGainLabelColor(gain: gain)
        if self.timeSerie != nil{
//            let date = DateFormat.stringToDate(date: (self.timeSerie?.date)!)
            self.lucroDate.text = "Lucro do dia \((self.timeSerie?.date)!)"
        }

        let formated = String(format: "$%.2f", gain)
        self.gainLabel.text = "\(formated)"
    }
    
    
    //MARK: DATA MANIPULATION
    func currentStock(){
        let url = StockURL(symbol: (portfolio?.symbol)!, function: Function.daily, outputSize: OutputSize.compact).returnURL()
        
        DataFetch<TimeSerie>(url: url).getResults(controller: self, completion: { (timeSeries, error) in
            // Ordernar pois o valor se desordena no final
            if timeSeries != nil{
                let tempArray = SortTimeSerie.sortByDate(timeSeries: timeSeries!)
                // Pegar o primeiro dado ordernado pois ele sera da data mais atual
                self.timeSerie = tempArray[0]
            }
            
        })
        
    }
    
    
    // MARK: Label Color Change
    // Mudar a cor do GainLabel de acordo se o lucro é negativo positivo ou neutro
    func chanceGainLabelColor(gain: Double){
        if gain > 0{
            self.gainLabel.textColor = UIColor.green
        }else if gain < 0{
            self.gainLabel.textColor = UIColor.red
        // gain == 0
        }else{
            self.gainLabel.textColor = UIColor.blue
        }
    }
    
    //MARK: Segue
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == Storyboard.dateHistSegue{
            if let dateHistVC = segue.destination as? DateHistViewController{
                
                dateHistVC.portfolio = self.portfolio
            }
        }

    }

}
