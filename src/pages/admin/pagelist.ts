import {AlertController, ModalController, NavController, NavParams, ToastController} from "ionic-angular";
import {Collection} from "@bluntsoftware/iglue";

export abstract class IonicPageList<T>{
  private items:T[];

  constructor(public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,public toastCtrl:ToastController) {

  }

  abstract getCollection():Collection<T>;
  abstract getEditPage():string;
  abstract getCreatePage():string;
  public list(sort?:(a: T, b: T) => number,params?: any):T[]{
    if(sort && this.items){
      return this.items.sort(sort);
    }
    return this.items;
  }

  public query(params?: any){
    this.getCollection().query(params).toPromise().then((response)=>{
      this.items = response.rows;
    }).catch((error) => {
      console.log(error);
    });
  }
  create() {
    let that = this;
    let addModal = this.modalCtrl.create(this.getCreatePage());
    addModal.onDidDismiss(item => {
      if (item) {
        that.getCollection().save(item).toPromise().then(()=>{
          that.query();
        }).catch((err)=>{

        });
      }
    });
    return addModal.present();
  }
  open(item: T) {

    let addModal = this.modalCtrl.create(this.getEditPage(),{'item':item});
    addModal.onDidDismiss(item => {
      if (item) {
        this.getCollection().save(item).toPromise().then(()=>{
          this.query();
        }).catch((err)=>{

        });
      }
    });
    return addModal.present();
  }
  removeById(id){
    this.getCollection().remove(id).toPromise().then(() => {
      this.query();
    }).catch((err)=>{
       this.toastCtrl.create({
        message:  err.statusText,
        duration: 3000,
        position: 'top'
      }).present();
    });
  }
  remove(project,showAlert?:boolean){
    if(showAlert){
      let alert = this.alertCtrl.create({
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this ?',
        buttons: [
          { text: 'Cancel', role: 'cancel',
            handler: () => {}
          },
          { text: 'Delete',
            handler:() => {this.removeById(project._id);}
          }
        ]
      });
      return alert.present();
    }else{
      this.removeById(project._id);
    }
  }
}
