import axios from 'axios';
import {NextResponse} from 'next/server'

export async function GET(request) {
    const WoocommerceData = async () => {
        try {
            const responsedata = await axios.get('https://nipposh.com/wp-json/wc/v3/orders', {
                headers: {
                    'Authorization': 'Basic Y2tfMWNmODFkNWM2OWY1NDU0OTM3Mzg1ODUwNDNlNGI3OTNiYWViOWVkMjpjc18xZWUyMTQyMjI3NWM0YzZhNDRhOTE1YzAzYWQwOTg2MjFiOGZjNTE1'
                }
            });
            return responsedata.data;  // Return the data property
        } catch (error) {
            return { error: 'Error fetching data' };  // Return an error object
        }
    }

    try {
        const data = await WoocommerceData();
        return NextResponse.json({
            name: data
        });
    } catch (error) {
        return NextResponse.json({
            name: { error: 'Error processing data' }
        });
    }
}
