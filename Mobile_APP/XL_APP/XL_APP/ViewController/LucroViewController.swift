//
//  LucroViewController.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 21/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

class LucroViewController: UIViewController {

    @IBOutlet weak var symbolLabel: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var acaoLabel: UILabel!
    @IBOutlet weak var lucroLabel: UILabel!
    var portfolio: Portfolio?
    var timeSerie: TimeSerie?
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        if let portfolio = portfolio{
            self.symbolLabel.text = "\(portfolio.symbol!)"
            self.dateLabel.text = portfolio.timeSerie?.date
            let formarter = SimpleNumberFormarter.format2Digits()
            let numberFormated = formarter.string(for: portfolio.valorDaAcao!)
            self.acaoLabel.text = "Valor da ação $\(numberFormated!)"
        }
        self.currentStock()
    }
    
    func currentStock(){
        let url = StockURL(symbol: (portfolio?.symbol)!, function: Function.daily, outputSize: OutputSize.compact).returnURL()
        
        DataFetch<TimeSerie>(url: url).getResults(controller: self, completion: { (timeSeries, error) in
            let tempArray = SortTimeSerie.sortByDate(timeSeries: timeSeries!)
            self.timeSerie = tempArray[0]
        })
        
    }
    
    

}
