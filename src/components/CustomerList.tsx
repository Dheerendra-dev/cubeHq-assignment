import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toProperNameFormat } from '../utils/FormatName';
import CustomerDetails from './CustomerDetails';
import Loader from './Loader';

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
    picture: {
        thumbnail: string;
    };
}

interface CustomerListProps {
    onSelectCustomer: (customer: Customer) => void;
    onDefaultSelectCustomer: (customer: Customer) => void;
    selectedCustomer: Customer | null;
}

const CustomerList: React.FC<CustomerListProps> = ({ onSelectCustomer, selectedCustomer, onDefaultSelectCustomer }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomerIndex, setSelectedCustomerIndex] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10;

    const fetchCustomersList = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get<{ results: { user: Customer }[] }>('https://randomuser.me/api/0.8/?results=100');
            const customerData = response.data.results.map(result => result.user);
            setCustomers(customerData);
            if (customerData.length > 0) {
                setSelectedCustomerIndex(0);
                onDefaultSelectCustomer(customerData[0]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    }, []);

    useEffect(() => {
        fetchCustomersList();
    }, [fetchCustomersList]);

    const handleSelectCustomer = (index: number, customer: Customer) => {
        setSelectedCustomerIndex(index);
        onSelectCustomer(customer);
    };

    const paginatedCustomers = customers.slice(
        (currentPage - 1) * customersPerPage,
        currentPage * customersPerPage
    );

    const handlePageChange = (direction: 'prev' | 'next') => {
        setCurrentPage(prevPage => {
            if (direction === 'prev') {
                return Math.max(prevPage - 1, 1);
            } else {
                return Math.min(prevPage + 1, Math.ceil(customers.length / customersPerPage));
            }
        });
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className='h-screen w-screen flex  justify-center items-center'>
                        <div className="w-[300px] shadow-md bg-gray-100 overflow-y-auto  rounded-sm">
                            {paginatedCustomers.map((customer, index) => (
                                <div
                                    key={index}
                                    className={`p-4 border-b cursor-pointer ${selectedCustomerIndex === index ? 'bg-blue-200' : ''}`}
                                    onClick={() => handleSelectCustomer(index, customer)}
                                >
                                    <h3 className="text-lg">{toProperNameFormat(customer.name)}</h3>
                                    <p className="text-gray-600">{customer.title}</p>
                                </div>
                            ))}
                            <div className="flex justify-center p-4">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white"
                                    onClick={() => handlePageChange('prev')}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <button
                                    className="px-4 py-2 ml-2 bg-blue-500 text-white"
                                    onClick={() => handlePageChange('next')}
                                    disabled={currentPage >= Math.ceil(customers.length / customersPerPage)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                        {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
                    </div>
                </>
            )}
        </>
    );
};

export default CustomerList;
