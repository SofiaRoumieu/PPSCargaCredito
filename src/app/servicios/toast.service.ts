import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  errorToast(message: string) {
    this.toastController.create({
      message: message,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ],
      color: 'danger',
      duration: 2000
    })
      .then(res => {
        res.present();
      });
  }

  confirmationToast(message: string) {
    this.toastController.create({
      message: message,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ],
      color: 'success',
      duration: 2000
    })
      .then(res => {
        res.present();
      });
  }

  questionToast(message:string,cont10:number, cont50:number,cont100:number,dataServ:StorageService, idUser:string){
    this.toastController.create({
      message: message,
      cssClass:"custom{display: block;}",
      position: 'middle',
      buttons: [
        {
          text: 'Confirmar',
          cssClass:'btn btn-primary btn-sm',
          handler: () => {
            console.log(cont10,cont50,cont100,idUser);
            cont10 = 0;
            cont50 = 0;
            cont100 = 0;
            dataServ.updateDatabase(idUser, 0)
            .then(res => { this.confirmationToast("Saldo reiniciado") })
            .catch(err => {
              console.log("err", err)
              this.errorToast("Error al limpiar")
            })
            console.log('Confirmar clicked');
          }
        },
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ],
      color: 'warning'
    })
    .then(res => {
      res.present();
    });
  }
}
