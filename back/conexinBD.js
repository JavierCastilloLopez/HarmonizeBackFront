// Load the AWS SDK for Node.js
import {
  DynamoDBClient,
  ListTablesCommand,
  ScanCommand,
  PutItemCommand,
  DeleteItemCommand,
  QueryCommand

} from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({
  region: "eu-west-3",
  credentials: {
    accessKeyId: "AKIATGQ353NGTIOOFN7P",
    secretAccessKey: "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"
  }
});



export function addItem(table, addItem) {



console.log(addItem)

  const command = new PutItemCommand({
    TableName: table,
    Item: addItem,
    
  });

  // Ejecutar el comando y procesar los resultados
  return client.send(command)
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error(error);
    });

}


export async function deleteItem(table, keyItem) {





  const command = new DeleteItemCommand({
    TableName: table,
    Key:
      keyItem, 
    

  });

  // Ejecutar el comando y procesar los resultados
  client.send(command)
    .then(data => {
      console.log('Eliminado');
    })
    .catch(error => {
      console.error("Error al escanear la tabla:");
    });

}
export async function getTable(table) {





  const command = new ScanCommand({
    TableName: table,
  

  });
  let result = await client.send(command)
    .then(data => {
      return (data.Items);
    })
    .catch(error => {
      console.error("Error al escanear la tabla:");
    });
  // Ejecutar el comando y procesar los resultados
  console.log(result)
  return result

}
export async function getItem(table, keyItem,IdKey) {
  keyItem={[`:${IdKey}`]:{ "S":keyItem}}
  const command = new QueryCommand({
    TableName: table,
    KeyConditionExpression: `#${IdKey} = :${IdKey}`,
    ExpressionAttributeNames: {
      [`#${IdKey}`]: IdKey
    },
   
    ExpressionAttributeValues: keyItem

  });
console.log(command)
  // Ejecutar el comando y procesar los resultados
  return await client.send(command)
    .then(data => {
      return (data.Items);
    })
    .catch(error => {
      console.error("Error al escanear la tabla:",error);
    });

}

export async function getUserByEmail(email){

  let keyItem={":Email":{ "S":email}}
  const command = new ScanCommand({
    TableName: "User",
    FilterExpression: `#Email = :Email`,
    ExpressionAttributeNames: {
      "#Email": "Email"
    },
   
    ExpressionAttributeValues: keyItem

  });
 

  // Ejecutar el comando y procesar los resultados
  return await client.send(command)
    .then(data => {
     console.log(data)
      return (data.Items[0]);
    })
    .catch(error => {
      console.error(error);
      return error
    });


}


