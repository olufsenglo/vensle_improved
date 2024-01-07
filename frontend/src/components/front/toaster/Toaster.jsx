import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    CLEAR_MESSAGE,
  } from "actions/types";


const Toaster = () => {
    const [ msgHolder, setMsgHolder ] = useState('');
    const dispatch = useDispatch();
    const message = useSelector(state => state.message);
console.log("msssssg",message?.message?.message)

/*	
	setTimeout(() => (
		dispatch({
			type: CLEAR_MESSAGE,
		})
	), 20000)

        dispatch({
		type: CLEAR_MESSAGE,
        });
*/


    return (
	    <div style={{top:"2rem", zIndex: "99", left: "46%"}} className="fixed">
		<p className="text-green-500">
	    		{message && message?.message?.type == "success" && message?.message?.message}
	    	</p>
	    </div>
    )
}



export default Toaster;
