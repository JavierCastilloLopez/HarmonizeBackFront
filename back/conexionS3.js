

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "ASIATQ5KEFU7HNCU3WGS",
    secretAccessKey: "IZ6fOtN/5VfqN8gCUmb+Ysf14KO3pY3eXiUXhcdf",
    sessionToken: "FwoGZXIvYXdzENj//////////wEaDH4b4ehgE/pihuDNbCK+AURIT8vGr0UxrSkhQvy4kp47nyS+uyeA8ssvSeoc2K1GZfjIoezMRM4ur/uCATKFPjMhjMtyt3aY7UQB7XJanRmj1PZIQfcg4hu1/zRM7lZhpDblnK3RF1xUEVqgHWzvNRgvErYgexAUbNU+o7XD7AWPLMrp6YPtjbqhHqKerZrA/GOe1dkdUOz8gs+2jtuXOKT95wP6O+qDdgsf1+gSwkCl4FbVQn66+Ng7ZUrXcPsmIAG3xSra+oFuW1635+ook//HogYyLQfY/sArsv+Qcmk0ouWrj9lqE9HmjalABGp9zyolsi2vbT0D9MOhS9TV0vHibQ=="
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
  
