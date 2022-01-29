import { useEffect, useState } from "react";
import { warehouses } from "../data";
import Item from "./Item";

function Home() {

    const [warehouse_obj, setWareHouseObject] = useState(warehouses);
    const [cityFilter, setCityFilter] = useState(false);
    const [spaceFilter, setSpaceFilter] = useState(false);
    const [detailView, setDetailView] = useState(false);
    const [currObj, setCurrObj] = useState({});
    useEffect(() => {

        setWareHouseObject(warehouse_obj);

    }, [warehouse_obj, currObj]);
    let detailViewObject = null;
    let save = (id) => {
        var index = warehouses.findIndex(function (o) {
            return o.id === id;
        })
        if (index !== -1) warehouses.splice(index, 1);
        warehouses.push(currObj);
        setDetailView(false);
    }
    let toggleDetails = () => {
        setDetailView(true);


    }
    let search = (query) => {
        console.log(query);
        if (query == "") {
            setWareHouseObject(warehouses);
        }
        setWareHouseObject(warehouses.filter((elem) => {
            return elem.name.toUpperCase().match(query.toUpperCase());
        }))
    }
    let searchCity = (query) => {
        console.log(query);
        setCityFilter(true);
        if (query == "Filter City" || query == "" || query == null) {
            setWareHouseObject(warehouses);
        }
        setWareHouseObject(warehouses.filter((elem) => {
            return elem.city.toUpperCase() == query.toUpperCase();
        }))
    }
    let searchSpace = (query) => {
        console.log(query);
        setSpaceFilter(true);
        if (query == "Filter Space" || query == "" || query == null) {
            setWareHouseObject(warehouses);
        }
        setWareHouseObject(warehouses.filter((elem) => {
            return elem.space_available == query;
        }))
    }
    return (
        <div className="App">
            <header className="App-header">
                {!detailView && <>
                    <h1>Warehouses</h1>
                    <p style={{fontSize:"medium"}}>List of Warehouses currently saved in our System</p>
                    <div className="controls">
                        <input className="searchBox" type="text" placeholder="Search here" onKeyUp={(e) => { search(e.target.value); }} />
                        <div className="flexBox">

                            <select onChange={(e) => { searchCity(e.target.value) }} className="searchBox">
                                <option>Filter City</option>
                                {[...new Set(warehouses.map(item => item.city))].map(wh => {
                                    return <option >{wh}</option>
                                })}
                            </select>
                        </div>
                        <div className="flexBox">

                            <select onChange={(e) => { searchSpace(e.target.value) }} className="searchBox">
                                <option>Filter Space</option>
                                {[...new Set(warehouses.map(item => item.space_available))].map(wh => {
                                    return <option>{wh}</option>
                                })}
                            </select>
                        </div>
                        {cityFilter && <button className="button" onClick={(e) => { setCityFilter(false); setWareHouseObject(warehouses); }}>Remove City Filter</button>}
                        {spaceFilter && <button className="button" onClick={(e) => { setSpaceFilter(false); setWareHouseObject(warehouses); }}>Remove Space Filter</button>}
                    </div>
                    <ul>
                        {warehouse_obj.map(wh => {

                            return <Item wh={wh} setCurr={setCurrObj} call={toggleDetails} name={wh.name} code={wh.code} city={wh.city} space={wh.space_available}
                                type={wh.type} />
                        })}
                    </ul>
                </>}
                {detailView && <div className="detailView" style={{background:"#fff",padding:"25px", boxShadow:"0 0 5px 5px lightgray"}}>
                    <h1>{currObj.name}</h1>
                    <h3>Details</h3>
                    <p style={{fontSize:"medium"}}>Warehouse details are given below. You can edit them and click on save to modify.</p>
                    <div className="flexBox" >
                        <div>
                            <h5>Name</h5>
                            <input type="text" onKeyUp={(e) => { currObj.name = e.target.value; }} placeholder={currObj.name} className="searchBox" />
                        </div>

                        <div>
                            <h5>City</h5>
                            <input type={"text"} onKeyUp={(e) => { currObj.city = e.target.value }} placeholder={currObj.city} className="searchBox" />
                        </div>
                        <div>
                            <h5>Space available</h5>
                            <input type={"text"} onKeyUp={(e) => { currObj.space_available = e.target.value }} placeholder={currObj.space_available} className="searchBox" />
                        </div>
                    </div>
                    <br/>
                    <button onClick={(e) => { save(currObj.id) }} className="searchBox" >Save Details</button>
                </div>}
            </header>
        </div>
    );
}

export default Home;
