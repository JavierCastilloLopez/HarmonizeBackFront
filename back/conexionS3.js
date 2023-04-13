

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3 = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: "ASIATQ5KEFU7ARMDKC7R",
      secretAccessKey: "rgLgFEdqXD5//sAL1A6T01rJbADQeo1zTCQXtTlM",
      sessionToken: "FwoGZXIvYXdzEPj//////////wEaDKojbARPDay4rM591iK+AQZ2uH5G67QN09vbxPBLocZjVlZri0MIbd3VW/CApqDOopy4xND5YXDaqxYyV0S8yHXPeEecTY5UoNPK6ZR2S5x8adVZDLNqHIB7clvTPxtDJTszLDCybUoAv1wMTi2IRXD4cBK+rPNW5/B2cbeFbTSKhIx7LWdUhF8PSV5NG1STfdbkEYi7q7lNNav87n1zRknO/agi1YnnsVeqZtriUMsiqCWPZJPsDsu1N8974aevZZIlV3a0Y4k3nHotSfQoq8feoQYyLTR87K0/AjEqZzTrPgg44lcpCca5bmKDR2b/wDGu5AOwjJqDgpX7Typ+O94K3w=="
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
  