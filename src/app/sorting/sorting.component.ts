/**
 * @author Carolina Quintero Valencia
 * 
 * realiza clasificación por nombre o por apellido
 */
import { Component, Input, OnInit, Output } from "@angular/core";
import { SortingModel } from "src/models/entities/sorting-model";
import { ApiService } from "../services/api-services.service";
import swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-sorting',
    templateUrl: 'sorting.component.html',
    styleUrls: ['sorting.component.css']
})

export class SortingComponent implements OnInit{

    @Output() sorting: SortingModel = new SortingModel();
    listData: any[]=[];
    auxName: string='';
    listSorting: any[]=[];
    dataSource:MatTableDataSource<any>;
    displayedColumns: string[] = ['Picture','Name','Blood Status','Gender'];

    constructor(
        private api: ApiService
    ){
        this.dataSource=new MatTableDataSource<any>(this.listSorting);
    }

    ngOnInit(){
        this.getData();
    }

    private launchNotification(title,icon){
        swal.fire({
          position: 'top-end',
          icon: icon,
          title: title,
          showConfirmButton: false,
          timer: 2000
        })
      }

    /**
     * se pregunta que si la clasificación es por nombre o si es por apellido
     * se llaman las funciones que hacen cada caso
     */
    schearData(){
        console.log( this.sorting.type.toLowerCase())
        if(this.sorting.type === '' || this.sorting.data === ''){
            this.launchNotification("Missing data to enter","error");
        }
        else{
           if( this.sorting.type.toLowerCase() === 'name'){
               this.getName();
           }
           if(this.sorting.type.toLowerCase() === 'last name'){
               this.getLastName();
           }
          
        }

    }

    /**
     * se hace llamado al servicio de la api, en este caso de todos los miembros
     * y se asignan a una lista 
     */
    getData(){
        this.api.getAllHouse().subscribe(data =>{
            data.forEach(element => {
                this.listData.push(element)
            });
        });
    }
    /**
     * se separa el nombre y el apellido el atributo name, en este caso se obtiene el nombre
     * para ser comparado con el dato ingresado y poder realizar la busqueda por  nombre
     */
    getName(){
        console.log(this.listData)
        this.listData.forEach(element =>{
            if(this.sorting.data.charAt(0).toUpperCase() + this.sorting.data.slice(1) === element.name){
                this.launchNotification("You must enter only the name","warning");
                this.clear();
            }
            else{
                this.auxName = element.name.split(" ");
            
                if(this.sorting.data.charAt(0).toUpperCase() + this.sorting.data.slice(1) === this.auxName[0]){
                    this.listSorting.push(element)
                }
                
               
            }
            
        })
        this.dataSource=new MatTableDataSource<any>(this.listSorting);
    }
     /**
     * se separa el nombre y el apellido el atributo name, en este caso se obtiene el apellido
     * para ser comparado con el dato ingresado y poder realizar la busqueda por  apellido
     */
    getLastName(){
        console.log(this.sorting.data)
        console.log(this.sorting.data.charAt(0).toUpperCase()  + this.sorting.data.slice(1))
        this.listData.forEach(element=>{
            if(this.sorting.data.charAt(0).toUpperCase() + this.sorting.data.slice(1) === element.name){
                this.launchNotification("You must enter only the last name","warning");
                this.clear();
            }
            else{
                this.auxName = element.name.split(" ");
                console.log(this.auxName[1])
                if(this.sorting.data.charAt(0).toUpperCase() + this.sorting.data.slice(1) === this.auxName[1]){
                    this.listSorting.push(element)
                }
                
            }
        })
        this.dataSource=new MatTableDataSource<any>(this.listSorting);
    }
    /**
     * se limpiar los datos para inicializar otra busqueda
     */

    clear(){
        this.sorting.type="";
        this.sorting.data="";
        this.listSorting= [];
    }
}