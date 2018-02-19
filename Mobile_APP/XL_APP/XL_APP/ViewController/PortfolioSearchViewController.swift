//
//  PortfolioSearchViewController.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 19/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

class PortfolioSearchViewController: UIViewController {
    @IBOutlet weak var symbolText: UITextField!
    @IBOutlet weak var functionSegment: UISegmentedControl!
    @IBOutlet weak var sizeSegment: UISegmentedControl!
    @IBOutlet weak var datePicker: UIDatePicker!
    @IBOutlet weak var functionDescription: UITextView!
    @IBOutlet weak var sizeDescription: UITextView!
    override func viewDidLoad() {
        super.viewDidLoad()
        print(self.formaterDate())
    }
    
    func formaterDate() -> String{
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"

        return formatter.string(from: datePicker.date)
    }

    @IBAction func done(_ sender: Any) {
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        
    }


}
