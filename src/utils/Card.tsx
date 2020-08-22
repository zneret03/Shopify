import React from 'react';
import {withRouter} from 'react-router-dom';

interface PropsType {
    filteredItems : any,
    history : any
}

const Card :React.SFC<PropsType> = ({filteredItems, history}) => {


    const getProductId = (event : React.MouseEvent<HTMLDivElement, MouseEvent>, id : string) => {
        event.preventDefault();
        if(id){
            history.push(`/shop/collection/the_merch/item?id=${id}`);
        }
    }

    return(
        <div className="grid grid-rows md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item : any) => (
            item.quantity > 0 ? (
                <div className="border mt-5 mr-2 cursor-pointer" 
                key={item.id} 
                onClick={(event) => getProductId(event, item.id)}>
                    <div className="py-6 px-12 bg-gray-200">
                            <img className="sm:w-64 sm:h-64 object-contain mx-auto" src={item.imageUrl} alt=""/>
                    </div>
                    <div className="px-4 py-2 font-segoe-UI">
                        <div className="flex items-center justify-between">
                            <span className="block text-xs text-gray-600 mb-4">{item.purpose}</span>
                            <span className="block text-xs text-gray-600 mb-4">{item.quantity}</span>
                        </div>
                        <span className="block text-xs text-gray-600 uppercase tracking-wide mb-1">{item.product}</span>
                        <div className="flex items-center justify-between">
                            <span className="text-black text-xs text-gray-800">₱{item.price.toLocaleString()}</span>
                            <span className="block text-xs text-gray-800 uppercase">{item.gender}</span>
                        </div>
                    </div>
                </div>
            ) : (
                null
            )
        ))}
    </div>
    );
}

export default withRouter(Card);