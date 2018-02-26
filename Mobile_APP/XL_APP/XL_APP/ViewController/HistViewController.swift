//
//  HistViewController.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 22/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

class HistViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    @IBOutlet weak var histTableView: UITableView!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var symbolLabel: UILabel!
    var toDate: Date!
    var fromDate: Date!
    var portfolio: Portfolio!
    var timeSeries: [TimeSerie]?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.histTableView.tableFooterView = UIView()
        self.dateLabel.text = self.portfolio.timeSerie?.date
        self.symbolLabel.text = self.portfolio.symbol
        self.histTableView.delegate = self
        self.histTableView.dataSource = self
        self.timeSeries = []
        self.loadHistTimeSerie()
        self.timeSeries = SortTimeSerie.sortByDate(timeSeries: self.timeSeries!)
    }
    
    //Define se sera uma busca compact ou full
    func histSize() -> OutputSize{
        let days = DateEstimate.daysPassed(day1: self.fromDate, day2: self.toDate)
        if days != nil{
            if days! < 100{
                return OutputSize.compact
            }
        }
        return OutputSize.full
    }
    
    // Carregar dados de acordo com a data pedida
    func loadHistTimeSerie(){
        let url = StockURL(symbol: portfolio.symbol!, function: Function.daily, outputSize: histSize()).returnURL()
        
        DataFetch<TimeSerie>(url: url).getResults(controller: self, completion: { (timeSeries, error) in
            
            if timeSeries != nil{
                for timeSerie in timeSeries!{
                    if let date = DateFormat.stringToDate(date: timeSerie.date){
                        // Se a data for de acordo com a especificada sera salva no array do historico
                        if date >= self.fromDate && date <= toDate{
                            self.timeSeries?.append(timeSerie)
                        }
                    }
                }
            }
        })
        
    }
    
    //MARK: Table View
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return (timeSeries?.count)!
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: Storyboard.histCell, for: indexPath)
        let timeSerie = self.timeSeries![indexPath.row]
        cell.textLabel?.text = "\(timeSerie.date)"
        cell.detailTextLabel?.text = String(format: "Lucro: $%.2f", Estimate.estimateGain(portifolio: self.portfolio, timeSerie: timeSerie))
        return cell
        
    }


}
