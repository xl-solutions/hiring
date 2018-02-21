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

        let formated = String(format: "$%.2f", gain)
        self.gainLabel.text = "\(formated)"
    }
    
    func currentStock(){
        let url = StockURL(symbol: (portfolio?.symbol)!, function: Function.daily, outputSize: OutputSize.compact).returnURL()
        
        DataFetch<TimeSerie>(url: url).getResults(controller: self, completion: { (timeSeries, error) in
            // Ordernar pois o valor se desordena no final
            let tempArray = SortTimeSerie.sortByDate(timeSeries: timeSeries!)
            // Pegar o primeiro dado ordernado pois ele sera da data mais atual
            self.timeSerie = tempArray[0]
        })
        
    }
    
    //Calcular o valor das ações
    func estimateAcoes(timeSerie: TimeSerie) -> Double{
        return self.estimateOHLCAverage(timeSerie: timeSerie) * Double((self.portfolio?.qtdAcoes)!)
    }
    
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
    
    func estimateOHLCAverage(timeSerie: TimeSerie) -> Double{
        return (timeSerie.close + timeSerie.open + timeSerie.high + timeSerie.low)/4
    }
    
    // Calcular o ganho
    func estimateGain() -> Double{
        let calcPort = self.estimateAcoes(timeSerie: (self.portfolio?.timeSerie)!)
        let calcCurrent = self.estimateAcoes(timeSerie: self.timeSerie!)

        return calcCurrent - calcPort
    }
    
    

}
