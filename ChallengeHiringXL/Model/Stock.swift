//
//  Stock.swift
//  ChallengeHiringXL
//
//  Created by Gustavo Henrique on 20/02/18.
//  Copyright © 2018 Gustavo Henrique. All rights reserved.
//

import UIKit
import ObjectMapper

class Stock: NSObject, Mappable {

    var information : String?
    var symbol : String?
    var lastRefreshed : String?
    var interval : String?
    var timezone : String?
    
    override init() {
        super.init()
        self.information = ""
        self.symbol = ""
        self.lastRefreshed = ""
        self.interval = ""
        self.timezone = ""
    
    }
    
    init(information: String, symbol: String, lastRefreshed: String,interval: String, timezone: String) {
        
        self.information = information
        self.symbol = symbol
        self.lastRefreshed = lastRefreshed
        self.timezone = timezone
        self.interval = interval
    }
    
    
    required init?(map: Map) {}
    
    func mapping(map: Map) {
        
        information <- map["1. Information"]
        symbol <- map["2. Symbol"]
        lastRefreshed <- map["3. Last Refreshed"]
        interval <- map["4. Interval"]
        timezone <- map["6. Time Zone"]
        
    }
    
    
    
    
    
}
