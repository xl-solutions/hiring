//
//  StockDate.swift
//  ChallengeHiringXL
//
//  Created by Gustavo Henrique on 22/02/18.
//  Copyright © 2018 Gustavo Henrique. All rights reserved.
//

import UIKit
import ObjectMapper

class StockDate: NSObject, Mappable {

    var date: String?
    var timeSeries : [TimeSeries]?
    
    override init() {
        super.init()
        self.date = ""
        self.timeSeries = [TimeSeries]()
    }
    
    required init?(map: Map) {
        
    }
    
    func mapping(map: Map) {
        
    
    }
}
