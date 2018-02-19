//
//  ViewController.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 16/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//Key: TBP3N4DMWY00AZJH

import UIKit


class ViewController: UIViewController {

    
    @IBOutlet weak var stocksTableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        DataFetch<TimeSerie>(url: URL(string: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=full&apikey=TBP3N4DMWY00AZJH")!).getResults { (timeSeries, error) in
            print(timeSeries!)
        }
        
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    @IBAction func addStock(_ sender: Any) {
    }

}

