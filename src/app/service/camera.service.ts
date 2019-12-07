import { Injectable, Inject } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { LoginService } from './login.service';
import { AlertService } from './alert.service';
@Injectable({
  providedIn: 'root'
})
export class CameraService {



  image;
  photoList: any;

  constructor(
    private camera: Camera,
    @Inject(AlertService) private alertService: AlertService,
  ) {
    this.photoList = {
      indoorSpace: [] = [],
      outdoorSpace: [] = [],
      food: [] = [],
      menuPhoto: [] = [],
    };
    console.log(this.photoList);

  }
  takeImage(source) {
    let options: CameraOptions;
    if (source === 'camera') {
      options = {
        quality: 100,
        sourceType: this.camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: true,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 400,
        targetHeight: 400,
        allowEdit: true
      };
    } else {
      options = {
        quality: 100,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: true,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 400,
        targetHeight: 400,
        allowEdit: true
      };
    }


    return this.camera.getPicture(options);


  }

}
