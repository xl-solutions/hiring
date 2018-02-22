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
    
    static func getStocks(completionHandler completion :@escaping (_ symbols : [(String,Double)]? ) -> Void) {
        
        let url = URLAddress.urlWithEndPoint(.intraDay) + StockSingleton.sharedInstance.api_key
        
        Alamofire.request(url, method: .get, parameters: nil, encoding: JSONEncoding(), headers: nil).responseJSON { (data) in
                
            if data.result.isFailure {
                completion(nil)
            }else{
                
                if data.response?.statusCode == 200 {
                    
                    print(data.result.value)
                    
                }
            }
        }
    }
}
