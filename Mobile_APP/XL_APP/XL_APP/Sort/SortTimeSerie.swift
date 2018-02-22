//
//  SortTimeSerie.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 21/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

class SortTimeSerie: NSObject {
    // Ordernar o array de TimeSerie pela data
    static func sortByDate(timeSeries: [TimeSerie]) -> [TimeSerie]{
        return timeSeries.sorted { (timeS1, timeS2) -> Bool in
            if DateFormat.stringToDate(date: timeS1.date) == nil{
                return false
            }
            if DateFormat.stringToDate(date: timeS2.date) == nil{
                return true
            }
            
            return DateFormat.stringToDate(date: timeS1.date)!.compare(DateFormat.stringToDate(date: timeS2.date)!) == ComparisonResult.orderedDescending
        }
    }
}
