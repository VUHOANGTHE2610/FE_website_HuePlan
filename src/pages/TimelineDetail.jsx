import TimelineTabs from '../components/Timeline/TimelineTabs';
import Header from '../components/Common/Header'
import { useParams } from 'react-router-dom';

const TimelineDetail = () =>{
    const { timelineId } = useParams();
    return(
        <div>
        <Header/>
            <div className="p-4 max-w-screen-lg mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-purple-700" >Lịch trình của bạn</h1>
            <TimelineTabs timelineId={timelineId} />
        </div>
        </div>

    );
}
export default TimelineDetail;