import React from 'react'
import { ref,onValue, getDatabase } from 'firebase/database'
import { useSelector } from 'react-redux';

export const TotalSubmission = () => {
    const db = getDatabase();
    const state = useSelector(state => state.userReducer);
    const dbref = ref(db,`users/${state.user.uid}`);
    var totalSubmission = undefined;
    onValue(dbref,(snapshot)=>{
        const data = snapshot.val();
        // console.log(data)
        if(data !== null)
        totalSubmission = data.total;
    },{
        onlyOnce : true
    })
    return (
        <div>
            {totalSubmission === undefined ? <>Loading...</> : totalSubmission}
        </div>
    )
}
