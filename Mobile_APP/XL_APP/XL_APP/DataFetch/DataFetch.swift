//
//  DataFetch.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 19/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

//Codigo Criado por Roshan no link: https://github.com/rugoli/AVSwift
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
            //print(json)
            var dataKey: String? = nil
            for key in json.keys {
                if key != metadataKey {
                    dataKey = key
                    //print(dataKey)
                    break
                }
            }
            
            guard let timeSeriesKey = dataKey else {
                return
            }
            let timeSeries: [String: [String: String]] = json[timeSeriesKey]! as! [String : [String: String]]
            //print(timeSeries)
            let parsed: [TimeSerie] = timeSeries.flatMap({ key, value in
                var mutableDict = value
                mutableDict["date"] = key
                //print(mutableDict)
                do {
                    let element = try JSONDecoder().decode(TimeSerie.self, from: JSONSerialization.data(withJSONObject: mutableDict, options: .prettyPrinted))
                    //print(element)
                    return element
                } catch {
                    completion(nil, error)
                }
                return nil
            })
            completion(parsed, nil)
        } catch {
            completion(nil, error)
        }
    }
}
