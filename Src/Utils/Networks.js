import { base_url } from "./AppFeatures"


export const UserLoginwithGmail=async(body)=>{
    return await PostDataWithoutToken(body,'/Auth-User/Signup'); 
}


const PostDataWithoutToken=async(bodydata,url)=>{
    try{
        console.log('--body-PostDataWithoutToken--',bodydata)
        const resp=await fetch(base_url+url,{
            method:'POST',
            headers:{
                'content-type': 'application/json',
                'Accept': '*/*'
            },
            body:bodydata
        })
        const json=await resp.json();
        console.log('--PostDataWithoutToken--',json)
        return json;
    }
    catch(Err)
    {
        console.log('--Err--',Err)
    }
}