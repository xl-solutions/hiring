//
//  StockSearch.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 19/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

class StockURL: NSObject {
    var symbol: String?
    open var function: Function
    open var outputSize: OutputSize
    enum Function: String, CodingKey {
        case daily = "TIME_SERIES_DAILY"
        case weekly = "TIME_SERIES_WEEKLY"
        case monthly = "TIME_SERIES_MONTHLY"
    }
    enum OutputSize:  String {
        case compact = "compact"
        case full = "full"
    }
    
    init(symbol: String, function: Function, outputSize: OutputSize) {
        self.symbol = symbol
        self.function = function
        self.outputSize = outputSize
    }
    
    func returnURL() -> URL{
        return URL(string: "https://www.alphavantage.co/query?function=\(function.rawValue)&symbol=\(symbol!)&outputsize=\(outputSize)&apikey=\(AVKey.shared.key)")!
    }

}
