//
//  ConnectDAO.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 20/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit
import SQLite

class ConnectDAO: NSObject {
    static let shared = ConnectDAO()
    var db: Connection?
    
    override init() {
        let path = NSSearchPathForDirectoriesInDomains(
            .documentDirectory, .userDomainMask, true
            ).first!
        do{

            self.db = try Connection("\(path)/db.portfolio")
        }catch {
           
        }
        
    }
    
    func createTable(){
        let portfolio = Table("Portfolio")
        do{
            try self.db?.run(portfolio.create(ifNotExists: false){
                t in
                t.column(Columns.id, primaryKey: .autoincrement)
                t.column(Columns.symbol)
                t.column(Columns.date)
                t.column(Columns.open)
                t.column(Columns.high)
                t.column(Columns.low)
                t.column(Columns.close)
                t.column(Columns.volume)
                t.column(Columns.valorAcao)
            })

        }catch{
            
        }
    }
}