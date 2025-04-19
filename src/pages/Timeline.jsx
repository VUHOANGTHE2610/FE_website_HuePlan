import TimelineTabs from '../components/Timeline/TimelineTabs';
// Dữ liệu giả lập cho nhiều ngày
const Timeline = () =>{
    return(
        <div className="p-4 max-w-screen-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-purple-700">Lịch trình của bạn</h1>
            <TimelineTabs />
        </div>
    );
}
export default Timeline;