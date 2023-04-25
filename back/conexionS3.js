

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "ASIATQ5KEFU7LQX53O4C",
    secretAccessKey: "G+6iaKYlENjFxS1Y0x8IL52FmkbXVc6nlm8wVf40",
    sessionToken: "FwoGZXIvYXdzEBkaDKyOm0uJBHYlnnAZeyK+AYhHuq0cdr1BHxrG1dpeFUm1bz5zN/GdcFC/3dkSiP8c948jHhgW1xSYqs9AL4PMapzIhK8NGeaD/sssR22eTnSPbBl0MUh8vD7KTI09+1pNN4815UFpr6mzBSyrMl/XyZUORzGjClHeWWXJz0JgKHCHlrSvaKeNY6fiFnIktoouMXNhXb/7tcu4yeD6R6Viz0ueX0O4fMmRpH/o9s+0eYQcm9SRZ+caqvkcy0VFeKXPTKYynlU/u9fSwmEhlKso5IieogYyLQC8VYEs4nFgtCSrtcJx0Ocx0dqh8ziitPerphvr0Wrq8t1/N5dESefDBmyZXw=="
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
  