//
//  Constants.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 20/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import Foundation
import SQLite

struct Constants {
    static let key = "TBP3N4DMWY00AZJH"
    static let plist = "Portfolio"
}

// Enum das Functions possiveis
public enum Function: String, CodingKey {
    case daily = "TIME_SERIES_DAILY"
    case weekly = "TIME_SERIES_WEEKLY"
    case monthly = "TIME_SERIES_MONTHLY"
}

// Struct das colunas da tabela Portfolio
struct Columns{
    static let id = Expression<Int64>("id")
    static let symbol = Expression<String>("symbol")
    static let date = Expression<String>("date")
    static let open = Expression<Double>("open")
    static let high = Expression<Double>("high")
    static let low = Expression<Double>("loew")
    static let close = Expression<Double>("close")
    static let valorAcao = Expression<Double>("valor_acao")
    static let volume = Expression<Int64>("volume")
}

// Enum do OutputSize possiveis
public enum OutputSize:  String {
    case compact = "compact"
    case full = "full"
}
