//
//  DateHistViewController.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 22/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

class DateHistViewController: UIViewController {
    
    var portfolio: Portfolio?

    @IBOutlet weak var fromDatePicker: UIDatePicker!
    @IBOutlet weak var toDatePicker: UIDatePicker!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        if portfolio == nil{
            self.navigationController?.popToRootViewController(animated: true)
        }else{
            self.setDatePickMinAndMax(datePicker: self.fromDatePicker)
            self.setDatePickMinAndMax(datePicker: toDatePicker)
        }
        
    }
    
    func setDatePickMinAndMax(datePicker: UIDatePicker){
        datePicker.maximumDate = Date()
        if  let portfolio =  portfolio{
            datePicker.minimumDate = DateFormat.stringToDate(date: (portfolio.timeSerie?.date)!)
        }
    }
    
    //MARK: Hist action
    @IBAction func histSearch(_ sender: UIButton) {
        if Calendar.current.startOfDay(for: self.fromDatePicker.date)<=Calendar.current.startOfDay(for: self.toDatePicker.date) {
            performSegue(withIdentifier: Storyboard.histSegue, sender: nil)
        }else{
            Alert.alert(titulo: "", mensagem: "Data 'De' não pode ser menor que data 'A'!", popView: false, viewController: self)
        }
    }
    
    //MARK: Segue
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == Storyboard.histSegue{
            if let histVC = segue.destination as? HistViewController{
                histVC.portfolio = self.portfolio
                if let dateTo = DateFormat.changeDateTime(hour: 21, min: 59, sec: 59, date: self.toDatePicker.date){
                    histVC.toDate = dateTo
                }else{
                    histVC.toDate = self.toDatePicker.date
                }
                
                histVC.fromDate = Calendar.current.startOfDay(for: self.fromDatePicker.date)
            }
        }
    }

}
