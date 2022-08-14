import React, { useEffect, useState } from "react";
import "./card.css";
import axios from "axios";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import InfiniteScroll from 'react-infinite-scroll-component';


export default function List() {

    const [data, setData] = useState([]);
    const [attack, setattack] = useState([]);
    const [ability, setability] = useState([]);

    const size = 3
    const totalcount = 10
    // let apiCallInit = true;

    useEffect(() => {
        getalldata()
    }, [])


    const getalldata = () => {
        let pageno = Math.ceil(data.length / size) + 1
        axios.get('https://api.pokemontcg.io/v2/cards?page=' + pageno + '&pageSize=' + size)
            .then(responce => {
                const apires = responce.data.data
                const mergedata = [...data, ...apires]
                setData(mergedata)
               
               
                // for (let index of data) {
                //     for(let i of index.abilities){
                //         ability.push(i.name)
                //         console.log("ability")
                //         console.log(i)
                //      }
                //      for(let i of index.attacks){
                //         attack.push(i.name)
                //         console.log("attack")
                //         console.log(i)
                //      }
                // }
            


               console.log(mergedata)
            });
    }


    return (
        <div className="mainclass">
            <InfiniteScroll
                dataLength={data.length}
                next={getalldata}
                hasMore={data.length < totalcount}
                loader={<h4>Loading...</h4>}
            >

                <div className="row">
                    {data.map(((entry) => (
                        <div key={entry.id} className="col-sm-4 anotherclass">
                            <div className="card">
                                <div>
                                    <img src={entry.images.small} alt="images" width="100%" />
                                </div>
                                <div className="innerclass">
                                        <span>{entry.name}</span>
                                        <span>HP:{entry.hp}</span>
                                    </div>
                            </div>

                        </div>


                    )))}
                </div>
            </InfiniteScroll>




        </div>


    )
}
