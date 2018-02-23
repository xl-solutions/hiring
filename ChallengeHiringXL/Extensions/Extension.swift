//
//  Extension.swift
//  ChallengeHiringXL
//
//  Created by Gustavo Henrique on 23/02/18.
//  Copyright © 2018 Gustavo Henrique. All rights reserved.
//

import UIKit


extension UITableViewCell {
    
    func changeBackgroundColor(value: Double) {
        
        switch value {
        case let x where x < 0.0:
            self.backgroundColor = UIColor(red: 255.0/255.0, green: 59.0/255.0, blue: 48.0/255.0, alpha: 1.0)
        case let x where x > 0.0:
            self.backgroundColor = UIColor(red: 76.0/255.0, green: 217.0/255.0, blue: 100.0/255.0, alpha: 1.0)
        case _:
            self.backgroundColor = UIColor(red: 44.0/255.0, green: 186.0/255.0, blue: 231.0/255.0, alpha: 1.0)
        }
        
    }
    
}
extension UIViewController {
    
    func setAlert(msg: String, completion: (() -> ())?) {
        
        let alertController = UIAlertController(title: "Mensagem", message: msg, preferredStyle: UIAlertControllerStyle.alert)
        
        let okAction = UIAlertAction(title: "OK", style: UIAlertActionStyle.default) { (result : UIAlertAction) -> Void in
            completion?()
        }
        
        alertController.view.layer.cornerRadius = 15
        alertController.view.tintColor = UIColor.black
        alertController.view.backgroundColor = UIColor(rgb: 0x1ABC9C)
        
        alertController.addAction(okAction)
        self.present(alertController, animated: true, completion: nil)
    }
    
    func activityView(view: UIView, overlayView: UIView, activityView: UIActivityIndicatorView) {
        
        overlayView.frame = view.bounds
        overlayView.center = CGPoint(x: view.bounds.width / 2.0, y:view.bounds.height / 2.0)
        overlayView.backgroundColor = UIColor.white
        overlayView.alpha = 0.8
        overlayView.clipsToBounds = true
        overlayView.layer.cornerRadius = 10
        
        activityView.frame = CGRect(origin: CGPoint(x:0, y:0), size: CGSize(width:40, height:40))
        activityView.activityIndicatorViewStyle = .gray
        activityView.center = CGPoint(x: overlayView.bounds.width / 2, y: overlayView.bounds.height / 2)
        
        overlayView.addSubview(activityView)
        view.addSubview(overlayView)
        
        activityView.startAnimating()
        
    }
    
}

extension UIColor {
    
    
    convenience init(red: Int, green: Int, blue: Int) {
        assert(red >= 0 && red <= 255, "Invalid red component")
        assert(green >= 0 && green <= 255, "Invalid green component")
        assert(blue >= 0 && blue <= 255, "Invalid blue component")
        
        self.init(red: CGFloat(red) / 255.0, green: CGFloat(green) / 255.0, blue: CGFloat(blue) / 255.0, alpha: 1.0)
    }
    
    convenience init(rgb: Int) {
        self.init(
            red: (rgb >> 16) & 0xFF,
            green: (rgb >> 8) & 0xFF,
            blue: rgb & 0xFF
        )
    }
    
    
}
