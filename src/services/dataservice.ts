/* eslint-disable prettier/prettier */
import data from './data';
class DataService  {
    static async  Getdata_dtService<T>(name: string) : Promise<T []> {
        var resultArray: any [] = [];
        let temp :any = [];
        temp = await data.getdata(name);
         console.log('789456temp',temp);
        for ( let key in  temp)
        {
            if ( key !== '0')
            {
                resultArray.push({
                    id: key ,
                    ...temp[key],
                })
            }
           // console.log('789',resultArray);
        }
      
        return resultArray;
    }
    static async  Getdata_dtServiceById<T>(name: string,id: string) : Promise<T> {
        let item;
        let temp :any =[];
        temp = await data.getdata(name);
        for ( let key in  temp)
        {
            if ( key !== "0" && key === id)
            {
                item = {
                    id: key,
                    ...temp[key]
                }
                console.log(item);
                break;
            }
           // console.log('789',resultArray);
        }
       return item;
    }
    // static async Updatedata_dtService<T>(name: string, data: T, id: string): Promise<boolean>
    // {

    // }
}
export default DataService;