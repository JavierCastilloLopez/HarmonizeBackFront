

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "ASIATQ5KEFU7OZKRIZVS",
    secretAccessKey: "f6NqHnvZojCzzw/2Men52rEVVu09riZ7dIvXndm9",
    sessionToken: "FwoGZXIvYXdzELv//////////wEaDFaHdcPPpGsNUwnMTiK+AbjVu4MoRaGFZl3oe9jGtOaLzFYRb1fvztVR60EZYyaEBbd9y4uBGacMp2k/chh6oyz1E5h4clHmN8oS8vf36QyJLuu8KdCgLyN60X1oFTkfOlx2PqwhBCu1q/YWIEdHDBeEhNeu1fE9G+D/3oFaY1JN8eXlleni+hfsWiEy/LvbqyqOEH5mq6ZUbi7hpnm48dslHQTKatckYNnXNyTYOWqRnHQIJ7WwhcI0VUsZGdLkfSbpwswb2Sxpw7DYu4go/ZmyowYyLWD3vSlwf574bROjIKum9IBAO4FbJUVXsSJ+s7Mro+YQ1Tytcchxcwf17ItwBg=="
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
  
