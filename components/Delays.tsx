
// import { useState, useEffect } from 'react';
// import { Text, View } from 'react-native';
// import config from "../config/config.json";

// function StockList() {
//     const [products, setProducts] = useState([]);
    
//     useEffect(() => {
//         fetch(`${config.base_url}/stations`)
//         .then(response => response.json())
//         .then(result => setProducts(result.data));
//     }, []);
    
//     const list = products.map((product, index) => <Text key={index}>{ product.AdvertisedLocationName }</Text>);
  
//     return (
//       <View>
//         {list}
//       </View>
//     );
// }

// export default function Stock() {
//     return (
//     <View>
//         <Text style={{color: '#333', fontSize: 24}}>La</Text>
//         <StockList/>
//     </View>
//     );
// }