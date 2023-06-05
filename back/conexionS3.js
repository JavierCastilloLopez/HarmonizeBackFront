

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "ASIATQ5KEFU7NROGABHM",
    secretAccessKey: "1OzJMFOcd9QRKAfJQ3Ju1VqzstM03mT7bWQ+LAip",
    sessionToken: "FwoGZXIvYXdzEPH//////////wEaDOmMOUtOpODJ/fDCWCK+AaVdyzp+Kg3UAqVjPzupYgtca9Xn8MAmAiOf9BdbEA2BiNkvbPbQO085l2A3dVYg/UJ0AFRmAKNj6bkkoGDzjZtSD3Iyj/ln5zmciLIx9a2Lpr9ZWT7L4gr4vopf+R5qcPBAMBS2yd6gaOmODLz+xieB3AcWQUiuDmxSRBDQxjb9e1kmA20z7Y3ro1S62E55qXMIoXY7SkWLxW9DtKKELyI2nhxNqBxkzXjzikI+tLCPyd2rtLNfGFyKuzYNwjgo3qT2owYyLcGQJgMVsXU89jzO6fUT60h2WUbZ1MQVaFbIG39IyR3N8zT6w6UE/jdLyCzBMQ=="
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

