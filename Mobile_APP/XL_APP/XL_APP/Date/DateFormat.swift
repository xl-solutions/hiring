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
    static func stringToDate(date: String) -> Date?{
        let formater = DateFormatter()
        formater.dateFormat = "yyyy-MM-dd"
        guard let  returning = formater.date(from: date) else{
            return nil
        }
        return returning
    }
    
    // Converter Date para String
    static func dateToString(date: Date?) -> String{
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        if date == nil{
            return ""
        }
        return formatter.string(from: date!)
    }
}
