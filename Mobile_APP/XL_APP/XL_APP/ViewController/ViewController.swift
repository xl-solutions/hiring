//
//  ViewController.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 16/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.


import UIKit


class ViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    

    @IBOutlet weak var stocksTableView: UITableView!
    var portfolios :[Portfolio]?
    
    override func viewDidLoad() {
        super.viewDidLoad()
//        self.portfolios = PortfolioDAO.shared.selectPortfolio()
//        self.stocksTableView.reloadData()
//        self.stocksTableView.dataSource = self
//        self.stocksTableView.delegate = self
//        self.stocksTableView.tableFooterView = UIView()

    }
    
    override func viewWillAppear(_ animated: Bool) {
        self.portfolios = PortfolioDAO.shared.selectPortfolio()
        self.stocksTableView.reloadData()
        self.stocksTableView.dataSource = self
        self.stocksTableView.delegate = self
        self.stocksTableView.tableFooterView = UIView()
        

    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.portfolios!.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "stockCell", for: indexPath)
        let portf = self.portfolios![indexPath.row]
        let formarter = SimpleNumberFormarter.format2Digits()
        let numberFormated = formarter.string(for: portf.valorDaAcao!)
        cell.textLabel?.text = "\(portf.symbol!) - $\(numberFormated!)"
        cell.detailTextLabel?.text = "Data: \((portf.timeSerie?.date)!)"
        return cell
    }


}

