//
//  TimeSeries.swift
//  ChallengeHiringXL
//
//  Created by Gustavo Henrique on 22/02/18.
//  Copyright © 2018 Gustavo Henrique. All rights reserved.
//

import UIKit
import ObjectMapper

class TimeSeries: NSObject, Mappable {
    
    var open : String?
    var high : String?
    var low : String?
    var close: String?
    var volume : Double?
    
    
    override init() {
        super.init()
        self.open = ""
        self.high = ""
        self.low = ""
        self.close = ""
        self.volume = 0.0
    
    }
    
    required init?(map: Map) {}
    
    func mapping(map: Map) {
        open <- map["1. open"]
        high <- map["2. high"]
        low <- map["3. low"]
        close <- map["4. close"]
        volume <- map["5. volume"]
    
    }
    
    
    
    
    
}

