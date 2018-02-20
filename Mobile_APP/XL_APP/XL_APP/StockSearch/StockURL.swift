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
    
    
    
    init(symbol: String, function: Function, outputSize: OutputSize) {
        self.symbol = symbol
        self.function = function
        self.outputSize = outputSize
    }
    
    // Cria uma url de acordo com os dados fornecidos no objeto
    func returnURL() -> URL{
        return URL(string: "https://www.alphavantage.co/query?function=\(function.rawValue)&symbol=\(symbol!)&outputsize=\(outputSize)&apikey=\(Constants.key)")!
    }

}
