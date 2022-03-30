import CalendarHeatmap from 'react-calendar-heatmap';
import "./heatmap.css";
import { getDatabase,ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';
import React,{ useState,useEffect } from 'react'
import { HeatmapLoading } from './HeatmapLoading';

export const Heatmap = () => {
    const state = useSelector(state=>state.userReducer);
    const [datelist, setdatelist] = useState([]);
    const tempdatelist = [];
    useEffect(() => {
        // console.log("here");
        const db = getDatabase();
        const d=new Date();
        for(var i=0;i<365;i++)
        {
            let month = d.getMonth()+1;
            if(month<10)
            month = '0'+month;
            let date = d.getDate();
            if(date<10)
            date = '0'+date;
            const currdate = d.getFullYear()+'-'+month+'-'+date;
            const currdate2 = month+'/'+date+'/'+d.getFullYear();
            const enc_date = btoa(currdate2);
            const dateref = ref(db,'submission'+'/'+state.user.uid+'/'+enc_date);
            onValue(dateref,(snapshot)=>{
                const data = snapshot.val();
                // console.log(data);
                if(data === null)
                tempdatelist.push({date:currdate,count:0});
                else
                {
                    tempdatelist.push({date:currdate,count:Object.keys(data).length});
                }
            },{
                onlyOnce : true
            });
            d.setDate(d.getDate()-1);
        };
        if(datelist.length!=365)
        {
            setTimeout(()=>{
                // console.log(tempdatelist)
                if(tempdatelist.length === 365)
                setdatelist(tempdatelist);
                else{
                    setTimeout(()=>{
                        if(tempdatelist.length === 365)
                        {
                            // console.log("second timeout!!")
                            setdatelist(tempdatelist);
                        }
                        else
                        {
                            setTimeout(()=>{
                                    // console.log("third timeout!!")
                                    setdatelist(tempdatelist);
                            },5000);
                        }
                    }, 1000);
                }
            },1000);
        }
    }, []);
    
    const d=new Date();
    let startdate = "";
    let enddate = "";
    for(var i=0;i<365;i++)
    {
        var month = d.getMonth()+1;
        var currdate = d.getFullYear()+'-'+month+'-'+d.getDate();
        if(enddate === "")
        enddate = currdate;
        startdate = currdate;
        // datelist.push({date:currdate,count:2})
        d.setDate(d.getDate()-1);
    }
    // console.log(startdate,enddate);
    // const t = datelist;

    return (
        <>
        {/* {console.log(datelist)} */}
        {/* datelist.sort() */}
        {datelist.length==365 ?
            <CalendarHeatmap
            startDate={startdate}
            endDate={enddate}
            values={datelist}
            classForValue={(value) => {
                if (!value) {
                    return 'color-empty';
                }
                else if(value.count<10)
                return `color-scale-${value.count}`;
                else
                return `color-scale-10`;
                }}
            tooltipDataAttrs = {(value) => { return { 'data-tooltip': 'Tooltip: ' + value } }}
            titleForValue = {(value) =>`Date : ${value.date} submission : ${value.count}`}
            /> :<HeatmapLoading></HeatmapLoading>
        }
        </>
    )
}