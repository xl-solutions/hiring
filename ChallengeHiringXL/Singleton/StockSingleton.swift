//
//  StockSingleton.swift
//  ChallengeHiringXL
//
//  Created by Gustavo Henrique on 20/02/18.
//  Copyright © 2018 Gustavo Henrique. All rights reserved.
//

import UIKit

class StockSingleton: NSObject {

    static let sharedInstance = StockSingleton()
    
    let api_key = "CIA35QCJ8EXZ4340"
    var stock : Stock?
    var choosedSymbol : String = ""
    
    
    func setStock(newStock: Stock) {
        self.stock = newStock
    }
    
    func setSymbol(symbol: String) {
        self.choosedSymbol = symbol
    }
    
    
    
    
    
    
}
