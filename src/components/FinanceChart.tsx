"use client"
import Image from 'next/image';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan', // Capitalized for better display
    income: 4000,
    expence: 2400,
  },
  {
    name: 'Feb',
    income: 3000,
    expence: 1398,
  },
  {
    name: 'Mar',
    income: 2000,
    expence: 9800,
  },
  {
    name: 'Apr',
    income: 2780,
    expence: 3908,
  },
  {
    name: 'May',
    income: 1890,
    expence: 4800,
  },
  {
    name: 'Jun',
    income: 2390,
    expence: 3800,
  
  },
  {
    name: 'Jul',
    income: 3490,
    expence: 4300,

  },
  {
    name: 'Aug',
    income: 3490,
    expence: 4300,

  },
  {
    name: 'Sep',
    income: 3490,
    expence: 4300,

  },
  {
    name: 'Oct',
    income: 3490,
    expence: 4300,
  
  },
  {
    name: 'Nov',
    income: 3490,
    expence: 4300,
  
  },
  {
    name: 'Dec',
    income: 3490,
    expence: 4300,
  
  },
];

const FinanceChart = () => {
    return(
        // Outer container: Added p-4 for padding and ensures it uses full available height
        <div className='bg-white rounded-xl w-full flex flex-col p-4 h-full'> 
              
            {/* Header / Title Section */}
            <div className='flex justify-between items-center mb-4'>
              <h1 className="text-xl font-semibold text-gray-800">Finance Overview</h1>
              {/* Assuming /moreDark.png exists. If not, this icon will be missing. */}
              <Image src="/moreDark.png" alt="More options" width={20} height={20} className='cursor-pointer'/>
            </div>

            {/* Chart Container: Uses flex-grow to take up remaining space */}
            <div className='flex-grow'> 
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  // Removed width and height as ResponsiveContainer manages them
                  margin={{
                    top: 5,
                    right: 30,
                    left: 0, // Adjusted left margin from -20 to 0 for better visibility
                    bottom: 5,
                  }}
                >
                  {/* Customizing Grid and Axes for clean look */}
                  {/* UPDATED: Changed stroke color to gray (#cccccc) and removed vertical={false} to show vertical lines */}
                  <CartesianGrid strokeDasharray="3 3" stroke="#cccccc" /> 
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `$${(value/1000).toFixed(1)}k`} // Formatting Y-axis for currency
                  />
                  <Tooltip 
                      cursor={{ stroke: '#9ca3af', strokeWidth: 1 }} // Light gray cursor line
                      formatter={(value, name) => [`$${new Intl.NumberFormat('en')}`, name === 'income' ? 'Income' : 'Expense']} // Formatting tooltip values
                      labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }}/>
                  
                  {/* Line colors remain unchanged */}
                  <Line 
                      type="monotone" 
                      dataKey="income" 
                      name="Income" 
                      stroke="#6495ED" // High-contrast green
                      strokeWidth={3} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 8 }} 
                  />
                  <Line 
                      type="monotone" 
                      dataKey="expence" 
                      name="Expense" 
                      stroke="#800080" // High-contrast red
                      strokeWidth={3} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
        </div>
    )
}
export default FinanceChart