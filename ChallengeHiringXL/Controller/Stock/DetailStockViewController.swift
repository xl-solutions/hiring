//
//  DetailStockViewController.swift
//  ChallengeHiringXL
//
//  Created by Gustavo Henrique on 23/02/18.
//  Copyright © 2018 Gustavo Henrique. All rights reserved.
//

import UIKit

class DetailStockViewController: UIViewController {

    @IBOutlet weak var symbolLabel: UILabel!
    @IBOutlet weak var informationLabel: UILabel!
    @IBOutlet weak var lastRefreshedLabel: UILabel!
    @IBOutlet weak var intervalLabel: UILabel!
    @IBOutlet weak var timezoneLabel: UILabel!
    
    var activityIndicator : UIActivityIndicatorView = UIActivityIndicatorView()
    let overlayView = UIView()
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        self.activityView(view: self.view,overlayView: self.overlayView, activityView: self.activityIndicator)
        StocksPersistence.getStockForSymbol(symbol: StockSingleton.sharedInstance.choosedSymbol) { (stock) in
            
            if stock != nil {
                StockSingleton.sharedInstance.setStock(newStock: stock!)
                self.configureView()
            }
            
            self.activityIndicator.stopAnimating()
            self.overlayView.removeFromSuperview()
            
            
        }
        
    }
    
    
    func configureView() {
        
        let stock = StockSingleton.sharedInstance.stock!
        
        self.symbolLabel.text = stock.symbol!
        self.informationLabel.text = stock.information!
        self.lastRefreshedLabel.text = stock.lastRefreshed
        self.intervalLabel.text = stock.interval!
        self.timezoneLabel.text = stock.timezone!
        
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func goToHistory(_ sender: Any) {
    
        
    }
    
    @IBAction func backView(_ sender: Any) {
   
        self.dismiss(animated: true, completion: nil)
    
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
