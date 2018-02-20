//
//  DataFetch.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 19/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

//Codigo Criado por Roshan no link: https://github.com/rugoli/AVSwift, com modificações para validar alguns dados
class DataFetch<TimeSerie: Decodable>: NSObject {
    let url: URL
    fileprivate let metadataKey: String = "Metadata"
    
    public init(url: URL) {
        self.url = url
        
        super.init()
    }
    
    public func getResults(completion: ([TimeSerie]?, Error?) -> Void) {
        do {

            let data = try Data.init(contentsOf: url)
            let json = try JSONSerialization.jsonObject(with: data, options: .mutableLeaves) as! [String: Any]
            var dataKey: String? = nil
            for key in json.keys {
                if key != metadataKey {
                    dataKey = key
                    break
                }
            }
            guard let timeSeriesKey = dataKey else {
                return
            }
            if json["Error Message"] != nil {
                print(json["Error Message"]!)
            }else{
                let timeSeries: [String: [String: String]] = json[timeSeriesKey]! as! [String : [String: String]]
                let parsed: [TimeSerie] = timeSeries.flatMap({ key, value in
                    var mutableDict = value
                    mutableDict["date"] = key
                    do {
                        
                        let element = try JSONDecoder().decode(TimeSerie.self, from: JSONSerialization.data(withJSONObject: mutableDict, options: .prettyPrinted))
                        return element
                    } catch {
                        completion(nil, error)
                    }
                    return nil
                })
                completion(parsed, nil)
            }
        } catch {
            completion(nil, error)
        }
    }
}
