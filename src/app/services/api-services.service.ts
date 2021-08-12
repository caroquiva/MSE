/**
 * @author Carolina Quintero Valencia
 * @copyright https://www.youtube.com/watch?v=lKCWH4Jma8E
 * 
 * Creación de un servicio para consumir Apis
 */
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HouseModel } from "src/models/entities/house-model";

@Injectable({
    providedIn: "root"
  })

export class ApiService {

    constructor(private http: HttpClient) {}

    /**
     * 
     * @returns Un Json de todos los miembros 
     */
    getAllHouse(): Observable<any>{
      return  this.http.get("http://hp-api.herokuapp.com/api/characters ");
    }

    /**
     * 
     * @param house 
     * @returns un Json de los miembros de una casa ingresada
     */
    getHouse(house: string): Observable<any>{
        return this.http.get(`${"http://hp-api.herokuapp.com/api/characters/house"}/${house}`)
    }
}
