"use client"

// Import necessary Recharts components, including Rectangle for activeBar
import { 
    ResponsiveContainer, 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    Rectangle, // <-- Added Rectangle import
    ReferenceLine 
} from 'recharts';
import Image from 'next/image';

const data = [
  {
    name: 'Mon', // Corrected typo 'MOn' to 'Mon'
    present: 60,
    absent: 40, // Values should be positive for a standard bar chart
  },
  {
    name: 'Tue',
    present: 89, // Changed from negative to positive for attendance
    absent: 11,
  },
  {
    name: 'Wed',
    present: 80, // Changed from negative to positive
    absent: 20, // Changed from negative to positive
  },
  {
    name: 'Thu',
    present: 85,
    absent: 15,
  },
  {
    name: 'Fri', // Corrected typo 'fri' to 'Fri'
    present: 40, // Changed from negative to positive
    absent: 60,
  },
  {
    name: 'Sat',
    present: 45,
    absent: 55, // Changed from negative to positive
  },
  {
    name: 'Sun', // Changed 'Page G' to 'Sun' for consistency
    present: 50,
    absent: 50,
  },
];

const AttendenceChart = () => {
    return(
        // The outer div now just provides styling
        <div className='bg-white rounded-xl w-full flex flex-col p-4 h-full'>
            
            {/* Header / Title Section */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold text-gray-800">Attendance</h1>
                <Image src="/moreDark.png" alt="More options" width={20} height={20} className='cursor-pointer'/>
            </div>
            
            {/* Chart Container - Updated to h-full to fill the parent 450px height */}
            <div className="flex-grow h-full"> 
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        barSize={40} 
                        margin={{
                            top: 20, 
                            right: 30,
                            left: -10, 
                            bottom: 5,
                        }}
                    >
                        {/* Keeping original grid, axes, and tooltip styling */}
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" /> 
                        <XAxis dataKey="name" tickLine={false} axisLine={false} /> 
                        <YAxis tickLine={false} axisLine={false} /> 
                        <Tooltip 
                            cursor={{ fill: '#f1f5f9' }} 
                            separator=": "
                            formatter={(value, name) => [value + '%', name]} 
                        />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }}/>
                        
                        {/* Updated dataKeys to match the data array (present, absent), re-added stackId, and included activeBar */}
                        <Bar 
                            dataKey="present" 
                            name="Present (%)" 
                            fill="#6495ED" 
                            stackId="stack" 
                            radius={[4, 4, 0, 0]} 
                            activeBar={<Rectangle fill="#8A2BE2" stroke="#6495ED" />} // Custom active bar for Present
                        /> 
                        <Bar 
                            dataKey="absent" 
                            name="Absent (%)" 
                            fill="#800080" 
                            stackId="stack" 
                            radius={[4, 4, 0, 0]} 
                            activeBar={<Rectangle fill="" stroke="#0096FF" />} // Custom active bar for Absent
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
export default AttendenceChart
