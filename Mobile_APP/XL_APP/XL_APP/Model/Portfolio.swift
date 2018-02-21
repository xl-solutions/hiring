//
//  Portfolio.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 19/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

class Portfolio: NSObject {
    var id: Int?
    var timeSerie: TimeSerie?
    var qtdAcoes: Int?
    var symbol: String?
    init(symbol: String,timeSerie: TimeSerie, qtdAcoes: Int) {
        self.symbol = symbol
        self.timeSerie = timeSerie
        self.qtdAcoes = qtdAcoes
        
    }
    
    init(id: Int, symbol: String, timeSerie: TimeSerie, qtdAcoes: Int) {
        self.id = id
        self.symbol = symbol
        self.timeSerie = timeSerie
        self.qtdAcoes = qtdAcoes
        
    }
    
    func description(for object: Any) -> String {
        var descriptionString = "\n"
        let objectMirror = Mirror(reflecting: object)
        for child in objectMirror.children {
            if let propertyName = child.label {
                descriptionString += "\n\(propertyName): \(child.value)"
            }
        }
        return descriptionString
    }
    
    
}
