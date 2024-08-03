import React from 'react';
import PhotoGrid from './PhotoGrid';
import { toProperNameFormat } from '../utils/FormatName';

interface Customer {
    name: {
        first: string;
        last: string;
        title: string;
    };
    title: string;
    location: {
        street: string;
        city: string;
        state: string;
        zip: number;
    };
}

interface CustomerDetailsProps {
    customer: Customer;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
    if (!customer) return null;
    const { street, city, state, zip } = customer?.location;
    return (
        <div className="w-2/3 p-3 bg-gray-50 shadow-md ml-2 ">
            <h3 className="text-4xl">{toProperNameFormat(customer?.name)} </h3>
            <h4 className="text-xl text-gray-600">{customer?.title}</h4>
            <p>{street}, {city}, {state} - {zip}</p>
            <PhotoGrid />
        </div>
    );
};

export default CustomerDetails;
