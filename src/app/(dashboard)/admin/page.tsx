import AttendenceChart from "@/components/AttendenceChart"
import CountChart from "@/components/CountCharts"
import EventCalender from "@/components/EventCalender"
import FinanceChart from "@/components/FinanceChart"
import UserCard from "@/components/UserCard"


const AdminPage = () => {
    return(
        <div className='p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
            
            {/*left*/}
            <div className="w-full lg:w-2/3 flex flex-col space-y-4"> 
                
                {/* 🌟 UserCard Row: Changed 'justify-between' to 'justify-start' and ADDED 'gap-4' 🌟
                    This creates a consistent, professional space between cards. */}
                <div className="flex justify-start gap-4 flex-wrap"> 
                    <UserCard type="student"/>
                    <UserCard type="teacher"/>
                    <UserCard type="parent"/>
                    <UserCard type="staff"/>
                </div>
                
                {/* Mid Charts Section */}
                <div className="flex flex-col lg:flex-row gap-4"> 
                    
                    {/* counts chart (CountChart is placed directly inside its container) */}
                    <div className="w-full lg:w-1/3 h-[450px]">
                        <CountChart/> 
                    </div>
                    
                    {/* attendence */}
                    <div className="w-full lg:w-2/3 h-[450px]">
                        <AttendenceChart/>
                    </div>
                </div>

                {/*bottom charts*/}
                <div className="w-full h-[500px]">
                    <FinanceChart/>
                </div>
                
            </div>
            
            {/*right*/}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
            <EventCalender/>
            </div>
        </div>
    )
}
export default AdminPage