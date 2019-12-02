import { Injectable, Inject } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { LoginService } from './login.service';
import { AlertService } from './alert.service';
@Injectable({
  providedIn: 'root'
})
export class CameraService {


  public photos: Photo[] = [];
  image;
  photoList: any;

  constructor(
    private camera: Camera,
    private loginservice: LoginService,
    @Inject(AlertService) private alertService: AlertService,
    private storage: Storage) {
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

    // .then((imageData) => {
    //   return imageData;
    // },
    //   (err) => {
    //     // Handle error
    //     this.alertService.showInfoAlert(err);
    //     console.log('Camera issue: ' + err);
    //     return null;
    //   });
  }
  takePicture(options, imgTypeName) {

    console.log('image type');
    console.log(imgTypeName);
    console.log(this.photoList);
    console.log(this.photoList[imgTypeName]);

    this.camera.getPicture(options).then((imageData) => {
      // Add new photo to gallery
      // console.log(this.photoList.[imgTypeName]);
      console.log(imageData);
      // let formData: FormData = new FormData();
      // formData.append('mobile',90176972 );
      // formData.append('type', 1);
      const phoneNo = this.storage.get('userNo');
      const images = new FormData(); const images1 = new FormData();
      const blob = new Blob([imageData], { type: 'image / png' });
      console.log(blob);

      images.append('mobile', '9017697290');
      images.append('file', blob);
      images.append('type', '1');

      images1.append('mobile', '9017697290');
      images1.append('file', imageData);
      images1.append('type', '1');

      this.loginservice.uploadSingleImg(images1).subscribe((res) => {
        console.log(res);

      });
      this.loginservice.uploadSingleImg(images).subscribe((res) => {
        // return res;
        if (res.status === 200) {
          console.log(res);

        } else {
          this.alertService.showErrorAlert(res.messege);
        }
      });
      // if (imgTypeName === 'indoorSpace') {
      //   this.photoList.indoorSpace.push({
      //     data: 'data:image/jpeg;base64,' + imageData,
      //     name: this.getName(imgTypeName)
      //   });
      //   this.storage.set('photos', this.photoList);
      //   console.log('save in local');
      // } else {

      //   if (imgTypeName === 'outdoorSpace') {
      //     this.photoList.outdoorSpace.push({
      //       data: 'data:image/jpeg;base64,' + imageData,
      //       name: this.getName(imgTypeName)
      //     });
      //     this.storage.set('photos', this.photoList);
      //     console.log('save in local');
      //   } else {

      //     if (imgTypeName === 'food') {
      //       this.photoList.food.push({
      //         data: 'data:image/jpeg;base64,' + imageData,
      //         name: this.getName(imgTypeName)
      //       });
      //       this.storage.set('photos', this.photoList);
      //       console.log('save in local');
      //     } else {
      //       if (imgTypeName === 'menuPhoto') {
      //         this.photoList.menuPhoto.push({
      //           data: 'data:image/jpeg;base64,' + imageData,
      //           name: this.getName(imgTypeName)
      //         });
      //         this.storage.set('photos', this.photoList);
      //         console.log('save in local');
      //       }
      //     }

      //   }



      // }
    }, (err) => {
      // Handle error
      this.alertService.showErrorAlert('Camera issue: ' + err);
      console.log('Camera issue: ' + err);
    });

  }

  takePictureFromGalry(imgTypeName) {
    const options: CameraOptions = {
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
    this.takePicture(options, imgTypeName);
  }
  takePictureFromCamera(imgTypeName) {
    console.log(imgTypeName);

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 400,
      targetHeight: 400,
      allowEdit: true
    };
    this.takePicture(options, imgTypeName);
  }
  removePicture(imgTypeName, data, id) {
    this.loginservice.deleteImgById(id).subscribe((res) => {
      if (res.status === 200) {
        this.alertService.showInfoAlert('Image Delete Successfuly');
      } else {
        this.alertService.showErrorAlert(res.messege);
      }
    });
    if (imgTypeName === 'indoorSpace') {
      this.photoList.indoorSpace.splice(this.photoList.indoorSpace.indexOf(data), 1);
      this.storage.set('photos', this.photoList);
      console.log('remove');
    } else {

      if (imgTypeName === 'outdoorSpace') {
        this.photoList.outdoorSpace.splice(this.photoList.outdoorSpace.indexOf(data), 1);
        this.storage.set('photos', this.photoList);
        console.log('remove');
      } else {

        if (imgTypeName === 'food') {
          this.photoList.food.splice(this.photoList.food.indexOf(data), 1);
          this.storage.set('photos', this.photoList);
          console.log('remove');
        } else {
          if (imgTypeName === 'menuPhoto') {
            this.photoList.menuPhoto.splice(this.photoList.menuPhoto.indexOf(data), 1);
            this.storage.set('photos', this.photoList);
            console.log('remove');
          }
        }

      }
    }








    this.loadSaved();
  }

  loadSaved() {
    this.storage.get('photos').then((photos) => {
      this.photoList = photos || this.photoList;
      console.log('list of photo');
      console.log(this.photoList);


    });
  }


  getName(val: string) {
    const name = val + (new Date()).getTime().toString();
    return name;
  }
}

class Photo {
  data: any;
  name: string;
}
// class PhotoArray {
//   indoorSpace: Photo[] = [];
//   outdoorSpace: Photo[] = [];
//   food: Photo[] = [];
//   menuPhoto: Photo[] = [];
// }
