//
//  DateFormat.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 20/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

class DateFormat: NSObject {
    //Converter String para Date
    static func stringToDate(date: String) -> Date{
        let formater = DateFormatter()
        formater.dateFormat = "yyyy-MM-dd"
        return formater.date(from: date)!
    }
    
    // Converter Date para String
    static func dateToString(date: Date) -> String{
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.string(from: date)
    }
}
