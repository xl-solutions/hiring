//
//  Estimate.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 21/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

class Estimate: NSObject {
    static func estimateAcoes(timeSerie: TimeSerie, qtdAcoes: Double) -> Double{
        return self.estimateOHLCAverage(timeSerie: timeSerie) * qtdAcoes
    }

    
    static func estimateOHLCAverage(timeSerie: TimeSerie) -> Double{
        return (timeSerie.close + timeSerie.open + timeSerie.high + timeSerie.low)/4
    }
    
    // Calcular o ganho
    static func estimateGain(portifolio: Portfolio, timeSerie: TimeSerie) -> Double{
        let calcPort = estimateAcoes(timeSerie: portifolio.timeSerie!, qtdAcoes: Double(portifolio.qtdAcoes!))
        let calcCurrent = estimateAcoes(timeSerie: timeSerie, qtdAcoes: Double(portifolio.qtdAcoes!))
        
        return calcCurrent - calcPort
    }
}
