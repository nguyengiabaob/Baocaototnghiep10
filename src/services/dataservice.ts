/* eslint-disable prettier/prettier */
import data from './data';
class DataService  {
    static async  Getdata_dtService<T>(name: string) : Promise<T []> {
        var resultArray: any []=[];
        let temp :any =[];
        temp = await data.getdata(name);
        for ( let key in  temp)
        {
            if ( key !== "0")
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
}
export default DataService;