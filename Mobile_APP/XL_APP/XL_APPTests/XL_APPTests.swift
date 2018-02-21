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

    override func setUp() {
        super.setUp()
        self.portfolios = PortfolioDAO.shared.selectPortfolio()
        self.timeSerie = TimeSerie(date: "2018-02-21", open: doubleFixed, high: doubleFixed, low: doubleFixed, close: doubleFixed, volume: 900)
        self.portfolio = Portfolio(symbol: "AAPL", timeSerie: self.timeSerie, qtdAcoes: 500)
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()

        self.portfolios = nil
        
    }
  
    //MARK: Estimate Tests
    func testEstimateAcoes(){
        let estimate = Estimate.estimateAcoes(timeSerie: timeSerie, qtdAcoes: Double(intFixed))
        XCTAssertEqual(estimate, doubleFixed*Double(intFixed))
    }
    
    func testEstimateOHLC(){
       let estimate = Estimate.estimateOHLCAverage(timeSerie: self.timeSerie)
        XCTAssertEqual(estimate, doubleFixed)
    }
    
    func testPortfoliosLoad(){
        self.portfolios = PortfolioDAO.shared.selectPortfolio()
        XCTAssertNotNil(self.portfolios)
    }
    
    
    //MARK: SQLIteTest
    //Testa se o app está salvando normalmente
    func testPortfoliosSaved(){
        let count = self.portfolios.count
        PortfolioDAO.shared.insertPortfolio(portfolio: self.portfolio)
        self.portfolios = PortfolioDAO.shared.selectPortfolio()
        XCTAssertGreaterThan(self.portfolios.count, count)
    }
    
    // Testa se o app está reomovendo normalmente
    func testPortfolioRemoved(){
        let count = self.portfolios.count
        let portfolio = self.portfolios[count-1]
        PortfolioDAO.shared.deleteByID(id: Int64(portfolio.id!))
        self.portfolios = PortfolioDAO.shared.selectPortfolio()
        XCTAssertGreaterThan(count, self.portfolios.count)
    }
    
    func testPerformanceExample() {
        // This is an example of a performance test case.
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }
    
}
