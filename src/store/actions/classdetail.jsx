// import {
//     CLASS_DETAIL,    
// } from './actionTypes'

// import axios from 'axios';

// export const classDetailSuccess = (data) => {      
//     return {
//         type: CLASS_DETAIL,  
//         payload: data,        
//     }
// }

// export const classDetail = () => {            
//     return dispatch => {        
//         axios.get('https://sxyo02wmp4.execute-api.ap-south-1.amazonaws.com/dev/courses/getcourses', {
//             headers: {'accesstoken': localStorage.getItem("token")}
//           })            
//             .then(res => dispatch(classDetailSuccess(res['data'])))
//             .catch(err => console.log(err))
//     }        
// }

