import { useEffect, useState} from "react";
import Image from "next/image";
import axios from "axios";
import styles from '@/styles/Home.module.css'
import Link from "next/link";
import { data } from "autoprefixer";

export default function Polychromatic(){

    const [image, setImage] = useState([]);
    const [images, setImages] = useState([]);
    const [time, setTime] = useState('Loading');
    const [date , setDate] = useState('');
    const [coords, setCoords] = useState({});
    const [data, setData] = useState(2);

    var apiKey =process.env.NEXT_PUBLIC_apiKey;
    const url= `https://epic.gsfc.nasa.gov/api/natural?api_key=${apiKey}`

    const getPolychromaticData = async () => {
        const res = await axios.get(url);
        const data = await res.data;
        console.log(data);
        
        const caption = data[0].caption;
        const date = data[0].date.split(" ")[0];

        const date_formatted = date.replaceAll("-", "/");
        console.log(date_formatted);

        let times = [];
        let images = [];

        for(let i = 0; i < data.length; i++){
            let time = data[i].date.split(" ")[1];
            let coords = data[i].centroid_coordinates;
            let imagePath = data[i].image;
            let image = `https://epic.gsfc.nasa.gov/archive/natural/${date_formatted}/png/${imagePath}.png`;

            times.push(time);
            images.push({
                image:image,
                time:time,
                coords:coords
            })
        }

        setDate(date);
        setImages(images);

        setImage(images[data].image);
        setTime(time[data]);
        setCoords([images[data].coords.lat, images[data].coords.lon]);
        console.log(image);
        
    }
    
    useEffect(() => {
    getPolychromaticData();
    }, [])

    return (
        <div className={styles.main} style={{backgroundColor:'#0E0E10'}}>
            {/* <h1>Polychromatic</h1>
            <Image src={image} alt={image} width={200} height={200}/>
            <div>{time}</div>
            <div>{coords[0]}, {coords[1]}</div> */}

            <Link href='/' style={{boxShadow:'4px 4px 0px rgb(255 255 255)'}} className='w-52 text-center border-4 border-solid border-white p-4 font-bold text-white bg-black'> BACK TO PATENTS </Link>

            {images ? (<div>{images[data].coords.lat}</div>) : (<div>loading</div>)}

            <table>
                {/* <thead>
                    <tr>
                        <th>Time</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Image</th>
                        <th></th>
                    </tr>
                </thead> */}
                <tbody>
                <div className={styles.container}> 
                    {images.map((e, index) => {
                        return (
                            <tr key={index} style={{boxShadow:'8px 8px 0px rgb(255 255 255 / 1)'}} className='flex justify-center items-center flex-col text-white border-solid border-8 border-white p-10 m-8 bg-black hover:shadow-none max-h-full'>
                                
                                <div className='flex flex-col m-4 justify-start items-start float-left'>
                                <td><div className='text-xs text-gray-400'>Time</div>{e.time}</td>
                                <td><div className='text-xs text-gray-400'>Lat</div>{e.coords.lat}</td>
                                <td><div className='text-xs text-gray-400'>Lon</div>{e.coords.lon}</td>
                                </div>
                                <td><Image src={e.image} alt={e.image} style={{boxShadow:'4px 4px 0px rgb(255 255 255 / 1)', borderRadius:'80%'}} className='w-52 h-full object-cover border-4 border-solid border-white
                                'width={200} height={200}/></td>
                                <td><button onClick={() => {e
                                    setImage(image.image);
                                    setTime(image.time);
                                    setCoords([image.coords.lat, image.coords.lon]);
                                    console.log(images[i].image);
                                    document.body.scrollIntoView();
                                }}>View</button></td>
                            </tr>
                        )
                    })}
                </div>
                    
                </tbody>
            </table>
            
        </div>
    )
}