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
    
    var symbols = ["MSFT","GOOGL","PETR3.SA","INFY","HDC"]
    
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
        
        
        cell.backgroundColor = UIColor.black
        cell.stockLabel.textColor = UIColor.white
        cell.stockLabel.font = UIFont(name: "HelveticaNeue-CondensedBold", size: 24)
        cell.stockLabel.shadowColor = UIColor(red: 0, green: 0, blue: 0, alpha: 0.25)
        cell.stockLabel.shadowOffset = CGSize(width: 0, height: 1)
        
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 120
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        
        StockSingleton.sharedInstance.setSymbol(symbol: symbols[indexPath.row])
        self.performSegue(withIdentifier: "detail", sender: nil)
        
    }

}




extension StockController : UITableViewDataSource {
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return symbols.count
       
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! StockCell
        
        cell.stockLabel.text = symbols[indexPath.row]
        cell.selectionStyle = .none
        
        return cell
    }
    
}
