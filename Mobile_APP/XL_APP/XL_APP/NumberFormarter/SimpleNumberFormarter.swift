//
//  SimpleNumberFormarter.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 20/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

class SimpleNumberFormarter: NSObject {
    static func format2Digits() -> NumberFormatter{
        let numberFormatter = NumberFormatter()
        numberFormatter.maximumFractionDigits=2
        numberFormatter.minimumFractionDigits=2
        return numberFormatter
    }
}
