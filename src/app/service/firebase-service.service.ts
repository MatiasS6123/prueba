import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserI } from 'src/models/UserI';
@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(private db: AngularFirestore) {
    // Constructor: Inyectamos el servicio de AngularFirestore que se utilizará en la clase.
  }

  /**
   * Crea un nuevo documento en la colección especificada.
   *
   * @param data Datos que se van a agregar al documento.
   * @param path Ruta de la colección en la base de datos.
   * @param id Identificador único para el nuevo documento.
   * @returns Una promesa que se resuelve cuando la operación se completa con éxito.
   */
  create(data: any, path: string, id: string): Promise<void> {
    const collection = this.db.collection(path); // Obtenemos una referencia a la colección.
    return collection.doc(id).set(data); // Establece los datos en el documento con el ID especificado.
  }

  /**
   * Obtiene y observa los cambios en los datos de una colección específica.
   *
   * @param path Ruta de la colección en la base de datos.
   * @returns Un observable que notifica sobre los cambios en los datos de la colección.
   */
  read<tipo>(path: string,id:string) {
    const collection = this.db.collection<tipo>(path); // Obtenemos una referencia a la colección de un tipo específico.
    return collection.doc(id).valueChanges(); // Retorna un observable que notifica cambios en los datos.
  }

  /**
   * Actualiza los datos de un documento en una colección.
   *
   * @param coleccion Nombre de la colección.
   * @param id Identificador único del documento que se actualizará.
   * @param datos Datos que se utilizarán para actualizar el documento.
   * @returns Una promesa que se resuelve cuando la operación de actualización se completa con éxito.
   */
  update(coleccion: string, id: string, datos: any): Promise<void> {
    return this.db.collection(coleccion).doc(id).update(datos); // Actualiza los datos del documento específico en la colección.
  }

  /**
   * Elimina un documento de una colección.
   *
   * @param path Ruta de la colección en la base de datos.
   * @param id Identificador único del documento que se eliminará.
   * @returns Una promesa que se resuelve cuando la operación de eliminación se completa con éxito.
   */
  delete(path: string, id: string): Promise<void> {
    const collection = this.db.collection(path); // Obtenemos una referencia a la colección.
    return collection.doc(id).delete(); // Elimina el documento con el ID especificado de la colección.
  }

  /**
   * Obtiene y muestra los datos de la colección 'Usuario' en la consola.
   */
  getCollection<tipo>(path:string) {
    const collection= this.db.collection<tipo>(path);
    return collection.valueChanges();
  }

  /**
   * Genera y retorna un nuevo identificador único.
   *
   * @returns Un identificador único generado.
   */
  getId() {
    return this.db.createId(); // Genera un nuevo identificador único utilizando AngularFirestore.
  }
}
