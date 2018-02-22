//
//  DateEstimate.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 22/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

class DateEstimate: NSObject {
    static func daysPassed(day1: Date, day2: Date) -> Int?{
        let calendar = NSCalendar.current
        
        // Replace the hour (time) of both dates with 00:00
        let date1 = calendar.startOfDay(for: day1)
        let date2 = calendar.startOfDay(for: day2)
        
        let days = calendar.dateComponents([.day], from: date1, to: date2).day
        return days
    }

}
