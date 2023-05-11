

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "ASIATQ5KEFU7EOX7DDET",
    secretAccessKey: "eK3DVKdGPsVLntjUSZqzAXSKrRLxZF6K2RKvMxpZ",
    sessionToken: "FwoGZXIvYXdzEJj//////////wEaDNHgvaA1O3F0eXhqcSK+ATOIjIE1GaSm6871sOrGEaSdYMx9pDDm+IJL5vkBNa5b1oLHVdIz19MqnuDbuedkdk1pHW9WhiPRRZ9iyruV+/Urn13QHqLyZzZuVktyJZHQOtbhUV4RLWzBU6sC78rSS1/ettPffbMKtTXnnTNwgFbNtItTu7NPgQrdehhJwSftQM0f+iju+OZCA11CjR7jIbrVrDwiTlnFSbG4zEmgRMKoCr0MGAniY/kTmtWNJZZxa4c5zE2b2ieQXTFh8noo2JryogYyLfEIVzkdCD704xw8mUUEZmuKyJdN09I4FbBJcRVsvdKGFONKEUy/ut7jsXg0LA=="
  }
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
  
