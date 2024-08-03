import React, { useState } from 'react';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import './App.css';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const handleDefaultSelectCustomer = (customer: any) => {
    setSelectedCustomer(customer);
  };


  return (
    <div className="flex h-screen">
      <>
        <CustomerList
          onSelectCustomer={setSelectedCustomer}
          selectedCustomer={selectedCustomer}
          onDefaultSelectCustomer={handleDefaultSelectCustomer}
        />
      </>
    </div>
  );
};

export default App;
