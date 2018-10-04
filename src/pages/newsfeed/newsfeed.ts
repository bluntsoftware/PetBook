import {Component} from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Auth, Conduit, IGlueConfig} from '@bluntsoftware/iglue';



@IonicPage()
@Component({
  selector: 'page-newsfeed',
  templateUrl: 'newsfeed.html',
})
export class NewsfeedPage {
  post:any = {message:''};
  feed:any[];
  myPhoto:any;
  loading:any;
  file:File;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth:Auth,
              public conduit:Conduit,
              public config:IGlueConfig,
              public loadingCtrl: LoadingController ) {

    if(this.auth.authenticated){
      this.list();
    }

  }
  public updateUrl(event){
    event.target.attributes.src.value ="assets/imgs/no_pic.jpg"
  }
  changeListener($event) : void {
    this.readThis($event.target.files);
  }

  readThis(files: FileList): void {
    this.file  = files.item(0);

    let myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.myPhoto = myReader.result;
    };
    myReader.readAsDataURL(this.file);
  }

  compareByDate(a,b){
    if (a.createDate < b.createDate)
      return 1;
    if (a.createDate > b.createDate)
      return -1;
    return 0;
  }
  postComment(post,message){
    let comment = {};
    comment['message'] = message;
    comment['postId'] = post._id;
    comment['createDate'] = new Date();
    if(message){
      this.conduit.collection("comment").save(comment).subscribe((data) => {

      });
    }
  }
  comments(post){
    const listParams:any = {
      'sidx':'createDate',
      'sord':'DESC',
      'rows':50,
      'filterByFields':JSON.stringify({
        'postId':post._id
      })
    };
    this.conduit.collection("comment").query(listParams).subscribe((data) => {
      post['comments'] = data['rows'];
    },(err)=>{
      alert(err);
    });
  }
  getComments() {
    this.feed.forEach((post) => {
      this.comments(post);
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsfeedPage');
    this.list();
  }

  list(){
    this.loading = this.loadingCtrl.create({
         content: 'gathering posts...'
    });
    this.loading.present();
    this.conduit.collection("petfeed").query().subscribe((data) => {
      this.loading.dismiss();
      this.feed = data['rows'];
      this.getComments();
    },error => {
      this.loading.dismiss();
      alert(error);
    });
  }
  removePost(id:string){
    this.conduit.collection("petfeed").remove(id).subscribe(()=>{
      this.list();
    });
  }
  postIt(){
    this.conduit.collection("petfeed").save(this.post).subscribe((data) => {
      this.post = {message:''};
      this.feed.unshift(data);
    });
  }
  postMessage(){
    if(!this.post['createDate']){
      this.post['createDate'] = new Date();
    }
    if(this.post.message || this.file){
      if(this.file){
        let formData: FormData = new FormData();
        formData.append('file', this.file);
        this.conduit.collection("petfeed").upload(formData).subscribe((data) => {
          this.file = null;
          this.myPhoto = null;
          this.post['imgPath'] = data.result[0].filepath;
          this.postIt();
        });
      }else{
        this.postIt();
      }
    }
  }
}
