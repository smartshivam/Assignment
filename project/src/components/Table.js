import React from "react";
import './Table.css'
const Table=props=>{
    const table= props.contents.map(item=><tr className="table-row">
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.country}</td>
        <td>{item.image.map((img)=><img src={img} key={img} height={50} width={50} />)}</td>
        <td>{item.highlights.toString()}</td>
        <td>{item.description}</td>
        
    </tr>)
    return(

        <div>
        <table className="detail_table">
            <thead className="table_head">
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Country</td>
                <td>Image</td>
                <td>Highlights</td>
                <td>Description</td>
            </thead>
            {table}
        </table>
        
        </div>
    )
}
export default Table