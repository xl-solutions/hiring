//
//  ViewController.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 16/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//Key: TBP3N4DMWY00AZJH

import UIKit


class ViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    

    var portifolios: [Portfolio]?
    @IBOutlet weak var stocksTableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
//        let url = StockURL(symbol: "AAPL", function: .daily, outputSize: .full).returnURL()
//        print(url)
//        DataFetch<TimeSerie>(url: url).getResults { (timeSeries, error) in
//            print(timeSeries!)
//        }
        
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "stockCell", for: indexPath)
        return cell
    }


}

