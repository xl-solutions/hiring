//
//  Portfolios.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 20/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit
//Singleton com os dados para o Portfolio
class Portfolios: NSObject {
    static let shared = Portfolios()
    var portfolios: [Portfolio]?
    
    override init() {
        self.portfolios = []
    }
    

}
