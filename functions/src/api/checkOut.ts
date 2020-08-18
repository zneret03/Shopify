import { app, db } from '../middleware/middleware'


export const checkOut = app.post('/api/checkOut/items', async(request : any, response : any) =>  {
    try {
        const subTotal = Number(request.body.subTotal);
        const document = db.collection('transaction').doc();
        
        return document.set({           
            firstName : request.body.firstName,
            lastName : request.body.lastName,
            email : request.body.email,
            address : request.body.address,
            subTotal : subTotal,
            region : request.body.activeRegion,
            province : request.body.province,
            zipcode : request.body.zipcode,
            itemsCheckout : request.body.pending
        }).then(() => {
            return response.status(200).send('Thank you for shopping :)');
        }).catch((error : any) => {
            return response.status(500).send(error.message);
        });
       
    } catch (error) {
        return response.status(500).send(error.message);
    }
});
