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

export const UnRetuenFunc = async(url,body,authorization)=>{
    const response = await fetch(process.env.API_URL+url,{
        method:'POST',
        body: body,
        headers:{
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + authorization
        }
        
    })
    if(response.ok) return 'suceess'
}
export const PostApi = async(url,body,authorization)=>{
    const response = await fetch(process.env.API_URL+url,{
        method:'POST',
        body: body,
        headers:{
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + authorization
        }
        
    })
    console.log(process.env.API_URL)
    console.log(body)
    console.log(response)

    
     return await response.json()
       
    
}