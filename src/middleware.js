import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const SetUserRole = async (token) => {
    // console.log('this is token '+token);
    const res = await (await fetch(process.env.API_URL + 'authToken', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })).json()
    if (res.status != 200) return false
    //   console.log(request)
    return res.data





}
export const middleware = async (request) => {
    const token = request.cookies.get('token').value;
    let user = request.cookies.get('loginData')
    if (!token) return NextResponse.redirect(new URL('/dashboard', request.url))
    if (token && !user) {
        const data = await SetUserRole(token)
        if (!data) return NextResponse.redirect(new URL('/dashboard', request.url))
        await request.cookies.set('loginData', JSON.stringify(data))
        user = request.cookies.get('loginData').value
    }


    console.log(user);





}
export const config = {
    matcher: [
        '/admin',
        '/admin/:path*',
        '/vender',
        '/vender/:path*',

    ],
}
