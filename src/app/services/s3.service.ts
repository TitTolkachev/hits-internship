import {Injectable} from '@angular/core';
import {PutObjectCommand, PutObjectCommandInput, S3Client} from '@aws-sdk/client-s3';

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  bucketName = '2b4886a8-olegoff-client-service-bucket';
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: 'ru-1',
      endpoint: 'https://s3.timeweb.cloud',
      credentials: {
        accessKeyId: 'UEHCWHJ282XK4M5J8UCJ',
        secretAccessKey: 'NNadNJjCAWI5AYjPqh7OK92EK98yxNLPnRKWxuL2',
      },
    });
  }

  async uploadFile(file: File): Promise<any> {
    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: file.name,
      Body: file,
      ACL: 'public-read',
    };

    const command = new PutObjectCommand(params);
    return this.s3.send(command);
  }
}
