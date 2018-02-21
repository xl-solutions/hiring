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
        let cell = tableView.dequeueReusableCell(withIdentifier: Storyboard.stockCell, for: indexPath)
        let portf = self.portfolios![indexPath.row]
        cell.textLabel?.text = "\(portf.symbol!) - \(portf.qtdAcoes!)"
        cell.detailTextLabel?.text = "Data: \((portf.timeSerie?.date)!)"
        return cell
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == Storyboard.lucroSegue{
            if let gainVC = segue.destination as? GainViewController{
                let indexPath = self.stocksTableView.indexPathForSelectedRow
                gainVC.portfolio = self.portfolios?[(indexPath?.row)!]
            }
        }
    }


}

