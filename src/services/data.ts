/* eslint-disable prettier/prettier */
import instance from './instance';
import database from '@react-native-firebase/database';
import { produceWithPatches } from 'immer';
import { identifier } from '@babel/types';
// import axios, {AxiosResponse} from 'axios';
class data{
static async getdata( name: string) :Promise<any>
{  return await
   instance.get(`/${name}.json`,{timeout:2000})
    .then(response=>{
        return response.data;
    }).catch(error=>{
        console.log(error);
    });
}
static async getdata2( name: string) :Promise<any>
{  return await
   instance.get(`/${name}.json`,{timeout:2000})
    .then(response=>{
        // let data: any =[];
        // data = response.data
        return response;
    }).catch(error=>{
        console.log(error);
    });
}
static async deletedData (nametable: string, id: string) : Promise<any>
 {
     return await
     instance.delete(`/${nametable}/${id}.json`).then(() => console.log('Data deleted.'));
 }



// Service User
static async getuser(name:string , id: string) :Promise<any>
{
    return await 
        instance.get(`/${name}/${id}.json`,{timeout:2000})
        .then(response=>{
            return response.data;
        }).catch(error=>{
            console.log(error);
        });
}
 static  async postdatauser(name: string, username: string, password: string, phone: string, Email:string, Gender:string, Avatar: string, Name: string, type:Number, dateofbirth: string, service:string )
{
    return await
    instance.post(`/${name}/.json`,{
       username:username,
       password: password,
       phone: phone,
       service :service,
       type: type,
       Email:Email,
       Gender: Gender,
       Avatar: Avatar,
       Name: Name,
       dateofbirth: dateofbirth,
    }).then(response=>{
        console.log(response.data);
        return true
    }).catch((e)=>{console.log(e)});
}


static async updateuser (nametable : string, username: string, password: string, phone: string , Email:string, Gender:string, Avatar: string, Name: string, type:Number, dateofbirth: string, service:string ,id:string ): Promise<any>
{
    return await
    instance.put(`/${nametable}/${id}.json`,{
       username:username,
       password: password,
       phone: phone,
       service :service,
       type: type,
       Email:Email,
       Gender: Gender,
       Avatar: Avatar,
       Name: Name,
       dateofbirth: dateofbirth,
    }).then(response=>{
        console.log(response.data);
        return true
    }).catch((e)=>{console.log(e)});
}




// Service Product
static async postdataproduct(nametable : string, name:string , price: number, quanity: number, img: any,catergoryid: string): Promise<any>
{
    return await
    instance.post(`/${nametable}.json`,{
        name_product: name,
        Price_product: price,
        Quanity: quanity,
        Image: img,
        CatergoryID:catergoryid
    }).then(reponse=>{
        console.log(reponse);
        return true;
    }).catch((error)=>{
        console.log(error);
    }
    );
}
static async deletedataproduct (nametable: string, id: string) : Promise<any>
{
    return await
    instance.delete(`/${nametable}/${id}.json`).then(() => console.log('Data deleted.'));
}


static async updatedataproduct (nametable: string , id: string,  name:string , price: number, quanity: number, img:any, catergoryid:string) : Promise<any>
{
    // if (name !== '')
    // {
    //     await
    //     database().ref(`/${nametable}/${id}`).update(
    //     {
    //         name_product: name,
    //     }).then(() => console.log('Data updated.'));
    // }
    //  if (price > -1)
    // {
    //     await
    //     database().ref(`/${nametable}/${id}`).update(
    //     {     Price_product: price,
    //     }).then(() => console.log('Data updated.'));
    // }
    //  if (quanity > -1)
    // {
    //     await
    //     database().ref(`/${nametable}/${id}`).update(
    //     {   Quanity : quanity,
    //     }).then(() => console.log('Data updated.'));
    // }
    // if ( img != null)
    // {
    //     await
    //     database().ref(`/${nametable}/${id}`).update(
    //     {  Image : img,
    //     }).then(() => console.log('Data updated.'));
    // }
    return await
    instance.put(`/${nametable}/${id}.json`,{
        name_product: name,
        Price_product: price,
        Quanity: quanity,
        Image: img,
        CatergoryID:catergoryid
    }).then(reponse=>{
        console.log(reponse);
        return true;
    }).catch((error)=>{
        console.log(error);
    }
    );

}
 static async PostAssigment (nametable: string , EmployeeID: any, TimeWorkID: any, day:string)
 {
    return await
    instance.post(`/${nametable}.json`,{
        Day: day,
        EmployeeID: EmployeeID,
        Time: TimeWorkID,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});
 }


// Service TimeWork
static async PostTimeWork (nametable: string , NameTimeWork: string, day: string )
 {
    return await
    instance.post(`/${nametable}.json`,{
        Day: day,
        Name: NameTimeWork,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});
 }
 static async UpdateTimeWork (nametable: string , NameTimeWork: string ,day:any, id: string)
 {
    return await
    instance.put(`/${nametable}/${id}.json`,{
        Name: NameTimeWork,
        Day: day
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});
 }



//Service Assignment

 static async deletedatAssignment (nametable: string, id: string) : Promise<any>
 {
     return await
     instance.delete(`/${nametable}/${id}.json`).then(() => console.log('Data deleted.'));
 }


 // Service Wages
 static async PostWages (EmployeeID: string , BasicSalary: number, TotalSalary: number, Time:number , Day: string  )
 {
    return await 
    instance.post('/Wages.json',{
        EmployeeID: EmployeeID,
        Day: Day,
        Time: Time,
        BasicSalary: BasicSalary,
        TotalSalary: TotalSalary,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});
 }




 // Service Area
 static async postArea (nameArea: string)
 {
    return await 
    instance.post('/Area.json',{
        Name: nameArea,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});
 }
 static async UpdateArea (name: string, id: string )
 {
    return await 
    instance.put(`/Area/${id}.json`,{
        Name: name,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});
 }
 static async DeleteArea (id :string )
 {
    return await
    instance.delete(`/Area/${id}.json`).then(() => console.log('Data deleted.'));
 }




 // Servicew Table
 static async postTable (name: string, type: string, slots: number, status: number)
 {
    return await 
    instance.post('/Table.json',{
        Name: name,
        Type: type,
        Slots: slots,
        Status: status,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});
 }
 static async UpdateTable (name: string, id: string ,type: string, slots: number, status: number)
 {
    return await 
    instance.put(`/Table/${id}.json`,{
        Name: name,
        Type: type,
        Slots: slots,
        Status: status,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});
 }




 // Service ListProduct
 static async UpdateListProduct (id: string, ProductId: string , BillId:string, Number: number, createdate:any){
    return await 
    instance.put(`/ListProduct/${id}.json`,{
       productID: ProductId,
       billID:BillId,
       Number: Number,
       CreateDate: createdate,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});

 }
 static async PostListProduct (ProductId: string , BillId:string, Number: number,createdate:any){
    return await
    instance.post('/ListProduct.json',{
       productID: ProductId,
       billID:BillId,
       Number: Number,
       CreateDate: createdate,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});

 }
 static async DeleteListProduct (id :string )
 {
    return await
    instance.delete(`/ListProduct/${id}.json`).then(() => console.log('Data deleted.'));
 }



 // Service Bill
 static async PostBill (Total: number , BillId:string, CreaterID: string, status: number,createDate :any,tableID: string){
    return await 
    instance.post('/Bill.json',{
         billID:BillId, 
         Total: Total ,
         createrID: CreaterID, 
         Status: status,
         CreateDate: createDate,
         TableID : tableID,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});

 }
 static async UpdateBill (id:string , Total: number , BillId:string, CreaterID: string, status: number,TableID: string,createDate :any){
    return await 
    instance.put(`/Bill/${id}.json`,{
         billID:BillId, 
         Total: Total ,
         createrID: CreaterID, 
         Status: status,
         TableID: TableID,
         CreateDate: createDate
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});

 }
//  static async UpdateStatusBill (id:string,  status: number){
//     return await 
//     instance.put(`/Bill/${id}.json`,{
//          Status: status,
//     }).then(response=>{
//         console.log(response.data);
//         return true;
//     }).catch((e)=>{console.log(e)});

//  }


 // Service BookTable
 static async PostBookTable (customerName: string , bookDate: any, bookTime:any, slots:number,tableID:string,status:number) {
    return await 
    instance.post('/BookTable.json',{
        CustomerName: customerName,
        BookDate: bookDate,
        BookTime: bookTime,
        Slots: slots,
        TableID: tableID,
        Status: status
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});

 }
 static async UpdateBookTable (id: string ,customerName: string , bookDate: any, bookTime:any, slots:number, tableID:string, status:number) {
    return await 
    instance.put(`/BookTable/${id}.json`,{
        CustomerName: customerName,
        BookDate: bookDate,
        BookTime: bookTime,
        Slots: slots,
        TableID: tableID,
        Status: status,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});

 }

 // Service Catergory
 static async PostCatergory (nameCatergory: string) {
    return await 
    instance.post('/Catergory.json',{
        Name: nameCatergory,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});

 }
 static async UpdateCatergory (id: string , nameCatergory: string) {
    return await 
    instance.put(`/Catergory/${id}.json`,{
        Name: nameCatergory,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});

 }


 //Service Expense

 static async PostExpense (name: string , content: string ,total: number, createDate: any){
    return await 
    instance.post('/Expense.json',{
        Name: name,
        Content: content,
        Total: total,
        CreateDate: createDate,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});
 }
 static async UpdateExpense (id: string ,name: string , content: string ,total: number, createDate: any){
    return await 
    instance.put(`/Expense/${id}.json`,{
        Name: name,
        Content: content,
        Total: total,
        CreateDate: createDate,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e)});
 }
}
export default data;
