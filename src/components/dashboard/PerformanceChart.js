import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue} from "firebase/database";
import { useState } from 'react';
import { HeatmapLoading } from '../heatmap/HeatmapLoading';
import {CanvasJSChart} from 'canvasjs-react-charts'


export const PerformanceChart = () => {

    const state = useSelector(state => state.userReducer);

    const [data, setdata] = useState([]);
    const [data2, setdata2] = useState([]);
    var averageSubmission = [];
    var userSubmissionData = [];

    // const tempdata = [];
    function comp1(a,b){
        if(a.label>b.label)
        return -1;
        else
        return 1;
    }
    useEffect(() => {
        if(data.length === 0)
        {
            // console.log("1st useeffect");
            const db = getDatabase();
        const totalUsersRef=ref(db,'users');
        var date=new Date();
        let tmpGraphData=[];
        let totalUsers=0;
        let totalSubmission=0;
        

        //testing
        onValue(totalUsersRef,(snapshot)=>{
            const data = snapshot.val();
            totalUsers = Object.keys(data).length;
            // console.log(Object.keys(data).length);
        }, {
            onlyOnce: true
        })
        // console.log(totalUsers);
        // find all the submission count done by user in previous 30 days.
        

        // average submission detail 
        var d2 = new Date();
        
        for(let i2=0;i2<30;i2++)
        {
            let month1 = d2.getMonth()+1;
            if(month1<10)
            month1 = '0'+month1;
            let date1 = d2.getDate();
            if(date1<10)
            date1 = '0'+date1;
            let year1 = d2.getFullYear().toString();
            const enc_date = btoa(month1+'/'+date1+'/'+year1);
            const path = 'average/'+enc_date;
            const ref2 = ref(db,path);
            onValue(ref2,(snapshot)=>{
                const data2 = snapshot.val();
                // month1+'/'+date1+'/'+year1.substr(2,3)
                if(data2 === null)
                averageSubmission.push({label : (year1+'/'+month1+'/'+date1).substr(2,8),y:1});
                else
                averageSubmission.push({label : (year1+'/'+month1+'/'+date1).substr(2,8),y:Math.ceil(data2.totalsubmission/totalUsers)});
            });
            d2.setDate(d2.getDate()-1);
        }
        var d = new Date();
        for(let i=0;i<30;i++)
        {
            let month = d.getMonth()+1;
            if(month<10)
            month = '0' + month;
            let date = d.getDate();
            if(date<10)
            date = '0'+date;
            let year = d.getFullYear().toString();
            const enc_date = btoa(month+'/'+date+'/'+year);
            const path = 'submission/'+state.user.uid+'/'+enc_date;
            const ref1 = ref(db,path);
            onValue(ref1,(snapshot)=>{
                const data1 = snapshot.val();
                // month+'/'+date+'/'+year.substr(2,3)
                if(data1 === null)
                userSubmissionData.push({label:(year+'/'+month+'/'+date).substr(2,8),y:0});
                else
                userSubmissionData.push({label:(year+'/'+month+'/'+date).substr(2,8),y:Object.keys(data1).length});
            },{
                onlyOnce : true
            });
            d.setDate(d.getDate()-1);
        }

        }
    },[])

    useEffect(() => {
        
        if(data.length === 0)
        {
            // console.log("2nd useeffect");
            if(averageSubmission.length != 30 || userSubmissionData.length != 30)
        {
            setTimeout(()=>{
                if(averageSubmission.length != 30 || userSubmissionData.length != 30)
                {
                    setTimeout(()=>{
                        if(averageSubmission.length != 30 || userSubmissionData.length != 30)
                        {
                            setTimeout(()=>{
                                userSubmissionData.sort(comp1);
                                averageSubmission.sort(comp1);
                                // console.log(userSubmissionData);
                                setdata(userSubmissionData);
                                setdata2(averageSubmission);
                            },5000);
                        }
                        else
                        {
                            userSubmissionData.sort(comp1);
                            averageSubmission.sort(comp1);
                            // console.log(userSubmissionData);
                            setdata(userSubmissionData);
                            setdata2(averageSubmission);
                        }
                    },1500);
                }
                else
                {
                    // setTimeout(()=>{
                        // console.log(userSubmissionData);
                        // console.log("----");
                        // console.log(averageSubmission);
                        userSubmissionData.sort(comp1);
                        averageSubmission.sort(comp1);
                        // console.log(userSubmissionData);
                        setdata(userSubmissionData);
                        setdata2(averageSubmission);
                    // },5000);
                }
            },1000);
        }
        }
        // console.log(userSubmissionData);
        // console.log(averageSubmission);

    }, [])



    if(data.length === 30 && data2.length == 30)
    {
        
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            zoomEnabled: true, 
            theme: "light2", // "light1", "dark1", "dark2"
            title:{
                text: "User vs Average submissions :"
            },
            axisY: {
                title: "Number of submissions",
                suffix: ""
            },
            axisX: {
                title: "Date(YY/MM/DD)",
                prefix: "",
                interval: 2
            },
            data: [{
                type: "line",
                showInLegend: true, 
                legendText: "User submissions",
                toolTipContent: "Date {label}: {y}",
                dataPoints: data
            },
            {
                type: "line",
                showInLegend: true, 
                legendText: "Average submissions",
                toolTipContent: "Date {label}: {y}",
                dataPoints: data2
            }
        ]
        }

        // console.log(data3);
        return (
            <div>
                <CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
            </div>
        )
    }
    else{
        return(
            <HeatmapLoading/>
        )
    }
    
}
