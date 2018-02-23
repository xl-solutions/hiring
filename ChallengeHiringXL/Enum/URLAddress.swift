//
//  URLAddress.swift
//  ChallengeHiringXL
//
//  Created by Gustavo Henrique on 20/02/18.
//  Copyright © 2018 Gustavo Henrique. All rights reserved.
//


enum Endpoint: String {
    case intraDay = "TIME_SERIES_INTRADAY&symbol="
    case daily = "TIME_SERIES_DAILY&symbol=MSFT&apikey="
    case weekend = "TIME_SERIES_WEEKLY&symbol=MSFT&apikey="
    case sma = "SMA&symbol=MSFT&interval=15min&time_period=10&series_type=close&apikey="
}

enum URLAddress {
    
    case base
    case test
    
    private func getUrl() -> String {
        switch self {
        case .base:
            return "https://www.alphavantage.co/query?function="
        case .test:
            return ""
        }
    }
    
    private static func returnURL(index: Int) -> URLAddress {
        switch index {
        case 0:
            return .base
        case 1:
            return .test
        default:
            return .test
        }
    }
    
    static func urlWithEndPoint(_ endpoint: Endpoint) -> String {
        return  self.returnURL(index:0).getUrl() + endpoint.rawValue
    }
}
