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
    let open: Double
    let high: Double
    let low: Double
    let close: Double
    let volume: Int
    
    
    required public init(date: String,open: Double,high: Double,low: Double,close: Double,volume: Int) {
        
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
    // Enum das keys do json
    enum AVHistoricalStockPriceModelKeys: String, CodingKey {
        case date = "date"
        case open = "1. open"
        case high = "2. high"
        case low = "3. low"
        case close = "4. close"
        case volume = "5. volume"
    }
    
    // Init do decoder
    public convenience init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: AVHistoricalStockPriceModelKeys.self) // defining our (keyed) container
        do {
            let date: String = try container.decode(String.self, forKey: .date)
            let open: String = try container.decode(String.self, forKey: .open)
            let high: String = try container.decode(String.self, forKey: .high)
            let low: String = try container.decode(String.self, forKey: .low)
            let close: String = try container.decode(String.self, forKey: .close)
            let volume: String = try container.decode(String.self, forKey: .volume)
            self.init(date: date, open: Double(open)!, high: Double(high)!, low: Double(low)! , close: Double(close)!, volume: Int(volume)!)
        } catch {
            throw ModelError.parsingError(error: error.localizedDescription)
        }
    }
    
}
