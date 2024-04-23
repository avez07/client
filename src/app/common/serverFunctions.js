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