//
//  LucroViewController.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 21/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

class GainViewController: UIViewController {

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
        let gain = self.estimateGain()
        self.chanceGainLabelColor(gain: gain)
        let formater = SimpleNumberFormarter.format2Digits()
        let formated = formater.number(from: "\(gain)")
        self.gainLabel.text = "$\(formated!)"
    }
    
    func currentStock(){
        let url = StockURL(symbol: (portfolio?.symbol)!, function: Function.daily, outputSize: OutputSize.compact).returnURL()
        
        DataFetch<TimeSerie>(url: url).getResults(controller: self, completion: { (timeSeries, error) in
            let tempArray = SortTimeSerie.sortByDate(timeSeries: timeSeries!)
            self.timeSerie = tempArray[0]
        })
        
    }
    
    func estimateAcoes(timeSerie: TimeSerie) -> Double{
        return timeSerie.open * Double((self.portfolio?.qtdAcoes)!)
    }
    
    func chanceGainLabelColor(gain: Double){
        if gain > 0{
            self.gainLabel.textColor = UIColor.green
        }else if gain < 0{
            self.gainLabel.textColor = UIColor.red
        }else{
            self.gainLabel.textColor = UIColor.blue
        }
    }
    
    func estimateGain() -> Double{
        let calcPort = self.estimateAcoes(timeSerie: (self.portfolio?.timeSerie)!)
        print(calcPort)
        let calcCurrent = self.estimateAcoes(timeSerie: self.timeSerie!)
        print(calcCurrent)
        return calcPort - calcCurrent
    }
    
    

}
