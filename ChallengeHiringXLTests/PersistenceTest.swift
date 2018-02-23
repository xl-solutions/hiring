//
//  ChallengeHiringXLTests.swift
//  ChallengeHiringXLTests
//
//  Created by Gustavo Henrique on 20/02/18.
//  Copyright © 2018 Gustavo Henrique. All rights reserved.
//

import XCTest

@testable import ChallengeHiringXL

class PersistenceTest: XCTestCase {
    
    func testGetChartInfo() {
        
        var expectedStock : Stock?
        let expec = expectation(description: "Request return")
        
        
        
        StocksPersistence.getStockForSymbol(symbol: "MSFT") { (stock) in
            
            if stock != nil {
                expectedStock = stock
                expec.fulfill()
            }
        }
        
        waitForExpectations(timeout: 10.0) { (error) in
            XCTAssert(expectedStock != nil)
        }
    }
    
}
