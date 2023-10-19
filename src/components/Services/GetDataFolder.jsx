
import { getRequest } from "../../Request";


async function GetFolderOrDocData (id){
    var data = await  getRequest({url : `https://dmstest.hexaworks.com/viewstore/${id}?pagenumber=1&countperpage=50`}).then(resp => {
        return resp.data;
    }).catch(ex => {
        console.log(String(ex))
    });

    return data;
}

async function GetRootFolder(){

    var data = await  getRequest({url : "http://dmstest.hexaworks.com/viewstore?pagenumber=1&countperpage=50"}).then(resp => {
        return resp.data;
    }).catch(ex => {
        console.log(String(ex))
    });

    return data;
    
   
}


export {GetRootFolder,GetFolderOrDocData}