import {useState, useEffect} from 'react';
import { Redirect, useParams  } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

import './style.css';

import logo from '../../images/logo.png';
import profileIcon from '../../images/icons/person.svg';
import entrepreneurIcon from '../../images/icons/entrepreneur.svg';
import stagiaireIcon from '../../images/icons/stagiaire.svg';
import freelancerIcon from '../../images/icons/freelancer.svg';




function FreelancerComp(){
    const {id} = useParams();
    const [isLoading, setLoading] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [user, setUser] = useState();
    const [freelancer, setFreelancer] = useState();
   

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://stagiaire.herokuapp.com/api/freelancer/show/' + id, {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{
            console.log(res);
            setFreelancer(res.data);
            setLoading(false);
        })
        .catch(err => {console.log(err)})
        axios.get('https://stagiaire.herokuapp.com/api/user', {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{console.log(res);
            setUser(res.data);
            setLoading2(false);
        })
        .catch(err => {console.log(err)})
    }, []);

    function handelUserNav(){
        let element = document.getElementById("userNav");
        if (element.style.display === "none")
            element.style.display="block";
        else
            element.style.display="none";
        
    }
    document.addEventListener("click", function(evt) {
        let flyoutEl = document.getElementById('user'),
          targetEl = evt.target; // clicked element      
        do {
          if(targetEl === flyoutEl) {
            // This is a click inside, does nothing, just return.
           console.log("click inside");
            return;
          }
          // Go up the DOM
          targetEl = targetEl.parentNode;
        } while (targetEl);
        // This is a click outside.
        if (document.getElementById("userNav") && document.getElementById("userNav").style.display === "block")
            document.getElementById("userNav").style.display = "none";
      });

    
    const isLogged = localStorage.getItem('token');
    if (!isLogged || isLogged === undefined) {return (<Redirect to="/login" />)}

    if (isLoading || isLoading2) {
            return <div className="App">Loading...</div>;
    }
    if (!isLoading && !isLoading2 && freelancer)
    {
        var stageBox = null
        if (freelancer.Active === 0)
            stageBox = <div id="stageNotActive" className="stageStatus"><p id="boxstagiaireactive1">Not Active</p><p id="boxstagiaireactive2"> &#10007;</p></div>
        if (freelancer.Active === 1 && freelancer.Finir === 0)
            stageBox = <div id="stageActive" className="stageStatus"><p>in progress</p><p> &#9991;</p></div>
        if (freelancer.Active === 1 && freelancer.Finir === 1 && freelancer.Attestation === 0)
            stageBox = <div id="stageOver" className="stageStatus"><p id="boxstagefinshed1">Over</p><p  id="boxstagefinshed2"> &#10003;</p></div>
        if (freelancer.Active === 1 && freelancer.Finir === 1 && freelancer.Attestation === 1)
            stageBox = <div id="stageFineshd" className="stageStatus"><p> Finshed </p><p> &#10003;</p></div>
        var Attestation = null
        if (freelancer.Active === 0)
            Attestation = <div id="activeSctiveButton" className="stageButton"><button onClick={activeStagiaire}>Active</button></div>
        if (freelancer.Active === 1 && freelancer.Finir === 1 && freelancer.Attestation === 0)
            Attestation = <div id="attestationStagiaireButtoon" className="stageButton"><button onClick={attestationStagiaire}>Attestation</button></div>
        if (freelancer.Active === 1 && freelancer.Finir === 1 && freelancer.Attestation === 1)
            Attestation = <div className="stageFile"><p>Attestation</p></div>
    }

    function activeStagiaire(){
        console.log(freelancer.id);
        const token = localStorage.getItem('token');
        const url = "https://stagiaire.herokuapp.com/api/freelancer/active/" + freelancer.id;
        axios.get(url, {headers: {"Authorization": `Bearer ${token}`}})
         .then(res =>{
                document.getElementById("activeSctiveButton").style.display="none";
                document.getElementById("stageNotActive").style.backgroundColor="#117DB0";
                document.getElementById("boxstagiaireactive1").innerText="in progress";
                document.getElementById("boxstagiaireactive2").innerText="✓";
        })
         .catch(err => {console.log(err)})
    }
    function attestationStagiaire(){
        const token = localStorage.getItem('token');
        const url = "https://stagiaire.herokuapp.com/api/freelancer/attestation/" + freelancer.id;
        axios.get(url, {headers: {"Authorization": `Bearer ${token}`}})
         .then(res =>{
                document.getElementById("attestationStagiaireButtoon").style.display="none";
                document.getElementById("stageOver").style.backgroundColor="#11B03E";
                document.getElementById("boxstagefinshed1").innerText="finshed";
                document.getElementById("boxstagefinshed2").innerText="✓";
        })
         .catch(err => {console.log(err)})
    }

    return(
        <div className="box">
            <section>
                <div className="header">
                    <div className="logo"><img src={logo} alt="teck-57-log"/></div>
                    <div id="user" className="user">
                        <div id="userRole" onClick={handelUserNav} className="user-role"><span>{user.Role}</span></div>
                        <ul id="userNav" className="user-nav">
                            <li>Profile</li>
                            <Link to="../Setting">
                            <li>Setting</li></Link>
                            <Link to="/login"><li  onClick={function(){localStorage.removeItem("token")}} className="logout">logout</li></Link>
                        </ul>
                    </div>
                </div>
            </section>
            <div className="homeContainer">
                <div className="sideBar">
                <Link to="/"> <div><img src={profileIcon} alt="profileicon" /></div> </Link>
                <Link to="/Userlist">  <div><img src={profileIcon} alt="profileicon" /></div> </Link>
                <Link to="/Stagiairelist">  <div><img src={stagiaireIcon} alt="profileicon" /></div> </Link>
                <Link to="/Entrepreneurlist"> <div><img src={entrepreneurIcon} alt="profileicon" /></div> </Link>
                <Link to="/FreelancerList"><div><img src={freelancerIcon} alt="profileicon" /></div></Link>
                </div>
                <div className="dashborde">
                <div className="stageBar">
                    <div className="stageTitle">{freelancer.Sujet}</div>
                    <div className="stageInfo">
                        <div className="leftInfo">
                            {stageBox}
                            <div className="stageFile"><p>Fiche du Freelancer</p></div>
                            <div className="stageFile"><p>CV</p></div>
                            {Attestation}
                            <div className="stageButton"><Link to={"/FreelancerUpdate/" + freelancer.id}><button>Edit</button></Link></div>
                            <div className="stageButton"><button id="stageButtonRemove">Remove</button></div>
                        </div>
                        <div className="rightInfo">
                            <div className="stageDate">
                                <div className="dateInfo"><p>Start at {freelancer.DateDeDebut} &#9716;</p></div>
                                <div className="dateInfo"><p>Over at {freelancer.DateDeFin} &#9719;</p></div>
                            </div>
                            <div className="perInfo">
                                <div className="perInfoTitle"><p>Descreption <span>&#128396;</span></p><hr id="Desc"></hr></div>
                                <div className="descInfo"><p>
                                This HTML file is a template. If you open it directly in the browser, you will see an empty page. You can add webfonts, meta tags, or analytics to this file. The build step will place the bundled scripts into the
                                    </p>
                                </div>
                            </div>
                            <div className="perInfo">
                                <div className="perInfoTitle"><p>Stagiaire Information <span>&#128396;</span></p><hr></hr></div>
                            <div className="perInfoData">
                                <div className="groupeInfo">
                                    <div className="infoTitle">name</div>
                                    <div className="infoValue">{freelancer.Nom} {freelancer.Prenom}</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">Email</div>
                                    <div className="infoValue">{freelancer.Email}</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">CIN</div>
                                    <div className="infoValue">{freelancer.CIN}</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">TEL</div>
                                    <div className="infoValue">{freelancer.TEL}</div>
                                </div>
                                <div className="groupeInfo">
                                    <div className="infoTitle">Adresse</div>
                                    <div className="infoValue">{freelancer.Adresse}</div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default FreelancerComp