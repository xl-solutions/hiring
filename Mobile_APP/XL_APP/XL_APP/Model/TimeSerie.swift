//
//  TimeSerie.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 19/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

enum ModelError: Error {
    case parsingError(error: String)
}

protocol TimeSerieDescription {
    func description(for: Any) -> String
}

public final class TimeSerie: CustomStringConvertible, TimeSerieDescription {
    
    
    
    let date: String
    let open: Float
    let high: Float
    let low: Float
    let close: Float
    let volume: Int
    
    required public init(date: String,open: Float,high: Float,low: Float,close: Float,volume: Int) {
        self.date = date
        self.open = open
        self.high = high
        self.low = low
        self.close = close
        self.volume = volume
    }
    public var description: String {
        return self.description(for: self)
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
extension TimeSerie: Decodable{
    enum AVHistoricalStockPriceModelKeys: String, CodingKey {
        case date = "date"
        case open = "1. open"
        case high = "2. high"
        case low = "3. low"
        case close = "4. close"
        case volume = "5. volume"
    }
    
    public convenience init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: AVHistoricalStockPriceModelKeys.self) // defining our (keyed) container
        do {
            let date: String = try container.decode(String.self, forKey: .date)
            //let date = try dateString.toDate()
            let open: String = try container.decode(String.self, forKey: .open)
            let high: String = try container.decode(String.self, forKey: .high)
            let low: String = try container.decode(String.self, forKey: .low)
            let close: String = try container.decode(String.self, forKey: .close)
            let volume: String = try container.decode(String.self, forKey: .volume)
            self.init(date: date, open: Float(open)!, high: Float(high)!, low: Float(low)! , close: Float(close)!, volume: Int(volume)!)
        } catch {
            throw ModelError.parsingError(error: error.localizedDescription)
        }
    }
    
}
