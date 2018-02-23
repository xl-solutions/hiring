//
//  StocksPersistence.swift
//  ChallengeHiringXL
//
//  Created by Gustavo Henrique on 20/02/18.
//  Copyright © 2018 Gustavo Henrique. All rights reserved.
//

import UIKit
import Alamofire
import ObjectMapper

class StocksPersistence: NSObject {
    
    static func getStockForSymbol(symbol: String, completionHandler completion :@escaping (_ symbol : Stock? ) -> Void) {
        
        let url = URLAddress.urlWithEndPoint(.intraDay)+symbol+"&interval=1min&apikey="+StockSingleton.sharedInstance.api_key
        
        print(url)
        
        Alamofire.request(url, method: .get, parameters: nil, encoding: JSONEncoding(), headers: nil).responseJSON { (data) in
            
            if data.result.isFailure {
                completion(nil)
            }else{
                
                if data.response?.statusCode == 200 {
                    
                    if let jsonResult = data.result.value as? [String: Any] {
                        
                        if let metaData = jsonResult["Meta Data"] as? [String : Any] {
                            let stock = Stock(information: metaData["1. Information"] as! String,
                                              symbol: metaData["2. Symbol"] as! String,
                                              lastRefreshed: metaData["3. Last Refreshed"] as! String,
                                              interval:metaData["4. Interval"] as! String,
                                              timezone: metaData["6. Time Zone"] as! String)
                            completion(stock)
                            
                        } else {
                            completion(nil)
                        }
                    } else {
                        completion(nil)
                    }
                }
            }
        }
    }
}
