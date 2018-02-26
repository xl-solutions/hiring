//
//  XL_APPTests.swift
//  XL_APPTests
//
//  Created by Everton Miranda Vitório on 21/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import XCTest
@testable import XL_APP

class XL_APPTests: XCTestCase {
    var portfolios: [Portfolio]!
    var timeSerie: TimeSerie!
    var portfolio: Portfolio!
    let doubleFixed = 105.2
    let intFixed = 300
    var nilDatePortfolio: Portfolio!

    override func setUp() {
        super.setUp()
        self.portfolios = PortfolioDAO.shared.selectPortfolio()
        self.timeSerie = TimeSerie(date: "2018-02-21", open: doubleFixed, high: doubleFixed, low: doubleFixed, close: doubleFixed, volume: 900)
        let nilDateTimeSerie = TimeSerie(date: "", open: doubleFixed, high: doubleFixed, low: doubleFixed, close: doubleFixed, volume: 900)
        self.nilDatePortfolio = Portfolio(symbol: "AAPL", timeSerie: nilDateTimeSerie, qtdAcoes: 500)
        self.portfolio = Portfolio(symbol: "AAPL", timeSerie: self.timeSerie, qtdAcoes: 500)
    }
    
    override func tearDown() {
        super.tearDown()

        self.portfolios = nil
        self.timeSerie = nil
        self.nilDatePortfolio = nil
        self.portfolio = nil
        
    }
  
    //MARK: Estimate Tests
    // Testa se o valor das ações é igual a multiplicação do doubleFixed e intFixed
    func testEstimateAcoes(){
        let estimate = Estimate.estimateAcoes(timeSerie: timeSerie, qtdAcoes: Double(intFixed))
        XCTAssertEqual(estimate, doubleFixed*Double(intFixed))
    }
    
    // Testar a função de media OHLC
    func testEstimateOHLC(){
       let estimate = Estimate.estimateOHLCAverage(timeSerie: self.timeSerie)
        XCTAssertEqual(estimate, doubleFixed)
    }
    
    // Testar se o ganho é igual a 0
    func testEstimateGain(){
        let estimate = Estimate.estimateGain(portifolio: self.portfolio, timeSerie: self.timeSerie)
        XCTAssertEqual(estimate, 0)
    }
    
    // Testar quantos dias se passou de uma tada para outra
    func testDaysPassed(){
        let day = DateEstimate.daysPassed(day1: DateFormat.stringToDate(date: "2008-07-29")!, day2: DateFormat.stringToDate(date: "2018-07-29")!)
        XCTAssertEqual(day, 3652)
    }
   
    //MARK: SQLIteTest
    func testPortfoliosLoad(){
        self.portfolios = PortfolioDAO.shared.selectPortfolio()
        XCTAssertNotNil(self.portfolios)
    }
    
    /*//Testa se o app está salvando normalmente
    func testPortfoliosSaved(){
        let count = self.portfolios.count
        PortfolioDAO.shared.insertPortfolio(portfolio: self.portfolio)
        
        self.portfolios = PortfolioDAO.shared.selectPortfolio()
        
        
        XCTAssertGreaterThan(self.portfolios.count, count)
    }*/
    
    // Testa se o app está inserindo e removendo normalmente
    func testPortfolioSavedAndRemoved(){
        var count = self.portfolios.count
        PortfolioDAO.shared.insertPortfolio(portfolio: self.portfolio)
        self.portfolios = PortfolioDAO.shared.selectPortfolio()
        XCTAssertGreaterThan(self.portfolios.count, count)
        
        count = self.portfolios.count
        let portfolio = self.portfolios[count-1]
        PortfolioDAO.shared.deleteByID(id: Int64(portfolio.id!))
        
        self.portfolios = PortfolioDAO.shared.selectPortfolio()
        
        
        XCTAssertGreaterThan(count, self.portfolios.count)
    }
    

    
    //MARK: DateFormat
    // Testa se a função dateToString funciona normalmente
    func testDateToString(){
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        let date = formatter.date(from: "2008-12-02")
        XCTAssertNotEqual(DateFormat.dateToString(date: date), "")
    }
    
    // Testa se a função stringToDate funciona normalmente
    func testStringToDate(){
        XCTAssertNotNil(DateFormat.stringToDate(date: "2008-12-02"))
    }
    
    //Testa se a função changeDateTime esta funcionando normalmente
    func testChangeDateTime(){
        let date = DateFormat.stringToDate(date: "2008-12-02")
        let date2 = DateFormat.changeDateTime(hour: 21, min: 59, sec: 59, date: date!)
        XCTAssertEqual(date2?.description, "2008-12-02 23:59:59 +0000")
    }
    
    //MARK: SortTimeSerie
    //Testa se a função sortTimeSerie funciona normalmente
    func testSortTimeSerie(){
        self.portfolios.append(self.nilDatePortfolio)
        var timeSeries = [TimeSerie]()
        for portfolio in self.portfolios{
            timeSeries.append(portfolio.timeSerie!)
        }
        timeSeries = SortTimeSerie.sortByDate(timeSeries: timeSeries)
        XCTAssertNotNil(timeSeries)
        
    }
    
    //MARK: Network
    // Testa a conexão
    func testNetworking(){
        let url = StockURL(symbol: "AAPL", function: Function.daily, outputSize: OutputSize.compact).returnURL()
        
        XCTAssertNotNil(url)

        DataFetch<TimeSerie>(url: url).getResults(controller: UIViewController(), completion: { (timeSeries, error) in
            XCTAssertNotNil(timeSeries)
            XCTAssertNil(error)
        })

    }
    
    
}
