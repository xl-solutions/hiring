//
//  StockController.swift
//  ChallengeHiringXL
//
//  Created by Gustavo Henrique on 20/02/18.
//  Copyright © 2018 Gustavo Henrique. All rights reserved.
//

import UIKit

class StockController: UIViewController {

    
    @IBOutlet weak var greenView: UIView!
    @IBOutlet weak var tableView: UITableView!
    
    
    let stocks : [(String,Double)] = [("BVMF:", +1.5),("FB", +2.33),("GOOG",-4.3)]
    
    override func viewDidLoad() {
        super.viewDidLoad()

        tableView.tableFooterView = UIView.init()
        
        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
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

extension StockController : UITableViewDelegate {
    
    
    func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
        
        let cell = cell as! StockCell
        
        
        cell.changeBackgroundColor(value: self.stocks[indexPath.row].1)
        
        cell.stockLabel.textColor = UIColor.white
        cell.stockValueLabel.textColor = UIColor.white
        cell.stockLabel.font = UIFont(name: "HelveticaNeue-CondensedBold", size: 24)
        cell.stockValueLabel.font = UIFont(name: "HelveticaNeue-CondensedBold", size: 24)
        cell.stockLabel.shadowColor = UIColor(red: 0, green: 0, blue: 0, alpha: 0.25)
        cell.stockLabel.shadowOffset = CGSize(width: 0, height: 1)
        cell.stockValueLabel.shadowColor = UIColor(red: 0, green: 0, blue: 0, alpha: 0.25)
        cell.stockValueLabel.shadowOffset = CGSize(width: 0, height: 1)
        
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 120
    }
}

extension StockController : UITableViewDataSource {
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return stocks.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! StockCell
        
        cell.stockLabel.text = stocks[indexPath.row].0
        cell.stockValueLabel.text = "\(stocks[indexPath.row].1)"
        
        
        
        
        
        
        
        return cell
    }
    
}
