// Load the AWS SDK for Node.js
import { DynamoDBClient, ListTablesCommand, ScanCommand, PutItemCommand, DeleteItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: "ASIATQ5KEFU7MQFENOFJ",
    secretAccessKey: "y3c+UWZPn77CRJq5phm403IqE+x37df0sJE10oZI",
    sessionToken: "FwoGZXIvYXdzEOL//////////wEaDEpHbFLcnEfbVyOcZyK+ATSnc22Gd9cVmNnvpxCFEF8Acnp7WmdzR0HGHS46JV+bysSN8HZw8O+6ibmyKYL62yJ7vg8KCznmFvOz5VK2Cng0JrVzL3O5Lx05INELvn3cDwE1i1RfxNGJS0CDM96K59M/kqmEgAMes8q4vQPXAwmIZArW03n0aPqcprJgqs5IT120OfpWbqovRAvjxkDSf9XXTiEzDHemQJoP+L8nBuCvycCvaI5vgjqngTl864B/Vo2j6EHQyHgqt+4MGcYozeXZoQYyLQYujyluYdF2hyCXujFcGCPI1hL37fXiOaADj1hNh+SzQA9kqUHGxSAu9jiZWw=="
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
    Limit: 50

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
export async function getItem(table, keyItem, IdKey) {
  keyItem = { [`:${IdKey}`]: { "S": keyItem } }
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
      console.error("Error al escanear la tabla:", error);
    });

}

export async function getUserByEmail(email) {

  let keyItem = { ":Email": { "S": email } }
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

export async function getSongByName(name) {

  const searchValue = name
  const command = new ScanCommand({
    TableName: "Cancion",
    FilterExpression: "contains(title, :search)",
    ExpressionAttributeValues: {
      ':search': { S: searchValue }
    },

   

  });


  // Ejecutar el comando y procesar los resultados
  return await client.send(command)
    .then(data => {
      console.log(data)
      return (data.Items);
    })
    .catch(error => {
      console.error(error);
      return error
    });


}

