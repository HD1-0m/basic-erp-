"use client"

import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

const data = [
   {
    name: 'Total',
    count: 100,
    fill: 'white',
  },
  {
    name: 'Girls',
    count: 40,
    fill: '#8884d8',
  },
  {
    name: 'Boys',
    count: 60,
    fill: '#0096FF',
  }
];

// Define the style object for the Legend wrapper
const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

const CountChart = () => {
  return(
    <div className='bg-white rounded-xl w-full flex flex-col h-full'> 
      
      {/* Container for Title */}
      <div className='px-4 pt-4'>
        {/*title*/}
        <div className='flex justify-between items-center mb-4'>
          <h1 className="text-xl font-semibold text-gray-800">Students</h1>
          {/* Assuming /moreDark.png exists. If not, this icon will be missing. */}
          <Image src="/moreDark.png" alt="More options" width={20} height={20} className='cursor-pointer'/>
        </div>
      </div>
      
      {/* Chart container - Contains the Recharts component. */}
      {/* Ensures horizontal padding (px-4) and some bottom padding (pb-4) */}
      <div className=' relative w-full h-[75%]' style={{ height: 300 }}> 
        <ResponsiveContainer>
        <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            dataKey="count"
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <Image src={"/maleFemale.png"} alt='' width={50} height={50} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
      </div>
      
      {/* Corrected Manual Bottom Legend for Boys/Girls (assuming these colors map to primary/primaryLite) */}
      <div className='pb-4'>
        <div className='flex justify-center gap-12 px-4'>
          
          {/* Boys Legend Item */}
          <div className='flex items-center gap-2'>
            {/* Using a standard w-3 h-3 marker, not w-5 h-5 containing text */}
            <div className='w-3 h-3 bg-indigo-600 rounded-full'></div> 
            {/* Note: I'm using a placeholder indigo color since 'bg-primary' is undefined here */}
            
            <div className='flex flex-col'>
              <h1 className='text-lg font-bold text-gray-800 leading-tight'>12</h1>
              <h2 className='text-xs text-gray-500'>Boys (13%)</h2>
            </div>
          </div>
          
          {/* Girls Legend Item */}
          <div className='flex items-center gap-2'>
            {/* Using a standard w-3 h-3 marker */}
            <div className='w-3 h-3 bg-indigo-300 rounded-full'></div> 
            {/* Note: I'm using a placeholder light indigo color since 'bg-primaryLite' is undefined here */}
            
            <div className='flex flex-col'>
              <h1 className='text-lg font-bold text-gray-800 leading-tight'>18</h1>
              <h2 className='text-xs text-gray-500'>Girls (11%)</h2>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
export default CountChart;