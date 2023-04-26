

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "ASIATQ5KEFU7MRSNWY3S",
    secretAccessKey: "afKpcUbHaInGU/X0qjPKC+vIeBaiLWobGoYSRBpp",
    sessionToken: "FwoGZXIvYXdzEDAaDO790rCSJ7kx5VQdhSK+AZkz49bC1mjzlt73QxJ4LUnTy2keS6mTE3HXIfOcJneN4w/mnyJQuqY/bLF3FU4oLF008VF11oEJ6K3LuLWIGS3wXcq3BfFTBX5hHQani0LxMs3Ic09SN0Vmb5RWB/3HCeceQorpq2ZLIdkwqVcUcb0SgykXYrtrBfKSDIJygLyms6hBlHGuq367ZuhjcCNiSsl+WiBnDX9gkGWeRQz/bjeQajhto02vq7HRDg5WWr+VYxfjcHqOQVqTiRbQv2kolIijogYyLf+f7uXZOyEuVrhBUCbnISuCA05Qhnhg6H3dTiaVYhc/tndkpl5tqyLR2PAUHQ=="
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
  