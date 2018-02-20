//
//  Alert.swift
//  XL_APP
//
//  Created by Everton Miranda Vitório on 20/02/18.
//  Copyright © 2018 Everton Miranda Vitório. All rights reserved.
//

import UIKit

class Alert: NSObject {
    //Tela de alerta simples
    static func alert(titulo: String, mensagem: String, popView: Bool, viewController: UIViewController){
        let alert = UIAlertController(title: titulo, message: mensagem, preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "Ok", style: UIAlertActionStyle.default, handler: { (action) in
            // se o resultado vier com sucesso voltarar para a tela anterior
            if(popView == true){
                viewController.navigationController?.popViewController(animated: true)
            }
        }))
        viewController.present(alert, animated: true, completion: nil)
    }

}
