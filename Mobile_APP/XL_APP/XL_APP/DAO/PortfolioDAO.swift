//
//  PortfolioDAO.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 20/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit
import SQLite

class PortfolioDAO: NSObject {
    static let shared = PortfolioDAO()
    private let portfolioT = Table("Portfolio")
    override init() {
        ConnectDAO.shared.createTable()
        
    }
    func insertPortfolio(portfolio: Portfolio){
        do{
            
            if let timeSerie = portfolio.timeSerie{
                try ConnectDAO.shared.db?.run(portfolioT.insert(Columns.symbol <- portfolio.symbol!, Columns.date <- timeSerie.date, Columns.open <- timeSerie.open, Columns.high <- timeSerie.high, Columns.low <- timeSerie.low, Columns.close <- timeSerie.close, Columns.volume <- Int64(timeSerie.volume),Columns.valorAcao <- portfolio.valorDaAcao!))
            }
            
        }catch{
            
        }
    }
    
    func selectPortfolio(){

        do{
            for portfolioRow in (try ConnectDAO.shared.db?.prepare(portfolioT))! {
                let timeSerie = TimeSerie(date: portfolioRow[Columns.date], open: portfolioRow[Columns.open], high: portfolioRow[Columns.high], low: portfolioRow[Columns.low], close: portfolioRow[Columns.close], volume: Int(portfolioRow[Columns.volume]))
                let portfolio = Portfolio(id: Int(portfolioRow[Columns.id]), symbol: portfolioRow[Columns.symbol], timeSerie: timeSerie, valorDaAcao: portfolioRow[Columns.valorAcao])

                Portfolios.shared.portfolios?.append(portfolio)
                
            }
        }catch{
            
        }

    }

}
