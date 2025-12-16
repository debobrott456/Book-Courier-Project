import React, {  useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'


const Coverage = ({datas}) => {
    console.log(datas)
    const mapRef=useRef();
    
    const position = [23.6850,
90.3563]
const formhandler =(e)=>{
e.preventDefault();
const location=e.target.location.value;
const district=datas.find(data=>data.district.toLowerCase().includes(location.toLowerCase()))
console.log(district)
if(district){
   const coord=[district.latitude,district.longitude] 
   console.log(coord)
   mapRef.current.flyTo(coord)
}

}
//jjjjjjjj}
    return (
        <div>
            <form onSubmit={formhandler} className='relative'>
                <label className="input absolute -top-15 right-2 m-3 w-[280px] border-blue-300">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" name="location" required placeholder="Search"   />
</label>
            </form>
            <div className='w-5xl h-[700px] mx-auto'>
             <MapContainer center={position} zoom={13} scrollWheelZoom={false}
             className='h-[700px]'
             ref={mapRef}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
   {datas.map(data=> <Marker key={data.district} position={[data.latitude,data.longitude]}>
      <Popup>
       <p>{data.district}</p> 
       <p>service area : {data.covered_area.join(', ')}</p>
      </Popup>
    </Marker>)}
  </MapContainer>
        </div></div>
    );
};

export default Coverage;