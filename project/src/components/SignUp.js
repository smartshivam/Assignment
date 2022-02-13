import React from "react";
import { useState, useRef } from "react";
import Table from "./Table";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";


import  './SignUp.css'

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [country, setCountry] = useState("");
  const [highlightText, sethighlightText] = useState("");
  const [highlights, sethighlights] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [contents, setContents] = useState([]);
  const [table, setTable] = useState("");
  const [addData, setAddData] = useState("");
  const imageInputRef = React.useRef();


  const nameChangeHandle = (e) => {
    setName(e.target.value);
  };
  const emailChangeHandle = (e) => {
    setEmail(e.target.value);
  };
  const phoneChangeHandle = (e) => {
    setPhone(e.target.value);
    console.log(phone);
  };
  const countryChangeHnadle = (e) => {
    setCountry(e.target.value);
  };
  const highlightsChangeHandle = (e) => {
    sethighlightText(e.target.value);
  };
  const addHighlight = (e) => {
    e.preventDefault();
    let temp = highlights;
    temp.push(highlightText);
    sethighlights(temp);
    sethighlightText("");
  };
  const clearHighlight = (e) => {
    e.preventDefault();
    sethighlights([]);
  };

  const imageHandleChange = (e) => {
    //image change handle//
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedFile((prevImage) => prevImage.concat(fileArray));
    }
  };
  //image render//
  const renderPhotos = (source) => {
    return source.map((photo) => {
      return <img src={photo} key={photo} height={50} width={50} />;
    });
  };
  const editorChangeHandle = (e, editor) => {
    const data = editor.getData();
    setAddData(data);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    if (name == "") {
      alert("please enter your name");
    } else if (email == "") {
      alert("please enter your email");
    } else if (phone == null) {
      alert("please enter your phone number");
    } else if (country == "") {
      alert("select country");
    } 
    else if(highlights==''){
        alert('type your highlights')
    }
    else if(selectedFile==''){
        alert('please select image')
    }
    else if(addData==''){
        alert('please write description')
    }
    else {
      let myObj = {
        name: name,
        email: email,
        phone: phone,
        country: country,
        image: selectedFile,
        highlights: highlights,
        description: ReactHtmlParser(addData),
      };
      let tempContent = contents;
      tempContent.unshift(myObj);
      setContents(tempContent);
      // alert(contents.length)
      setTable(<Table contents={contents} />);
     
      setName("");
      setEmail("");
      setPhone("");
      setCountry("");
      setAddData('');
      sethighlights([]);
      setSelectedFile([])
      imageInputRef.current.value = "";

    
    }
  };

  return (
    <div >
      <center>
        <form >
          <h1>FORM</h1>
          <table  className="form-table">
            <tr>
              <td className="form-label">
                <label>Name</label>
              </td>
              <td>:</td>
              <td className="form-input">
                <input type="text" value={name} onChange={nameChangeHandle} />
              </td>
            </tr>
            <tr>
              <td className="form-label">
                <label>Email</label>
              </td>
              <td>:</td>
              <td className="form-input">
                <input
                  type="email"
                  value={email}
                  onChange={emailChangeHandle}
                />
              </td>
            </tr>
            <tr>
              <td className="form-label">
                <label>Phone</label>
              </td>
              <td>:</td>
              <td className="form-input">
                <input
                  type="number"
                  value={phone}
                  onChange={phoneChangeHandle}
                />
              </td>
            </tr>
            <tr>
              <td className="form-label">
                <label>Country</label>
              </td>
              <td>:</td>
              <td className="form-input">
                <select value={country} onChange={countryChangeHnadle}>
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                  <option value="America">America</option>
                  <option value="China">China</option>
                  <option value="Pakistan">Pakistan</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="form-label">
                <label>Highlights</label>
              </td>
              <td>:</td>
              <td className="form-input">
                <input
                  type="text"
                  value={highlightText}
                  onChange={highlightsChangeHandle}
                />
                <button className="highlight-btn" onClick={addHighlight}>Add More</button>
              
              <button className="highlight-btn" onClick={clearHighlight}>Clear Highlights</button>
            
              {highlights.map((item) => (
                <li>{item}</li>
              ))}
            
              </td>
                
            </tr>
            <tr>
              <td className="form-label">
                <label>Select Image</label>
              </td>
              <td>:</td>
              <td className="form-input" >
                <input ref={imageInputRef} className="image-input" type="file" multiple onChange={imageHandleChange} />
                {renderPhotos(selectedFile)}
              </td>
            </tr>
            <tr>
              <td>
                <label className="form-label">Description</label>
              </td>
              <td>:</td>
              <td className="form-input">
                <CKEditor
                  editor={ClassicEditor}
                  data={addData}
                  onChange={editorChangeHandle}
                />
              </td>
            </tr>
           <tr>
              <td colSpan='3' style={{textAlign:'center'}}>
                <button className="sub-btn" onClick={submitHandle}> Submit</button>
              </td>
            </tr>
          </table>
        </form>
        {table}
      </center>
    </div>
  );
};
export default SignUp;
