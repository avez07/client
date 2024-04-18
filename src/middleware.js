'use server'
import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const SetUserRole = async (token) => {
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
    const token = request.cookies.get('token');
    let user = await request.cookies.get('loginData')
//   console.log(user)
    if (!token) return NextResponse.redirect(new URL('/authentication/login', request.url))
    if (token && !user) {
        const data = await SetUserRole(token.value)
        if (!data) return NextResponse.redirect(new URL('/dashboard', request.url))
        await request.cookies.set('loginData', JSON.stringify(data))
    user = await JSON.parse(request.cookies.get('loginData').value)
}
// console.log(user)
    if (token && user) {
        const redirect = user.role == 'admin' ? '/admin' : user.role == 'vender' ? '/vender' : '/dashboard'
        if (request.nextUrl.pathname == '/') return NextResponse.redirect(new URL(redirect, request.url))
        if (request.nextUrl.pathname.startsWith('/admin') && user.role == 'admin') return NextResponse.next()
        if (request.nextUrl.pathname.startsWith('/vender') && user.role == 'vender') return NextResponse.next()
        if (request.nextUrl.pathname.startsWith('/dashboard') && user.role == 'user') return NextResponse.next()
        return NextResponse.redirect(new URL(redirect, request.url))
    }
}
export const config = {
    matcher: [
        '/',
        '/dashboard/:path+',
        '/admin',
        '/admin/:path*',
        '/vender',
        '/vender/:path*',

    ],
}
