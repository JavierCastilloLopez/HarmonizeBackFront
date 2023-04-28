

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


const s3 = new S3Client({
  region: "us-east-1",
 
});


export async function subirArchivoAS3(archivo, bucket, nombreArchivo, acl = 'private', contentType = '') {
    
    const params = {
      Bucket: bucket,
      Key: nombreArchivo,
      Body: archivo,
      ACL: acl,
      ContentType: contentType,
    };
    const command = new PutObjectCommand(params);
  
    try {
      const response = await s3.send(command);
      console.log('Archivo subido con éxito a S3: ', response.Location);
      return response;
    } catch (error) {
      console.log('Error al subir archivo a S3: ', error);
      throw error;
    }
  }
  
