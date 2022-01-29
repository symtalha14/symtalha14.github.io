
function Item(props) {
    
    return (
        <li onClick={(e)=>{props.call();props.setCurr(props.wh);}}>
            <div className="top_bar">
                <span style={{color:"navy", fontWeight:"bold", textDecoration:"upperCase"}}>{props.type}</span>
                <span  style={{color:"green", fontWeight:"bold", textDecoration:"upperCase"}}>{props.city}</span>
            </div>
            <h2>{props.name}</h2>
            <div className="bottom_bar">
                <span  style={{color:"crimson", fontWeight:"bold", textDecoration:"upperCase"}}>
                    Space: {props.space}
                </span>
                <span  style={{color:"gray", fontWeight:"bold", textDecoration:"upperCase"}}>
                   {props.code}
                </span>
            </div>
        </li>
    );
}

export default Item;
