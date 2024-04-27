'use server'
export const GetData = async (token)=>{
    
    const res = await (await fetch(process.env.API_URL + 'authToken', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })).json()
    if (res.status != 200) return res
    //   console.log(request)
    return res
    
}
export const GetFetchAPI = async(url,authorization)=>{
    const response = await fetch(process.env.API_URL+url,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + authorization
        }
        
    })
    return await response.json();
}

export const PostFetchAPI = async(url,body,authorization)=>{
    const response = await fetch(process.env.API_URL+url,{
        method:'POST',
        body: JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + authorization
        }
        
    })
    return await response.json();
}