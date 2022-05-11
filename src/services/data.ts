/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import instance from './instance';
import { MaterialCategory } from '../Model/MaterialCategory';
import { Material } from '../Model/Material';
import { Units } from '../Model/Unit';
import { AttendanceMode } from '../Model/AttendanceModel';
import database from '@react-native-firebase/database';
import firebase from 'firebase';
import { Userdata } from '../Model/User';
import { ConfigMaterial } from '../Model/ConfigMaterialModel';
import { timeWork } from '../Model/TimeWork';
import DataService from './dataservice';
import { Assigment } from '../Model/Assignment';
import { Wages } from '../Model/Wages';
// import axios, {AxiosResponse} from 'axios';
class data{
static getRealTimeData (name: string)  {
    var resultArray: any [] = [];
    let temp :any = [];
    return database()
    .ref(`/${name}`)
    .on('value', snapshot => {
        for ( let key in  snapshot.val())
        {
            if ( key !== '0')
            {
                resultArray.push({
                    id: key ,
                    ...temp[key],
                });
            }
           // console.log('789',resultArray);
        }
        return resultArray;
    //   console.log('User data: ', snapshot.val());
    });
}
static async getdata( name: string) :Promise<any>
{
    return await
   instance.get(`/${name}.json`)
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
     instance.delete(`/${nametable}/${id}.json`).then(() =>{return true});
 }
static async newdeletedData (id : string, name: string, data: any)
{
    return await
    instance.post(`/${name}/${id}.json`,{
        ...data
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e);});
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
//Create Account
static async postAccount( data : Userdata)
{
    return await
    instance.post('/user.json',{
       username:data.username,
       password: data.password,
       phone: data.phone,
       service :data.service,
       type: data.type,
       Email:data.Email,
       Gender: data.Gender,
       Avatar: data.Avatar,
       Name: data.Name,
       dateofbirth: data.dateofbirth,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e);});
}
static async postAccountnew( data : any)
{
    return await
    instance.post('/user.json',{
        ...data
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e);});
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
        return true;
    }).catch((e)=>{console.log(e);});
}
static  async UpdateDatauserNew( phone: string, Email:string, Gender:string, Avatar: string, Name: string, dateofbirth: string, id: string )
{
    return await
    instance.patch(`/user/${id}.json`,{
       phone: phone,
       Email:Email,
       Gender: Gender,
       Avatar: Avatar,
       Name: Name,
       dateofbirth: dateofbirth,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e);});
}

static async updateuser (nametable : string, phone: string , Email:string, Gender:string, Avatar: string, Name: string, dateofbirth: string ,id:string ): Promise<any>
{
    return await
    instance.patch(`/${nametable}/${id}.json`,{
       phone: phone,
       Email:Email,
       Gender: Gender,
       Avatar: Avatar,
       Name: Name,
       dateofbirth: dateofbirth,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e);});
}
static async Patchuser (data: any ,id : string): Promise<any>
{
    return await
    instance.patch(`/user/${id}.json`,{
        ...data
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e);});
}



// Update Permission
static async updatePermission (id: string, _type: number) {
    return await
    instance.patch(`user/${id}.json`,{
        type: _type,
    }).then((response)=>{
        return true;
    })
    .catch((e)=>{
        console.log(e);
    });
}



// Service Product
static async postdataproduct(nametable : string, name:string , price: number, quanity: number, img: any,catergoryid: string, ListMaterial: any[]): Promise<any>
{
    return await
    instance.post(`/${nametable}.json`,{
        name_product: name,
        Price_product: price,
        Quanity: quanity,
        Image: img,
        CatergoryID:catergoryid,
        ListMaterial: ListMaterial,
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


static async updatedataproduct (nametable: string , id: string,  name:string , price: number, quanity: number, img:any, catergoryid:string, ListMaterial: any[]) : Promise<any>
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
        CatergoryID:catergoryid,
        ListMaterial: ListMaterial,
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
    }).catch((e)=>{console.log(e);});
 }


// Service TimeWork
static async PostTimeWork2 (data: timeWork )
{
   return await
   instance.post('/TimeWork.json',{
       ...data

   }).then(response=>{
       console.log(response.data);
       return true;
   }).catch((e)=>{console.log(e);});
}
static async PostTimeWork (nametable: string , NameTimeWork: string, day: string )
 {
    return await
    instance.post(`/${nametable}.json`,{
        Day: day,
        Name: NameTimeWork,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e);});
 }
 static async UpdateTimeWork (nametable: string , NameTimeWork: string ,day:any, id: string)
 {
    return await
    instance.put(`/${nametable}/${id}.json`,{
        Name: NameTimeWork,
        Day: day,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e);});
 }
 static async UpdateTimeWork2 (data : timeWork)
 {
    let {id ,...rest}= data;
    return await
    instance.put(`/TimeWork/${data.id}.json`,{
        ...rest
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e);});
 }
static async DeleteTimeWork (data : timeWork)
{
    try
    {
        let assignmentData = await DataService.Getdata_dtService<Assigment>(
            'Assignment',
          );
        if (assignmentData.length > 0)
        {
            assignmentData.map(x=>{
                if (x.Time === data.id)
                {
                    this.deletedData('Assignment',x.id)
                }
            })
        }
    }
    catch (e)
    {
        return false;
    }
    return await this.deletedData('TimeWork', data.id);
    
}


//Service Assignment

 static async deletedatAssignment (nametable: string, id: string) : Promise<any>
 {
     return await
     instance.delete(`/${nametable}/${id}.json`).then(() => console.log('Data deleted.'));
 }


 // Service Wages
 static async PostWages (EmployeeID: string , BasicSalary: number, TotalSalary: number, Time:number , Day: string,Content: string  )
 {
    return await
    instance.post('/Wages.json',{
        EmployeeID: EmployeeID,
        Day: Day,
        Time: Time,
        BasicSalary: BasicSalary,
        TotalSalary: TotalSalary,
        Content: Content,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e);});
 }
 static async putWages (id: string , data: any)
 {
    return await
    instance.patch(`/Wages/${id}.json`,{
        ...data
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e);});
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
    }).catch((e)=>{console.log(e);});
 }
 static async UpdateArea (name: string, id: string )
 {
    return await
    instance.put(`/Area/${id}.json`,{
        Name: name,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e);});
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
    }).catch((e)=>{console.log(e);});
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
    }).catch((e)=>{console.log(e);});
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
    }).catch((e)=>{console.log(e);});

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
    }).catch((e)=>{console.log(e);});

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
    }).catch((e)=>{console.log(e);});

 }
 static async UpdateBill (id:string , Total: number , BillId:string, CreaterID: string, status: number,TableID: string,createDate :any){
    return await
    instance.put(`/Bill/${id}.json`,{
         billID:BillId,
         Total: Total ,
         createrID: CreaterID,
         Status: status,
         TableID: TableID,
         CreateDate: createDate,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e);});

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
        Status: status,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e);});

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
    }).catch((e)=>{console.log(e);});

 }

 // Service Catergory
 static async PostCatergory (nameCatergory: string) {
    return await
    instance.post('/Catergory.json',{
        Name: nameCatergory,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e);});

 }
 static async UpdateCatergory (id: string , nameCatergory: string) {
    return await
    instance.put(`/Catergory/${id}.json`,{
        Name: nameCatergory,
    }).then(response=>{
        console.log(response.data);
        return true;
    }).catch((e)=>{console.log(e);});

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
    }).catch((e)=>{console.log(e);});
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
    }).catch((e)=>{console.log(e);});
 }
 //Service MaterialCatergory
static async PostMaterialCatergory (dataValue:MaterialCategory )
    {
        return await
        instance.post('/MaterialCatergory.json',{
            Name: dataValue.Name,
        })
        .then(response=>{
            if (response.data)
            {
                console.log(response.data);
                return true;
            }
        })
        .catch(e=> console.log(e));
    }
static async updateMaterialCatergory (dataValue:MaterialCategory )
    {
        return await
        instance.put(`/MaterialCatergory/${dataValue.id}.json`,{
            Name: dataValue.Name,
        })
        .then(response=>{
            if (response.data)
            {
                console.log(response.data);
                return true;
            }
        })
        .catch(e=> console.log(e));
    }
static async AddMaterial (value: Material){
    return await
        instance.post('Material.json',{
            Name: value.Name,
            Unit:value.Unit,
            Number: value.Number,
            Img: value.Img,
        })
        .then(response=>{
            if (response.data)
            {
                return response.data;
            }
        })
        .catch(e=>{console.log(e);});
    }
static async UpdateMaterial (value: Material, id : string){
        return await
            instance.put(`Material/${id}.json`,{
                Name: value.Name,
                Unit:value.Unit,
                Number: value.Number,
                Img: value.Img,
            })
            .then(response=>{
                if (response.data)
                {
                    console.log(response.data);
                    return true;
                }
            })
            .catch(e=>{console.log(e);});
    }

    static async AddUnit (value: Units){
        return await
            instance.post('Units.json',{
                Name: value.Name,
            })
            .then(response=>{
                if (response.data)
                {
                    console.log(response.data);
                    return true;
                }
            })
            .catch(e=>{console.log(e);});
        }
        static async  updateUnit (value: Units){
            return await
                instance.put(`Units/${value.id}.json`,{
                    Name: value.Name,
                })
                .then(response=>{
                    if (response.data)
                    {
                        console.log(response.data);
                        return true;
                    }
                })
                .catch(e=>{console.log(e);});
            }
    static async postLogAttendance (value :AttendanceMode){
        return await
        instance.post('LogAttendance.json',{
           userId: value.userId,
           time: value.time,
           date: value.date,
           type: value.type,
        })
        .then(response=>{
            if (response.data)
            {
                console.log(response.data);
                return true;
            }
        })
        .catch(e=>{console.log(e);});
    }
    static async putLogAttendance (value :AttendanceMode, id: string){
        return await
        instance.put(`LogAttendance/${id}.json`,{
           userId: value.userId,
           time: value.time,
           date: value.date,
           type: value.type,
        })
        .then(response=>{
            if (response.data)
            {
                console.log(response.data);
                return true;
            }
        })
        .catch(e=>{console.log(e);});
    }
    static async PostConfigMaterial (data : ConfigMaterial )
    {
        return await 
        instance.post('ConfigMaterial.json',{
            title: data.title,
            ListMaterial: data.ListMaterial
        })
        .then(response=>{
            if (response.data)
            {
                return true;
            }
        })
        .catch(e=>{console.log(e);})
    }
    static async PutConfigMaterial (data : ConfigMaterial, id: string )
    {
        return await 
        instance.patch(`ConfigMaterial/${id}.json`,{
            title: data.title,
            ListMaterial: data.ListMaterial
        })
        .then(response=>{
            if (response.data)
            {
                return true;
            }
        })
        .catch(e=>{console.log(e);})
    }
    static async PutProductMaterial ( id: string, val: any)
    {
        return await 
        instance.patch(`Products/${id}.json`,{
           ListMaterial: val
        })
        .then(response=>{
            if (response.data)
            {
                return true;
            }
        })
        .catch(e=>{console.log(e);})
    }

}


export default data;
