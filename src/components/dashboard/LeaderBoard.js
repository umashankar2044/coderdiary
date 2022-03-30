import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { getDatabase, ref, query, orderByChild, onValue, orderByValue} from "firebase/database";
import { useEffect,useState } from 'react';
import { LeaderBoardLoading } from './LeaderBoardLoading';

export const LeaderBoard = () => {
    const [leaderboardData, setleaderboardData] = useState(null);
    useEffect(() => {
        const db = getDatabase();
        const mostViewedPosts = query(ref(db, 'users'), orderByChild('total'));
        let tmpData=[]; 
        onValue(mostViewedPosts,(DataSnapshot)=>{
            DataSnapshot.forEach((data)=>{
                let obj={
                    name:data.val().email,
                    rank:0,
                    score:data.val().total
                }
                tmpData.push(obj);
            })
            tmpData=tmpData.reverse();
            let i=1;
            tmpData.forEach((data)=>{
                data.rank=i;
                i++;
            })
            // console.log(tmpData);
            setleaderboardData(tmpData);
        })
    }, [])
    const columns = [{
        dataField: 'name',
        text: 'Name',
        headerFormatter: nameFormatter,
        // headerStyle: {
        //     backgroundColor: '#c8e6c9'
        //   }
      }, {
        dataField: 'rank',
        text: 'Rank',
        headerFormatter: rankFormatter,
        // headerStyle: {
        //     backgroundColor: '#c8e6c9'
        //   }
      }, {
        dataField: 'score',
        text: 'Total Questions Solved',
        headerFormatter:scoreFormatter,
        // headerStyle: {
        //     backgroundColor: '#c8e6c9'
        //   }
    }];
    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
          Showing { from } to { to } of { size } Results
        </span>
    );
    const options = {
        pageButtonRenderer,
        sizePerPageList: [{
          text: '4', value: 4
        }] // A numeric array is also available. the purpose of above example is custom the text
      };     
    return (
        <>
        {
          leaderboardData!=null ? <>
            <div class="alert alert-warning" role="alert">
              <b>LEADERBOARD</b>
        </div>
        <div className="leaderboard">
            
            <BootstrapTable keyField='rank' /*caption={<CaptionElement />}*/ data={leaderboardData}
            columns={ columns } pagination={ paginationFactory(options) }  bordered={ false }
            hover
            // rowStyle={ rowStyle }
            />
        </div>
        </>:
        <LeaderBoardLoading></LeaderBoardLoading>
        }
        
        </>
        
    )
}
const CaptionElement = () => <h3  className="leaderboard-title">LeaderBoard</h3>; 

function rankFormatter() {
    return (
    //   <h5><strong>$$ { column.text } $$</strong></h5>
         <><i class="fas fa-trophy"></i>Rank</>
    );
}
function nameFormatter(column, colIndex) {
    return (
    //   <h5><strong>$$ { column.text } $$</strong></h5>
         <><i class="fa fa-user" aria-hidden="true"></i>Name</>
    );
}
function scoreFormatter(column, colIndex) {
    return (
    //   <h5><strong>$$ { column.text } $$</strong></h5>
         <><i class="fas fa-star"></i>Score</>
    );
}

//buttons

const pageButtonRenderer = ({
    page,
    active,
    disable,
    title,
    onPageChange
  }) => {
    const handleClick = (e) => {
      e.preventDefault();
      onPageChange(page);
    };
    const activeStyle = {
        "border-radius":"50%",
        "display": "inline-block",
        "height": "30px",
        "width": "30px",
        "text-align":"center",
        "margin-left":"4px"
    };
    if (active) {
      activeStyle.backgroundColor = '#0ECA2D';
      activeStyle.color = 'white';
    } else {
      activeStyle.backgroundColor = '#2699ab';
      activeStyle.color = 'black';
    }
    if (typeof page === 'string') {
      activeStyle.backgroundColor = 'grey';
      activeStyle.color = 'black';
    }
    return (
      <li className="page-item">
        <a href="#" onClick={ handleClick } style={ activeStyle }>{ page }</a>
      </li>
    );
  };
  
  const rowStyle = (row, rowIndex) => {
    const style = {};
    if (row.rank%2==0) {
      style.backgroundColor = '#b2f5ea';
    }
    return style;
  };
