// import React from "react";
// import MiniDrawer from "../../../components/SideMenu/SideMenu";
// import AnchorTemporaryDrawer from '../../../components/MobileSideMenu/MobileSideMenu'
// import "./social-media.css";
// import progressAnimation from '../../../component-assets/progressAnimation.json';
// import SideBarMenu from "../../../components/NewSideMenu/NewSideMenu";
// import { useState, useEffect } from "react";
// import axios from "axios";
// // import Header from "../../../components/header/header";
// import FacebookLogin from 'react-facebook-login';
// import supabase from "../../../supabase";

// const SocialMedia=()=> {

//   const [selectedFile, setSelectedFile] = useState(null);

//     const responseFacebook = (response) => {
//       console.log('FACEBOOK SDK RESPONSE',response);
//       // Handle the response from Facebook login here
//     };


//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       // Make a POST request to the Graph API to upload the file
//       const response = await axios.post(
//         `https://graph.facebook.com/2651837188309953/photos`,
//         formData,
//         {
//           params: {
//             access_token: 'EAANNECmoxmABO671C6Q3narVYAulssu0TZBLizYlO3uCYqmoBc4YfjBOqZBq2AmnkJ7fSBq9VkwAZAyixKWaQDZASHW8gT3SJfLrabuBK4gmYjOz44KRpxsMG5z1rzqO20WOBErR3FpkUYYrB0V64eNv5mjeU9vZBAxZACUijCkaAfCatwRc4B6NSZBVr7AaFAwWHTaKhx0AXQWiHRoZAsYY35xudgu1zIyS0Ppxt0i9bdLTevQUIZBwZB',
//             caption: 'Uploaded from my React app!',
//           },
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       console.log('Upload successful:', response.data);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   useEffect(() => {
//     window.fbAsyncInit = function() {
//       console.log('APP ID', '929156743874144');
//       // eslint-disable-next-line no-undef
//       FB.init({
//         appId: '929156743874144',
//         cookie: true,
//         xfbml: true,
//         version: 'v13.0'
//       });
//       console.log('Facebook SDK initialized successfully!');
//     };

//     (function(d, s, id) {
//       var js, fjs = d.getElementsByTagName(s)[0];
//       if (d.getElementById(id)) return;
//       js = d.createElement(s); js.id = id;
//       js.src = "https://connect.facebook.net/en_US/sdk.js";
//       fjs.parentNode.insertBefore(js, fjs);
//     }(document, 'script', 'facebook-jssdk'));
//   }, []);

// //MealMaster@123
//   return (
//     <div className="social-media-container">
//     <div className = "mobileSideMenu">
//     <AnchorTemporaryDrawer />
//     </div>
//     <div className="sideBarMenu">
//         <SideBarMenu currentPage='/social-media'/>
//     </div> 
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//     {window.FB && (
//         <FacebookLogin
//           appId='929156743874144'
//           autoLoad={false}
//           fields="name,email,picture"
//           callback={responseFacebook}
//           scope="pages_manage_posts" // Request the 'pages_manage_posts' permission
//           icon="fa-facebook"
//           textButton="Login with Facebook"
//         />
//       )}
//     </div>

//   );
// }

// export default SocialMedia;
