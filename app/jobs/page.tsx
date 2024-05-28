"use client"
import { FC, useEffect, useState } from 'react';
import JobListings from './components/jobListings';
import { ComboboxDemo } from './components/testDialog';




const page: FC = () => {
 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Job Listings</h1>
      <div className="gap-2">
        <ComboboxDemo />
       <JobListings />
      </div>
    </div>
  );
};

export default page;
